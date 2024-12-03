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

    // Fetch favorites y luego obtener el username para cada post
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
                const updatedFavorites = await Promise.all(response.data.data.map(async (post) => {
                    // Ahora hacemos una segunda consulta para obtener el username del usuario
                    const userResponse = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/profile`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,  // Usamos el mismo token
                        }
                    });

                    const username = userResponse.data.data.username; // Obtenemos el username del usuario
                    return {
                        ...post,
                        isFavorited: true,  // Marcar como favorito para todos los posts en la pantalla de favoritos
                        username: username || 'Usuario desconocido',  // Asegúrate de agregar el username
                    };
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



    const renderItem = ({ item }) => {
        return (
            <Post
                id={item.id}
                username={item.username || 'Usuario desconocido'}  // Asegúrate de que el nombre esté disponible
                location={item.location}
                media={item.media}
                caption={item.caption}
                description={item.title}
                likes={item.likesCount}
                comments={item.commentsCount}
                favorites={item.likesCount}
                date={new Date(item.date).toLocaleDateString()}
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
