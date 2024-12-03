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

export default function ProfileScreen() {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [userId, setUserId] = useState(null);

    // Obtener el userId desde AsyncStorage
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                    console.log('userId cargado desde AsyncStorage:', storedUserId);
                } else {
                    console.log('No se encontró el userId');
                }
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
            }
        };
        fetchUserId();
    }, []);

    // Cargar los datos del perfil cuando userId esté disponible
    useEffect(() => {
        const loadProfileData = async () => {
            const token = await AsyncStorage.getItem('accessToken');

            if (!token || !userId) {
                console.log('Token o userId no disponibles');
                return;
            }

            try {
                const response = await axios.get('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.data) {
                    const userData = response.data.data;
                    setUserInfo(userData);
                    if (userData.posts) {
                        setPosts(userData.posts);
                    } else {
                        console.error('No hay posts en la respuesta:', userData);
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

    const handleChangeCoverImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permiso denegado', 'Se necesitan permisos para acceder a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri;

            try {
                const response = await axios.post(`https://da1-back.onrender.com/user/update-cover-image`, {
                    userId,
                    coverImageUrl: newImageUri,
                });

                setUserInfo((prevState) => ({
                    ...prevState,
                    cover_image_url: response.data.coverImageUrl, // Usamos la URL directamente
                }));

                Alert.alert('Imagen de encabezado cambiada con éxito');
            } catch (error) {
                console.error('Error al actualizar la imagen de encabezado:', error);
                Alert.alert('Error al actualizar la imagen de encabezado');
            }
        }
    };

    const renderItem = ({ item }) => {
        const imageUrl = item.media && item.media.length > 0 ? item.media[0] : null;
        
        return (
            <Post
                id={item.id}
                username={item.username}  // Ahora estamos pasando 'username' directamente
                location={item.location}
                media={item.media}
                caption={item.caption}
                description={item.description}
                likes={item.likes_count}
                comments={item.comments_count}
                favorites={item.favorites_count}
                date={item.date}
            />
        );
    };

    const renderProfileImage = (uri) => {
        if (uri && uri.startsWith('http')) {
            return <SvgUri uri={uri} width={150} height={150} />;
        } else {
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
                            <Image source={{ uri: userInfo.cover_image_url }} style={styles.coverImage} />
                            {renderProfileImage(userInfo.profile_pic)}  

                            <View style={styles.usernameContainer}>
                                <Text style={styles.username}>{userInfo.username}</Text>
                                <TouchableOpacity onPress={() => router.push('/Profile/EditProfile')}>
                                    <Icon name="create-outline" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.bio}>{userInfo.descriptionProfile || "No description"}</Text>
                            <View style={styles.levelAndPosts}>
                                <Text style={styles.level}>
                                    {userInfo.lvl ? `Nivel: ${userInfo.lvl}` : "Nivel: Null"}
                                </Text>
                                <Text style={styles.postsCount}>{userInfo.posts.length} Posts</Text>
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
