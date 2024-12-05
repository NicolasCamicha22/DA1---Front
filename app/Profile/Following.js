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

export default function Following() {
    const [selectedTab, setSelectedTab] = useState('following');
    const [searchQuery, setSearchQuery] = useState('');
    const [followingData, setFollowingData] = useState([]); 
    const [followersData, setFollowersData] = useState([]);
    const router = useRouter();
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const styles = createStylesProfile(theme);

    useEffect(() => {
        const fetchFollowingData = async () => {
            const userId = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');
            if (!userId || !token) {
                console.error('No se encontró el userId o token');
                return;
            }

            try {
                const response = await axios.get('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        userId: userId,
                    },
                });

                if (response.data && response.data.data) {
                    setFollowingData(response.data.data.following || []);  // Datos de personas seguidas
                    setFollowersData(response.data.data.followers || []);
                }

            } catch (error) {
                console.error('Error al obtener los seguidos:', error);
                Alert.alert('Error', 'No se pudieron cargar los usuarios seguidos.');
            }
        };

        fetchFollowingData();
    }, []);



    const filteredFollowing = followingData.filter((user) => {
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



    const toggleFollow = async (followingId, isFollowing) => {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('accessToken');
        if (!userId || !token) {
            console.error('No se encontró el userId o token');
            return;
        }

        try {
            if (isFollowing) {
                await axios.delete(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/friends/${followingId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Alert.alert('Exito', 'Dejaste de seguir a esta persona');
            } else {
                await axios.post('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/friends/request', {
                    friendId: followingId,
                    userId: userId,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Alert.alert('Exito', 'Comenzaste a seguir a esta persona');
            }

            // Actualizar la lista de seguido (toggle estado)
            setFollowingData((prevData) =>
                prevData.map((item) =>
                    item.id === followingId ? { ...item, isFollowing: !isFollowing } : item
                )
            );
        } catch (error) {
            console.error('Error al cambiar el estado de seguir:', error);
            Alert.alert('Error', 'Hubo un problema al actualizar el estado de seguimiento.');
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
                    name={item.isFollowing ? 'person-remove-outline' : 'person-add-outline'}
                    size={24}
                    color={item.isFollowing ? 'red' : 'green'}
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
                data={filteredFollowing}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.noResultsText}>No tienes seguidores aún.</Text>}
            />
        </View>
    );
};
