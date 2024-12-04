import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import commonStyles from '../styles';
import Footer from '../Footer';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProfileStyles';
import { SvgUri } from 'react-native-svg';

export default function UserProfileScreen() {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { userId } = router.query;  // Accede al userId pasado por la URL

    const [userIdFromStorage, setUserIdFromStorage] = useState(null);

    // Obtener el userId desde AsyncStorage
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserIdFromStorage(storedUserId);
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
                const response = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.data) {
                    const userData = response.data.data;
                    setUserInfo(userData);
                    console.log('userData:', userData)
                    if (userData.posts) {
                        // Aquí obtenemos los posts
                        const updatedPosts = await Promise.all(userData.posts.map(async (post) => {
                            const postResponse = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${post.id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                }
                            });

                            const username = postResponse.data.user?.username || 'Usuario desconocido';  // Aseguramos que username siempre tenga un valor válido
                            return {
                                ...post,
                                isLike: userData.isLike,  // Estado del like
                                isFavorite: userData.isFavorited,  // Estado del favorito
                                username: username  // Aseguramos que cada post tenga el username correctamente
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
            <View style={styles.postContainer}>
                <Image source={{ uri: imageUrl }} style={styles.postImage} />
                <Text style={styles.postCaption}>{item.caption}</Text>
            </View>
        );
    };

    const renderProfileImage = (uri) => {
        if (uri && uri.startsWith('http') && uri.endsWith('.svg')) {
            return <SvgUri uri={uri} width={150} height={150} />;
        } else {
            return <Image source={{ uri }} style={styles.profileImage} resizeMode="cover" />;
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
            </View>
        );
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                ListHeaderComponent={userInfo && (
                    <View>
                        <View style={styles.coverContainer}>
                            <Image source={{ uri: userInfo.bannerImage }} style={styles.coverImage} />
                            {renderProfileImage(userInfo.profile_pic)}

                            <View style={styles.usernameContainer}>
                                <Text style={styles.username}>{userInfo.username}</Text>
                            </View>
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
                    </View>
                )}

                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />
            <Footer />
        </View>
    );
}
