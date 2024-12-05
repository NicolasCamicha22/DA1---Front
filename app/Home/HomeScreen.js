import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text,useColorScheme  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../Login/apiClient';  // Usamos el apiClient para hacer las peticiones autenticadas
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importar los íconos
import Footer from '../Footer';
import Header from '../Header';
import Post from '../Post/Post';
import Ad from './Ad';
import { createStyles } from '../styles';
import { createStylesHome } from './HomeStyles';;
import axios from 'axios';
import { lightTheme, darkTheme } from '../themes';


export default function HomeScreen() {
    const [posts, setPosts] = useState([]);
    const [ads, setAds] = useState([]); // Para almacenar las propagandas
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [page, setPage] = useState(1); // Para la paginación de posts
    const [hasPosts, setHasPosts] = useState(true);
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const commonStyles = createStyles(theme);
    const styles = createStylesHome(theme);

    // Cargar posts desde el backend
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
            const postsData = await fetchPosts(userId, page);
            if (postsData.length === 0) {
                setHasPosts(false);
            } else {
                setHasPosts(true);
                const updatedPosts = await Promise.all(postsData.map(async (post) => {
                    // Hacemos una segunda consulta para obtener la información completa del post, incluido el username
                    try {
                        const postResponse = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${post.id}`, {
                            headers: {
                                Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                            }
                        });


                        const username = postResponse.data.data.user?.username || 'Usuario desconocido';  // Obtener el username desde la respuesta del post
                        return {
                            ...post,
                            username: username,  // Asignamos el username al post
                        };
                    } catch (error) {
                        console.error('Error al obtener el username del post:', error);
                        return post;  // Si no se puede obtener el username, devolvemos el post sin modificar
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

    // Cargar userId desde AsyncStorage y cargar datos
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                setUserId(storedUserId);
                await loadAds();  // Asegúrate de cargar los anuncios
                await loadPosts();  // También carga las publicaciones
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
            }
        };
        fetchUserId();
    }, []);  // Solo lo hacemos una vez al cargar el componente

    useEffect(() => {
        if (userId) {
            loadPosts();
        }
    }, [userId, page]);

    // Intercalar las propagandas cada 3 publicaciones
    const mixedContent = posts.reduce((acc, post, index) => {
        acc.push(post);
        if ((index + 1) % 3 === 0 && ads.length > 0) {
            const adIndex = Math.floor((index + 1) / 3) % ads.length;
            acc.push({ ...ads[adIndex], isAd: true });
        }
        return acc;
    }, []);

    // Cargar propagandas desde el backend
    const loadAds = async () => {
        try {
            const response = await axios.get('https://my-json-server.typicode.com/chrismazzeo/advertising_da1/ads');  // Cargar propagandas desde el backend
            setAds(response.data);
        } catch (error) {
            console.error('Error al cargar propagandas:', error);
        }
    };

    // Renderizar cada item, ya sea un post o una propaganda
    const renderItem = ({ item }) => {
        if (item.isAd) {
            const imageUrl = item.imagePath[0]?.portraite || '';  // Accede a la imagen de la forma correcta
            return (
                <Ad
                    title={item.commerce}
                    imageUrl={imageUrl}
                    linkUrl={item.Url}
                />
            );
        }

        // Acceder al primer elemento de 'media' (que es un array con URLs de las imágenes)
        const imageUrl = item.media && item.media.length > 0 ? item.media[0] : null;  // Accede a la URL de la primera imagen
        const defaultImage = 'https://via.placeholder.com/150';  // Imagen predeterminada en caso de que no haya imágenes

        //console.log('post:',item)

        return (
            <Post
                id={item.id}
                username={item.username || 'Usuario desconocido'}
                location={item.location || 'Sin ubicación'}
                media={item.media}
                caption={item.caption || 'Sin titulo'}  // Usar caption como descripción si falta
                description={item.title || 'Sin descripcion'}
                likes={item.likesCount || 0}
                comments={item.comments?.length || 0}  // Asegúrate de que 'comments' sea un array antes de usarlo
                favorites={item.isFavorite}  // Asegúrate de que este campo esté correctamente mapeado
                countFavorite={item.favoritesCount || 0}
                date={new Date(item.date).toLocaleDateString()}
                userId={userId}
                isLike={item.isLike}  // Pasar el estado de "me gusta"
                isFavorited={item.isFavorite}  // Pasar el estado de "favorito"
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
