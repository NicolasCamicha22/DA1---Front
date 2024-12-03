import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../Header';
import Footer from '../Footer';
import commonStyles from '../styles';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './HomeStyles';

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);
    const router = useRouter();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                    console.log('userId cargado desde AsyncStorage:', storedUserId);
                } else {
                    console.error('No se encontró el userId en AsyncStorage.');
                }
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
            }
        };
        fetchUserId();
    }, []);

    // Normaliza la URL de la imagen de perfil
    const normalizeImageUrl = (imageUrl) => {
        if (imageUrl && imageUrl.startsWith('https://')) {
            return imageUrl;  // Ya es una URL válida
        }
        // Si la URL es relativa, la normalizamos
        if (imageUrl && imageUrl.startsWith('/uploads/')) {
            return `https://da1-back.onrender.com${imageUrl}`;
        }
    };

    const toggleFollow = async (followingId) => {
        if (!userId) {
            console.error('El ID del usuario logueado no está disponible.');
            return;
        }

        if (!followingId) {
            console.error('El followingId no está definido.');
            return;  // Asegúrate de que followingId esté definido antes de hacer la solicitud
        }

        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            console.error('No se encontró el token de acceso');
            return;
        }

        console.log('userId:', userId);
        console.log('followingId:', followingId);  // Verifica que `followingId` no sea undefined

        try {
            const response = await axios.post('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/friends/request', {
                followerId: userId,
                followingId: followingId
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Verifica que el token esté siendo pasado correctamente
                }
            });

            if (response.data.following) {
                console.log('Ahora sigues al usuario');
            } else {
                console.log('Has dejado de seguir al usuario');
            }

            setResults(prevResults =>
                prevResults.map(user =>
                    user.id === followingId ? { ...user, following: !user.following } : user
                )
            );
        } catch (error) {
            console.error('Error al intentar seguir/dejar de seguir:', error.response ? error.response.data : error);
        }
    };





    // Maneja la búsqueda
    const handleSearch = async (text) => {
        setSearchText(text);
        if (text.trim() === '') {
            setResults([]);
            return;
        }

        // Obtener el token de acceso
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            console.error('No se encontró el token de acceso');
            return;
        }

        try {
            const response = await axios.get('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/search', {
                params: { query: text.trim(), currentUserId: userId },
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en la cabecera de la solicitud
                }
            });

            if (response.data && Array.isArray(response.data.data)) {
                const normalizedResults = response.data.data.map(user => ({
                    ...user,
                    profile_pic: normalizeImageUrl(user.profile_pic)
                }));
                setResults(normalizedResults);
            } else {
                console.error('La respuesta no contiene un array en "data":', response.data);
                setResults([]);
            }
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
            setResults([]);
        }
    };

    const renderUserItem = ({ item }) => {
        if (!item.id) {
            console.error('El ID del usuario no está disponible', item);
            return null;  // Si no tiene ID, no procesamos este item
        }
        return (
            <TouchableOpacity onPress={() => router.push(`/Profile/${item.id}`)} style={styles.userContainer}>
                <Image
                    source={{ uri: item.profile_pic }}  // Asegúrate de usar la URL correcta para las imágenes de perfil
                    style={styles.profilePic}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.fullName}>{item.fullName}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFollow(item.id)} style={styles.followButton}>
                    <Text style={styles.followText}>{item.following ? 'Unfollow' : 'Follow'}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };


    return (
        <View style={commonStyles.container}>
            <Header />
            <View style={styles.searchBox}>
                <FontAwesome name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#666"
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={results}
                keyExtractor={item => item.id.toString()}
                renderItem={renderUserItem}
                ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
            />
            <Footer />
        </View>
    );
};

export default SearchScreen;
