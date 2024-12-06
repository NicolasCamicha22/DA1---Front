import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import axios from 'axios';
import commonStyles from '../styles';
import Footer from '../Footer';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProfileStyles';
import Post from '../Post/Post';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme } from 'react-native';
import { createStyles } from '../styles';
import { createStylesProfile } from './ProfileStyles';

export default function UserProfileScreen() {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);  // Estado para los posts
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { userId } = useLocalSearchParams();
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const commonStyles = createStyles(theme);
    const styles = createStylesProfile(theme);


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.get(`https://da1back.onrender.com/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.data) {
                    setUserInfo(response.data.data);
                    if (response.data.data.posts) {
                        setPosts(response.data.data.posts);
                    }
                }
            } catch (error) {
                console.error('Error fetching user profile', error);
                setError('Error fetching user profile');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);


    const renderProfileImage = (uri) => {
        const validUri = uri && uri.trim();
    
        // Si la URL es válida y es un SVG (como las generadas por dicebear), usamos SvgUri
        if (validUri && validUri.includes("dicebear.com")) {
            return <SvgUri uri={validUri} width={100} height={100} />;
        }
    
        // Si la URL es un JPG/PNG, usamos Image para mostrar la imagen
        if (validUri && validUri.startsWith('http')) {
            return <Image source={{ uri: validUri }} style={styles.profileImage} resizeMode="cover" />;
        } else {
            // Si la URL no es válida, mostramos una imagen por defecto
            return <Image source={require('../../assets/images/icon.png')} style={styles.profileImage} resizeMode="cover" />;
        }
    };
    
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!userInfo) {
        return <Text>No user found</Text>;
    }

    const renderItem = ({ item }) => {

        return (
            <Post
                id={item.id}
                username={userInfo.username || 'Usuario desconocido'}
                location={item.location}
                media={item.media}
                caption={item.caption}
                description={item.title}
                likes={userInfo.likesCount || 0}
                comments={item.comments_count}
                isLike={userInfo.isLike}
                favorites={userInfo.isFavorite}
                countFavorite={userInfo.favoritesCount}
                date={new Date(item.date).toLocaleDateString()}
            />
        );
    };
 

    return (
        <View style={commonStyles.container}>
            <FlatList
                ListHeaderComponent={userInfo && (
                    <View>
                        <View style={styles.coverContainer}>
                            <Image source={{ uri: userInfo.bannerImage }} style={styles.coverImage} />
                            {renderProfileImage(userInfo.profile_pic)}

                            <View style={styles.usernameContainer}>
                                <Text style={styles.username}>{userInfo.username}</Text>
                            </View>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.bio}>{userInfo.descriptionProfile || "No description"}</Text>
                            <View style={styles.levelAndPosts}>
                                <Text style={styles.level}>
                                    {userInfo.lvl ? `Nivel: ${userInfo.lvl}` : "Nivel: 0"}
                                </Text>
                                <Text style={styles.postsCount}>{userInfo.posts.length} Posts</Text>
                            </View>
                        </View>
                    </View>
                )}

                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />
            <Footer />
        </View>
    );
}
