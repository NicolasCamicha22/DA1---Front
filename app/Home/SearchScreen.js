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
import { SvgUri } from 'react-native-svg';

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
        console.log(imageUrl);
        if (imageUrl && imageUrl.startsWith('https://')) {
            return imageUrl;  // Ya es una URL válida
        }
        return 'https://www.example.com/default-image.jpg';  // Imagen predeterminada de prueba
    };

    // Verifica si la imagen es un SVG
    const isSvg = (uri) => {
        return uri && (uri.endsWith('.svg') || uri.includes('dicebear.com'));
    };

    const toggleFollow = async (followingId, isFriend) => {
        if (!userId) {
            console.error('El ID del usuario logueado no está disponible.');
            return;
        }

        if (!followingId) {
            console.error('El followingId no está definido.');
            return;
        }

        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            console.error('No se encontró el token de acceso');
            return;
        }

        try {
            let response;
            if (isFriend) {
                // Si ya es amigo, hacemos una solicitud DELETE para eliminar la amistad
                response = await axios.delete(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/friends/${followingId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        userId: userId  // Enviar también el userId
                    }
                });

                if (response.data.status === 'success') {
                    console.log('Amistad eliminada');
                    setResults(prevResults =>
                        prevResults.map(user =>
                            user.id === followingId ? { ...user, isFriend: false } : user
                        )
                    );
                } else {
                    console.log('No se pudo eliminar la amistad');
                }
            } else {
                // Si no es amigo, hacemos una solicitud POST para seguir al usuario
                response = await axios.post('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/friends/request', {
                    friendId: followingId,
                    userId: userId  // Asegúrate de enviar el userId también
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.status === 'success') {
                    console.log('Solicitud de amistad enviada');
                    setResults(prevResults =>
                        prevResults.map(user =>
                            user.id === followingId ? { ...user, isFriend: true } : user
                        )
                    );
                } else {
                    console.log('No se pudo enviar la solicitud de amistad');
                }
            }
        } catch (error) {
            console.error('Error al intentar seguir/dejar de seguir:', error.response ? error.response.data : error);
        }
    };

    const handleSearch = async (text) => {
        setSearchText(text);
        if (text.trim() === '') {
            setResults([]);
            return;
        }

        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            console.error('No se encontró el token de acceso');
            return;
        }

        try {
            const response = await axios.get('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/search', {
                params: { query: text.trim(), currentUserId: userId },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const friendsResponse = await axios.get('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/friends', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const friendsIds = friendsResponse.data.data.following.map(friend => friend.id); // Lista de IDs de amigos

            if (response.data && Array.isArray(response.data.data)) {
                const normalizedResults = response.data.data.map(user => ({
                    ...user,
                    imageUrl: normalizeImageUrl(user.profile_pic),
                    isFriend: friendsIds.includes(user.id)
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

        // Verifica si la URL de la imagen es válida antes de renderizarla
        const imageUri = normalizeImageUrl(item.profile_pic);

        if (!item.id) {
            console.error('El ID del usuario no está disponible', item);
            return null;
        }

        return (
            <TouchableOpacity onPress={() => router.push(`../Profile/UserProfileScreen/${item.id}`)} style={styles.userContainer}>
                {isSvg(imageUri) ? (
                    <SvgUri uri={imageUri} style={styles.profilePic} width={50} height={50} />
                ) : (
                    <Image source={{ uri: imageUri }} style={styles.profilePic} />
                )}
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.fullName}>{item.name} {item.surname}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => toggleFollow(item.id, item.isFriend)}  // Pasa el estado correcto del botón
                    style={styles.followButton}>
                    <Text style={styles.followText}>
                        {item.isFriend ? 'Unfollow' : 'Follow'}  {/* Mostrar correctamente Follow/Unfollow */}
                    </Text>
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
