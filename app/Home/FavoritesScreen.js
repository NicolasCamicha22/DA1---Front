import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, Image, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';
import Footer from '../Footer';
import Header from '../Header';
import Post from '../Post/Post';
import styles from './HomeStyles';

export default function FavoritosScreen() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const screenWidth = Dimensions.get('window').width;

    // Obtener userId y accessToken desde AsyncStorage
    const fetchUserIdAndToken = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            const storedToken = await AsyncStorage.getItem('accessToken');
            setUserId(storedUserId);
            setAccessToken(storedToken);
        } catch (error) {
            console.error('Error al obtener userId o token desde AsyncStorage:', error);
        }
    };

    const fetchFavorites = async () => {
        if (!userId || !accessToken) {
            console.log("UserId o token no disponibles");
            return;
        }

        try {
            const response = await axios.get('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/favorites', {
                params: { userId },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            // Verificamos que la respuesta contenga los datos esperados
            if (response.data && response.data.data) {
                const updatedFavorites = response.data.data.map(post => ({
                    ...post,
                    isFavorited: true, // Marcar como favorito para todos los posts en la pantalla de favoritos
                }));
                setFavorites(updatedFavorites);
            } else {
                console.error('Error: No se encontraron favoritos en la respuesta del backend');
                setFavorites([]);
            }
        } catch (error) {
            console.error('Error al obtener los favoritos:', error.response?.data?.message || error);
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserIdAndToken();
    }, []);

    useEffect(() => {
        if (userId && accessToken) {
            setLoading(true);
            fetchFavorites();
        }
    }, [userId, accessToken]);

    // Función para eliminar un favorito
    const toggleFavorite = async (postId, isFavorited) => {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            console.error('No se encontró el token de acceso');
            return;
        }

        try {
            let response;
            if (isFavorited) {
                // Eliminar favorito
                response = await axios.delete(
                    `http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${postId}/favorites`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: { userId }, // Enviar el userId en el cuerpo de la solicitud DELETE
                    }
                );

                if (response.data.status === 'success') {
                    setFavorites(prevFavorites => prevFavorites.filter(post => post.id !== postId));
                }
            } else {
                // Marcar como favorito
                response = await axios.post(
                    `http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${postId}/favorites`,
                    { userId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status === 'success') {
                    // Actualizar el post a favorito
                    setFavorites(prevFavorites => [
                        ...prevFavorites,
                        {
                            ...response.data.data,
                            isFavorited: true,
                        },
                    ]);
                }
            }
        } catch (error) {
            console.error('Error al agregar o quitar de favoritos:', error);
        }
    };


    const renderItem = ({ item }) => {
    
        return (
            <Post
                id={item.id}
                username={item.user?.username || 'Usuario desconocido'}
                location={item.location}
                media={item.media}
                caption={item.caption}
                description={item.description}
                likes={item.likesCount}
                comments={item.commentsCount}
                favorites={item.likesCount}
                date={item.date}
                toggleFavorite={() => toggleFavorite(item.id, item.isFavorited)}
                isFavorited={item.isFavorited}
            />
        );
    };
    

    return (
        <View style={commonStyles.container}>
            <Header />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => `favorite-${item.id}`}
                    ListEmptyComponent={<Text style={styles.noResultsText}>No tienes favoritos aún.</Text>}
                />
            )}
            <Footer />
        </View>
    );
}
