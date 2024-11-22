import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import Footer from '../Footer';
import Header from '../Header';
import Post from '../Post/Post';
import Ad from './Ad'; // Componente para mostrar la publicidad
import { Linking } from 'react-native';


export default function HomeScreen() {
    const [posts, setPosts] = useState([]);
    const [ads, setAds] = useState([]); // Para almacenar las propagandas
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [page, setPage] = useState(1); // Para la paginación de posts

    // Cargar posts desde el backend
    const fetchPosts = async (userId, page) => {
        const response = await axios.get(`https://da1-back.onrender.com/posts`, {
            params: { userId, page }
        });
        console.log('Posts obtenidos:', response.data); 
        return response.data;
    };
    


    const loadPosts = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const postsData = await fetchPosts(userId, page);
            setPosts(prevPosts => [...prevPosts, ...postsData]);
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
                console.log('userId cargado desde AsyncStorage:', storedUserId);
                await loadAds(); // Asegúrate de cargar los anuncios
                await loadPosts(); // También carga las publicaciones
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


    // Intercalar las propagandas cada 3 publicaciones
    const mixedContent = posts.reduce((acc, post, index) => {
        acc.push(post);
        if ((index + 1) % 3 === 0 && ads.length > 0) {
            const adIndex = Math.floor((index + 1) / 3) % ads.length;
            acc.push({ ...ads[adIndex], isAd: true });
        }
        return acc;
    }, []);


    // Cargar propagandas del JSON externo
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
            // Accede a la imagen de la forma correcta
            const imageUrl = item.imagePath[0]?.landscape || ''; 
            return (
                <Ad
                    title={item.commerce}
                    imageUrl={imageUrl}
                    linkUrl={item.Url}
                />
            );
        }
        return (
            <Post
                id={item.id}
                username={item.username}
                location={item.location}
                imageUrl={item.images}
                caption={item.caption}
                description={item.description}
                likes={item.likes_count}
                comments={item.comments_count} 
                favorites={item.favorites_count}
                date={item.date}
                userId = {userId}
            />
        );
    };
    



    const loadMorePosts = () => {
        setPage(prevPage => prevPage + 1);
    };


    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={mixedContent}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                    // Verifica si el elemento es una publicidad o una publicación
                    if (item.isAd) {
                        return `ad-${index}`;  // Para las propagandas, usa el índice como parte de la clave
                    } else {
                        return `post-${item.id}-${index}`;  // Para las publicaciones, combina id y índice para asegurar unicidad
                    }
                }}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />


            <Footer />
        </View>
    );
}