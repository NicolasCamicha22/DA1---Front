import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../Header';
import Footer from '../Footer';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={styles.followerRow}>
            <Image
                source={{ uri: item.profile_pic }}
                style={styles.profileImageFollower}
            />
            <View style={styles.userInfoFollower}>
                <Text style={styles.usernameFollower}>{item.username}</Text>
                <Text style={styles.fullNameFollowers}>{item.full_name}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFollow(item.id)} style={styles.followIconContainer}>
                <Icon
                    name={item.following ? 'person-remove-outline' : 'person-add-outline'}
                    size={24}
                    color={item.following ? 'red' : 'purple'}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.containerFollower}>
            <Header />
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
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
