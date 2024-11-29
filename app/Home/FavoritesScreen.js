import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
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

    const fetchFavorites = async (userId, page) => {
        const response = await axios.get('https://da1-back.onrender.com/favorites', {
            params: { userId, page }
        });
        return response.data;
    };

    const loadFavorites = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const favoritesData = await fetchFavorites(userId);
            setFavorites(favoritesData);
        } catch (error) {
            console.error('Error al cargar favoritos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                setUserId(storedUserId);
                await loadFavorites();
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
            }
        };
        fetchUserId();
    }, [userId]);



    const renderItem = ({ item }) => (
        <Post
            id={item.id}
            username={item.username}
            location={item.location}
            imageUrl={item.images}
            caption={item.caption}
            description={item.description}
            likes={item.likes}
            comments={item.comments}
            favorites={item.favorites}
            date={item.date}
        />
    );

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
