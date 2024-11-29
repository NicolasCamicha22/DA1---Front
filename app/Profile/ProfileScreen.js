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

export default function ProfileScreen() {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [userId, setUserId] = useState(null);

    // Función para normalizar las URLs de las imágenes
    const normalizeImageUrl = (imageUrl) => {
        if (imageUrl && imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        if (imageUrl && imageUrl.startsWith('/uploads/')) {
            return `https://da1-back.onrender.com${imageUrl}`;
        }
        if (imageUrl && imageUrl.startsWith('file://')) {
            return `https://da1-back.onrender.com${imageUrl.replace('file://', '/uploads/')}`;
        }
        return 'https://da1-back.onrender.com/uploads/default.jpg';
    };

    // Obtener el userId desde AsyncStorage
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                    console.log('userId cargado desde AsyncStorage:', storedUserId);
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
            if (!userId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://da1-back.onrender.com/user/${userId}`);
                const normalizedUserInfo = {
                    ...response.data.user,
                    profile_image_url: normalizeImageUrl(response.data.user.profile_image_url),
                    cover_image_url: normalizeImageUrl(response.data.user.cover_image_url),
                };
                setUserInfo(normalizedUserInfo);
                if (response.data.posts) {
                    setPosts(response.data.posts);
                    console.log('Posts cargados:', response.data.posts);
                } else {
                    console.error('No hay posts en la respuesta:', response.data);
                }
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error);
                setError('Error al cargar los datos del perfil. Por favor, intenta de nuevo.');
            } finally {
                setLoading(false);
            }
        };

        loadProfileData();
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
                    cover_image_url: normalizeImageUrl(response.data.coverImageUrl),
                }));

                Alert.alert('Imagen de encabezado cambiada con éxito');
            } catch (error) {
                console.error('Error al actualizar la imagen de encabezado:', error);
                Alert.alert('Error al actualizar la imagen de encabezado');
            }
        }
    };

    const renderItem = ({ item }) => (
        <Post
            location={item.location}
            imageUrl={item.images}
            caption={item.caption}
            description={item.description}
            likes={item.likes_count}
            comments={item.comments_count}
            favorites={item.favorites_count}
            date={item.date}
        />
    );

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
                <Button title="Reintentar" onPress={() => loadProfileData()} />
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <HeaderProfile onSettingsPress={() => router.push('/EditProfile')} />

            <FlatList
                ListHeaderComponent={
                    userInfo && (
                        <View>
                            <View style={styles.coverContainer}>
                                <Image source={{ uri: userInfo.cover_image_url }} style={styles.coverImage} />
                                <Image source={{ uri: userInfo.profile_image_url }} style={styles.profileImage} />
                                <View style={styles.usernameContainer}>
                                    <Text style={styles.username}>{userInfo.username}</Text>
                                    <TouchableOpacity onPress={() => router.push('../Profile/EditProfile')}>
                                        <Icon name="create-outline" size={24} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.bio}>{userInfo.description || "No description"}</Text>
                                <View style={styles.levelAndPosts}>
                                    <Text style={styles.level}>
                                        {userInfo.level ? `Nivel: ${userInfo.level}` : "Nivel: Null"}
                                    </Text>
                                    <Text style={styles.postsCount}>{userInfo.posts_count} Posts</Text>
                                </View>
                            </View>

                            <View style={styles.followContainer}>
                                <TouchableOpacity onPress={() => router.push('./Followers')} style={styles.followButton}>
                                    <Text style={styles.followNumber}>{userInfo.followers_count}</Text>
                                    <Text style={styles.followText}>Followers</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push('./Following')} style={styles.followButton}>
                                    <Text style={styles.followNumber}>{userInfo.following_count}</Text>
                                    <Text style={styles.followText}>Following</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )
                }


                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />

            < Footer />
        </View >
    );
}