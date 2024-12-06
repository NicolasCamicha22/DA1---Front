import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderFollowers from './HeaderFollowers';
import commonStyles from '../styles';
import { useRouter } from 'expo-router';
import styles from './ProfileStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgUri } from 'react-native-svg';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme  } from 'react-native';
import { createStylesProfile} from './ProfileStyles';

export default function Followers() {
    const [selectedTab, setSelectedTab] = useState('followers');
    const [searchQuery, setSearchQuery] = useState('');
    const [followersData, setFollowersData] = useState([]); // Almacenará los datos de los seguidores
    const [followingData, setFollowingData] = useState([]);
    const router = useRouter();
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const styles = createStylesProfile(theme);



    useEffect(() => {
        // Actualiza el estado cuando se navega entre los tabs
        setSelectedTab('followers');
    }, [router]);



    useEffect(() => {
        const fetchFollowersData = async () => {
            const userId = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');
            if (!userId || !token) {
                console.error('No se encontró el userId o token');
                return;
            }

            try {
                const response = await axios.get('https://da1back.onrender.com/api/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        userId: userId,
                    },
                });

                if (response.data && response.data.data) {
                    setFollowersData(response.data.data.followers || []);  // Datos de los seguidores
                    setFollowingData(response.data.data.following || []);
                }

            } catch (error) {
                console.error('Error al obtener los seguidores:', error);
                Alert.alert('Error', 'No se pudieron cargar los usuarios seguidores.');
            }
        };

        fetchFollowersData();
    }, []);



    const filteredFollowers = followersData.filter((user) => {


        console.log('usuario:', user);
        const username = user.name || '';  // Si no hay username, usamos una cadena vacía
        const fullName = user.surname || '';  // Si no hay fullName, usamos una cadena vacía

        // Realizamos el filtro usando toLowerCase en valores seguros
        return username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });


    const renderProfileImage = (uri) => {
        const validUri = uri && uri.trim();

        // Si la URL es válida y es un SVG (como las generadas por dicebear), usamos SvgUri
        if (validUri && validUri.includes("dicebear.com")) {
            return <SvgUri uri={validUri} style={styles.profileImageFollower} />;
        }

        // Si la URL es un JPG/PNG, usamos Image para mostrar la imagen
        if (validUri && validUri.startsWith('http')) {
            return <Image source={{ uri: validUri }} style={styles.profileImageFollower} resizeMode="cover" />;
        } else {
            // Si la URL no es válida, mostramos una imagen por defecto
            return <Image source={require('../../assets/images/icon.png')} style={styles.profileImageFollower} resizeMode="cover" />;
        }
    };

    const toggleFollow = async (followerId, isFollowing) => {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('accessToken');
        if (!userId || !token) {
            console.error('No se encontró el userId o token');
            return;
        }

        try {
            if (isFollowing) {
                await axios.delete(`https://da1back.onrender.com/api/friends/${followerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Alert.alert('Eliminaste a esta persona de tu lista de amigos');
            } else {
                await axios.post('https://da1back.onrender.com/api/friends/request', {
                    friendId: followerId,
                    userId: userId,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Alert.alert('Error. Ya has eliminado este usuario.');
            }

            // Actualizar la lista de seguido (toggle estado)
            setFollowersData((prevData) =>
                prevData.map((item) =>
                    item.id === followerId ? { ...item, isFollowing: !isFollowing } : item
                )
            );
        } catch (error) {
            console.error('Error al cambiar el estado de seguir:', error);
            Alert.alert('Error', 'Ya has eliminado este usuario.');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.followerRow}>
            {renderProfileImage(item.profile_pic)}
            <View style={styles.userInfoFollower}>
                <Text style={styles.usernameFollower}>{item.name}</Text>
                <Text style={styles.fullNameFollowers}>{item.surname}</Text>
            </View>
            <TouchableOpacity
                style={styles.followIconContainer}
                onPress={() => toggleFollow(item.id, item.isFollowing)}>
                <Icon
                    name={item.isFollowing = 'person-remove-outline'}
                    size={24}
                    color={item.isFollowing = 'red'}
                />
            </TouchableOpacity>
        </View>
    );

    const handleTabChange = (tab) => {
        router.push(`./${tab}`);
        setSelectedTab(tab); // Cambia el estado local para actualizar el tab seleccionado
    };

    return (
        <View style={styles.containerFollower}>
            <HeaderFollowers />
            <View style={styles.tabContainer} key={selectedTab}>
                <TouchableOpacity
                    onPress={() => handleTabChange('./Followers')}
                    style={[styles.tab, selectedTab === 'followers' && styles.activeTab]}>
                    <Text style={[styles.tabText, selectedTab === 'followers' && styles.activeTabText]}>
                        {followersData.length} Followers
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleTabChange('./Following')}
                    style={[styles.tab, selectedTab === 'following' && styles.activeTab]}>
                    <Text style={[styles.tabText, selectedTab === 'following' && styles.activeTabText]}>
                        {followingData.length} Following
                    </Text>
                </TouchableOpacity>
            </View>




            {/* Buscador */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Lista de personas seguidas */}
            <FlatList
                data={filteredFollowers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.noResultsText}>No tienes seguidores aún.</Text>}
            />
        </View>
    );
};
