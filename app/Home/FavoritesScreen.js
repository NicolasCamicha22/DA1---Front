import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, Image, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Footer';
import Header from '../Header';
import Post from '../Post/Post';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme  } from 'react-native';
import { createStylesHome } from './HomeStyles';;
import { createStyles } from '../styles';


export default function FavoritosScreen() {
    const [favorites, setFavorites] = useState([]);  // Lista de favoritos
    const [loading, setLoading] = useState(false);  // Estado de carga
    const [userId, setUserId] = useState(null);  // ID del usuario
    const [accessToken, setAccessToken] = useState(null);  // Token de acceso
    const colorScheme = useColorScheme(); 
    const styles = createStylesHome(theme);


 const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const commonStyles = createStyles(theme);

    const screenWidth = Dimensions.get('window').width;  // Ancho de la pantalla

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
                    // Hacemos una segunda consulta para obtener la información completa del post, incluyendo el username
                    const postResponse = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${post.id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    });

                    // Ahora obtenemos directamente el username desde el objeto 'user' del post
                    const username = postResponse.data.data.user?.username|| 'Usuario desconocido';  // Acceder a 'user.username'

                    return {
                        ...post,
                        isFavorited: true,  // Marcar como favorito para todos los posts en la pantalla de favoritos
                        username: username,  // Agregar el username al post

                    };
                }));

                setFavorites(updatedFavorites);  // Actualizar el estado con los posts actualizados
               
            } else {
                console.error('Error: No se encontraron favoritos en la respuesta del backend');
                setFavorites([]);  // Si no hay favoritos, poner el estado vacío
            }
        } catch (error) {
            console.error('Error al obtener los favoritos:', error.response?.data?.message || error);
            setFavorites([]);  // Si hay error, limpiar los favoritos
        } finally {
            setLoading(false);  // Desactivar el indicador de carga
        }
    };

    useEffect(() => {
        fetchUserIdAndToken();  // Obtener el userId y el accessToken al cargar el componente
    }, []);

    useEffect(() => {
        if (userId && accessToken) {
            setLoading(true);  // Activar el indicador de carga
            fetchFavorites();  // Obtener los favoritos
        }
    }, [userId, accessToken]);

    // Renderizar cada item (post o publicidad)
    const renderItem = ({ item }) => {
        console.log("PRUEBA:", item)
        return (
            <Post
                id={item.id}
                username={item.username || 'Usuario desconocido'}  // Asegúrate de que el username esté bien asignado
                location={item.location}
                media={item.media}
                caption={item.caption}
                description={item.title}
                likes={item.likesCount}
                countFavorite={item.favoritesCount}
                isLike={item.isLike}
                comments={item.commentsCount}
                favorites={item.isFavorited}
                date={new Date(item.date).toLocaleDateString()}
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
