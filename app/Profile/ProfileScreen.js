import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, Button, Alert } from 'react-native';
import axios from 'axios';
import commonStyles from '../styles';
import Footer from '../Footer';
import HeaderProfile from './HeaderProfile';
import Icon from 'react-native-vector-icons/Ionicons';
import Post from '../Post/Post';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import styles from './ProfileStyles';
import { SvgUri } from 'react-native-svg';
import NetInfo from '@react-native-community/netinfo';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme } from 'react-native';
import { createStyles } from '../styles';
import { createStylesProfile } from './ProfileStyles';

export default function ProfileScreen() {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [userId, setUserId] = useState(null);

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const commonStyles = createStyles(theme);
    const styles = createStylesProfile(theme);


    // Obtener el userId desde AsyncStorage
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                const state = await NetInfo.fetch();
                if (!state.isConnected) {
                    throw new Error('No hay conexión a internet');
                }
                if (storedUserId) {
                    setUserId(storedUserId);
                    console.log('userId cargado desde AsyncStorage:', storedUserId);
                } else {
                    console.log('No se encontró el userId');
                }
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
                // Mostrar una alerta si no hay conexión
                if (error.message === 'No hay conexión a internet') {
                    Alert.alert(
                        'Error de Conexión',
                        'No hay conexión a internet. Por favor, verifica tu conexión y vuelve a intentarlo.',
                        [{ text: 'OK' }]
                    );
                }
                setError('No hay conexión a internet');  // Puedes actualizar el estado de error
            }
        };
        fetchUserId();
    }, []);  // Solo lo hacemos una vez al cargar el componente

    // Cargar los datos del perfil cuando userId esté disponible
    useEffect(() => {
        const loadProfileData = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token || !userId) {
                console.log('Token o userId no disponibles');
                return;
            }

            try {
                const response = await axios.get('https://da1back.onrender.com/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.data) {
                    const userData = response.data.data;
                    setUserInfo(userData);

                    // Guardamos el nombre de usuario en AsyncStorage
                    await AsyncStorage.setItem('username', userData.username);

                    if (userData.posts) {
                        // Aquí obtenemos los posts
                        const updatedPosts = await Promise.all(userData.posts.map(async (post) => {
                            const postResponse = await axios.get(`https://da1back.onrender.com/api/posts/${post.id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                }
                            });

                            const username = postResponse.data.user?.username || 'Usuario desconocido';
                            return {
                                ...post,
                                isLike: userData.isLike,
                                isFavorite: userData.isFavorited,
                                username: username
                            };
                        }));
                        setPosts(updatedPosts);
                    }
                } else {
                    console.error('Estructura de datos inesperada:', response.data);
                    setError('Error en los datos del perfil');
                }
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error);
                setError(`Error al cargar los datos del perfil: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            loadProfileData();
        }
    }, [userId]);



    const renderItem = ({ item }) => {
        const imageUrl = item.media && item.media.length > 0 ? item.media[0] : null;

        return (
            <Post
                id={item.id}
                username={userInfo.username || 'Usuario desconocido'}  // Asegúrate de que se muestra 'Usuario desconocido' si no se encuentra el username
                location={item.location}
                media={item.media}
                caption={item.caption}
                description={item.title}
                likes={userInfo.likesCount || 0}
                comments={item.comments_count}
                isLike={userInfo.isLike}
                favorites={userInfo.isFavorite}
                countFavorite={userInfo.favoritesCount}
                date={new Date(item.date).toLocaleDateString()}
            />
        );
    };


    const renderProfileImage = (uri) => {
        const validUri = uri && uri.trim();

        // Si la URL es válida y es un SVG (como las generadas por dicebear), usamos SvgUri
        if (validUri && validUri.includes("dicebear.com")) {
            return <SvgUri uri={validUri} width={100} height={100} />;
        }

        // Si la URL es un JPG/PNG, usamos Image para mostrar la imagen
        if (validUri && validUri.startsWith('http')) {
            return <Image source={{ uri: validUri }} style={styles.profileImage} resizeMode="cover" />;
        } else {
            // Si la URL no es válida, mostramos una imagen por defecto
            return <Image source={require('../../assets/images/icon.png')} style={styles.profileImage} resizeMode="cover" />;
        }
    };

    if (loading) {
        return (
            <View style={commonStyles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={commonStyles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Reintentar" onPress={() => setError(null)} />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <HeaderProfile onSettingsPress={() => router.push('/EditProfile')} />

            <FlatList
                ListHeaderComponent={userInfo && (
                    <View>
                        <View style={styles.coverContainer}>
                            <Image source={{ uri: userInfo.bannerImage }} style={styles.coverImage} />
                            {renderProfileImage(userInfo.profile_pic)}

                            <View style={styles.usernameContainer}>
                                <Text style={styles.username}>{userInfo.username}</Text>
                            </View>

                            <TouchableOpacity onPress={() => router.push('/Profile/EditProfile')}>
                                <Icon name="create-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>


                        <View style={styles.infoContainer}>
                            <Text style={styles.bio}>{userInfo.descriptionProfile || "No description"}</Text>
                            <View style={styles.levelAndPosts}>
                                <Text style={styles.level}>
                                    {userInfo.lvl ? `Nivel: ${userInfo.lvl}` : "Nivel: 0"}
                                </Text>
                                <Text style={styles.postsCount}>{userInfo.posts.length} Posts</Text>
                            </View>
                        </View>
                        <View style={styles.followContainer}>
                            <View style={styles.followButton}>
                                <Text style={styles.followNumber}>{userInfo.followersCounts}</Text>
                                <TouchableOpacity onPress={() => router.push('./Followers')}>
                                    <Text style={styles.followText}>Followers</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.followButton}>
                                <Text style={styles.followNumber}>{userInfo.followingCounts}</Text>
                                <TouchableOpacity onPress={() => router.push('./Following')}>
                                    <Text style={styles.followText}>Following</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />

            <Footer />
        </View>
    );
}
