import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { apiClient } from '../Login/apiClient'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from '../Footer';
import Header from '../Header';
import Post from '../Post/Post';
import Ad from './Ad';
import commonStyles from '../styles';
import styles from './HomeStyles';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';  // Importa NetInfo para la verificación de conexión

export default function HomeScreen() {
    const [posts, setPosts] = useState([]);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [page, setPage] = useState(1);
    const [hasPosts, setHasPosts] = useState(true);
    const [isConnected, setIsConnected] = useState(true); // Estado para verificar la conexión
    const router = useRouter();

    // Verificar la conexión a internet
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => unsubscribe();
    }, []);

    const fetchPosts = async (userId, page) => {
        try {
            const response = await apiClient.get('/api/timeline', {
                params: { userId, page }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener las publicaciones:', error);
            return [];
        }
    };

    const loadPosts = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            // Verificar la conexión antes de hacer la solicitud
            if (!isConnected) {
                Alert.alert('Sin conexión', 'No hay conexión a internet');
                return;
            }

            const postsData = await fetchPosts(userId, page);
            if (postsData.length === 0) {
                setHasPosts(false);
            } else {
                setHasPosts(true);
                const updatedPosts = await Promise.all(postsData.map(async (post) => {
                    try {
                        const postResponse = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${post.id}`, {
                            headers: {
                                Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                            }
                        });

                        const username = postResponse.data.data.user?.username || 'Usuario desconocido';  
                        return {
                            ...post,
                            username: username,  
                        };
                    } catch (error) {
                        console.error('Error al obtener el username del post:', error);
                        return post;  
                    }
                }));

                setPosts(prevPosts => [...prevPosts, ...updatedPosts]);
            }
        } catch (error) {
            console.error('Error al cargar publicaciones:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                setUserId(storedUserId);
                await loadAds();
                await loadPosts();
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            loadPosts();
        }
    }, [userId, page]);

    const mixedContent = posts.reduce((acc, post, index) => {
        acc.push(post);
        if ((index + 1) % 3 === 0 && ads.length > 0) {
            const adIndex = Math.floor((index + 1) / 3) % ads.length;
            acc.push({ ...ads[adIndex], isAd: true });
        }
        return acc;
    }, []);

    const loadAds = async () => {
        try {
            const response = await axios.get('https://my-json-server.typicode.com/chrismazzeo/advertising_da1/ads');
            setAds(response.data);
        } catch (error) {
            console.error('Error al cargar propagandas:', error);
        }
    };

    const renderItem = ({ item }) => {
        if (item.isAd) {
            const imageUrl = item.imagePath[0]?.portraite || '';  
            return (
                <Ad
                    title={item.commerce}
                    imageUrl={imageUrl}
                    linkUrl={item.Url}
                />
            );
        }

        const imageUrl = item.media && item.media.length > 0 ? item.media[0] : null;  
        const defaultImage = 'https://via.placeholder.com/150';

        return (
            <Post
                id={item.id}
                username={item.username || 'Usuario desconocido'}
                location={item.location || 'Sin ubicación'}
                media={item.media}
                caption={item.caption || 'Sin titulo'}
                description={item.title || 'Sin descripcion'}
                likes={item.likesCount || 0}
                comments={item.comments?.length || 0}  
                favorites={item.isFavorite}
                countFavorite={item.favoritesCount || 0}
                date={new Date(item.date).toLocaleDateString()}
                userId={userId}
                isLike={item.isLike}  
                isFavorited={item.isFavorite}  
            />
        );
    };

    const loadMorePosts = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <View style={commonStyles.container}>
            <Header />
            {hasPosts ? (
                <FlatList
                    data={mixedContent}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {
                        if (item.isAd) {
                            return `ad-${index}`;
                        } else {
                            return `post-${item.id}-${index}`;
                        }
                    }}
                    onEndReached={loadMorePosts}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                />
            ) : (
                <View style={styles.noPostsContainer}>
                    <Icon name="person-outline" size={80} color="#bbb" style={styles.noPostsIcon} />
                    <Text style={styles.noPostsText}>¡Aún no hay publicaciones!</Text>
                </View>
            )}
            <Footer />
        </View>
    );
}
