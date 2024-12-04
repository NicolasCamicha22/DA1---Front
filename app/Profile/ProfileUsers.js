import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter, useSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProfileStyles';
import Footer from '../Footer';
import HeaderProfile from './HeaderProfile';
import Post from '../Post/Post';

export default function ProfileUsers() {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useSearchParams(); // Obtener el ID del usuario seleccionado desde los parámetros
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (!token) {
                    console.error('Token no disponible');
                    return;
                }

                const response = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/${userId}/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data && response.data.data) {
                    const userData = response.data.data;
                    setUserInfo(userData);
                    setPosts(userData.posts || []);
                } else {
                    console.error('Estructura de datos inesperada:', response.data);
                    setError('Error en los datos del perfil');
                }
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error);
                setError(`Error al cargar los datos del perfil: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    const renderItem = ({ item }) => (
        <Post
            id={item.id}
            username={userInfo.username} // Muestra el username del usuario seleccionado
            location={item.location}
            media={item.media}
            caption={item.caption}
            description={item.description}
            likes={item.likesCount}
            comments={item.commentsCount}
            favorites={item.favoritesCount}
            date={item.date}
        />
    );

    if (loading) {
        return (
            <View style={styles.containerProfile}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.containerProfile}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.containerProfile}>
            <HeaderProfile onBackPress={() => router.push('/Search')} /> {/* Botón de regreso */}
            <FlatList
                ListHeaderComponent={userInfo && (
                    <View>
                        <Image source={{ uri: userInfo.cover_image_url }} style={styles.coverImage} />
                        <Image source={{ uri: userInfo.profile_pic }} style={styles.profileImage} />
                        <Text style={styles.username}>{userInfo.username}</Text>
                        <Text style={styles.bio}>{userInfo.descriptionProfile || 'No description'}</Text>
                    </View>
                )}
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Footer />
        </View>
    );
}
