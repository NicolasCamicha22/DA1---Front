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
    const [userId, setUserId] = useState(null); // Cambiado a `userId` para ser consistente con HomeScreen.js

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId'); // Asegúrate de usar la misma clave
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

    const normalizeImageUrl = (imageUrl) => {
        if (imageUrl && imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        if (imageUrl && imageUrl.startsWith('/uploads/')) {
            return `https://da1-back.onrender.com${imageUrl}`;
        }
        return 'https://da1-back.onrender.com/uploads/default.jpg';
    };

    const handleSearch = async (text) => {
        setSearchText(text);
        if (text.trim() === '') {
            setResults([]);
            return;
        }
        try {
            // Incluimos el currentUserId en los parámetros
            const response = await axios.get('https://da1-back.onrender.com/users/search', {
                params: { query: text.trim(), currentUserId: userId }
            });
            const normalizedResults = response.data.map(user => ({
                ...user,
                profile_pic: normalizeImageUrl(user.profile_pic)
            }));
            setResults(normalizedResults);
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
            setResults([]);
        }
    };
    

    const toggleFollow = async (followingId) => {
        if (!userId) {
            console.error('El ID del usuario logueado no está disponible.');
            return;
        }
        try {
            const response = await axios.post('https://da1-back.onrender.com/users/follow', {
                followerId: userId,
                followingId
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
            console.error('Error al intentar seguir/dejar de seguir:', error);
        }
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/profile/${item.id}`)} style={styles.userContainer}>
            {item.profile_pic ? (
                <Image
                    source={{ uri: item.profile_pic }}
                    style={styles.profilePic}
                    onError={(error) => console.error('Error al cargar imagen:', error.nativeEvent.error)}
                />
            ) : (
                <Text>No Image Available</Text>
            )}
            <View style={styles.userInfo}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.fullName}>{item.full_name}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFollow(item.id)} style={styles.followButton}>
                <Text style={styles.followText}>{item.following ? 'Unfollow' : 'Follow'}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

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
