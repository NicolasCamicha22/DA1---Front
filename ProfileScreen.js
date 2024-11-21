import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, Button, Alert } from 'react-native';
import axios from 'axios';
import styles from './styles';
import Footer from './Footer';
import HeaderProfile from './HeaderProfile';
import Icon from 'react-native-vector-icons/Ionicons';
import Post from './Post';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);

    // Función para normalizar las URLs de las imágenes
    // Función para normalizar las URLs de las imágenes
    const normalizeImageUrl = (imageUrl) => {
        // Si la URL empieza con https://, la dejamos tal cual
        if (imageUrl && imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        
        // Si la URL es una ruta relativa como '/uploads/xxx', le agregamos la base del servidor
        if (imageUrl && imageUrl.startsWith('/uploads/')) {
            return `https://da1-back.onrender.com${imageUrl}`;
        }
        
        // Si la URL es file:// (local en el dispositivo), tenemos que hacer algo especial
        if (imageUrl && imageUrl.startsWith('file://')) {
            // Necesitamos transformar la URL local en una accesible
            return `https://da1-back.onrender.com${imageUrl.replace('file://', '/uploads/')}`;
        }
        
        // Imagen predeterminada en caso de que no sea válida
        return 'https://da1-back.onrender.com/uploads/default.jpg';
    };
    


    // Obtener el userId desde AsyncStorage
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                    console.log('userId cargado desde AsyncStorage:', storedUserId);
                }
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
            }
        };
        fetchUserId();
    }, []);

    // Cargar los datos del perfil cuando userId esté disponible
    useEffect(() => {
        const loadProfileData = async () => {
            if (!userId) return;
    
            setLoading(true);
            setError(null);
    
            try {
                const response = await axios.get(`https://da1-back.onrender.com/user/${userId}`);
                const normalizedUserInfo = {
                    ...response.data.user,
                    profile_image_url: normalizeImageUrl(response.data.user.profile_image_url),
                    cover_image_url: normalizeImageUrl(response.data.user.cover_image_url) 
                };
                setUserInfo(normalizedUserInfo);  // Actualizamos el estado con la información normalizada
                if (response.data.posts) {
                    setPosts(response.data.posts);
                    console.log('Posts cargados:', response.data.posts);
                } else {
                    console.error('No hay posts en la respuesta:', response.data);
                }
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error);
                setError('Error al cargar los datos del perfil. Por favor, intenta de nuevo.');
            } finally {
                setLoading(false);
            }
        };
    
        loadProfileData();
    }, [userId]);

    
    

    // Manejar la actualización de la imagen de portada
    const handleChangeCoverImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permiso denegado', 'Se necesitan permisos para acceder a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri;

            try {
                // Enviar la nueva URL de la imagen al backend
                const response = await axios.post(`https://da1-back.onrender.com/user/update-cover-image`, {
                    userId,
                    coverImageUrl: newImageUri
                });

                // Actualizar el estado con la nueva imagen de portada
                setUserInfo(prevState => ({
                    ...prevState,
                    cover_image_url: normalizeImageUrl(response.data.coverImageUrl) // Normalizamos la URL devuelta
                }));

                Alert.alert('Imagen de encabezado cambiada con éxito');
            } catch (error) {
                console.error('Error al actualizar la imagen de encabezado:', error);
                Alert.alert('Error al actualizar la imagen de encabezado');
            }
        }
    };

    // Renderizar los posts
    const renderItem = ({ item }) => (
        <Post
            location={item.location}
            imageUrl={item.images}
            caption={item.caption}
            description={item.description}
            likes={item.likes_count}
            comments={item.comments_count}
            favorites={item.favorites_count}
            date={item.date}
        />
    );

    // Manejo del estado de carga
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Manejo del estado de error
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Reintentar" onPress={() => loadProfileData()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HeaderProfile onSettingsPress={() => navigation.navigate('EditProfile')} />

            <FlatList
                ListHeaderComponent={userInfo && (
                    <View>
                        {/* Mini Header para cambiar imagen de portada */}
                        <View style={styles.miniHeader}>
                            <TouchableOpacity onPress={handleChangeCoverImage}>
                                <Text style={styles.changeCoverText}>Cambiar imagen de encabezado</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.coverContainer}>
                            {userInfo.cover_image_url ? (
                                // Mostrar la imagen de encabezado si existe
                                <Image source={{ uri: userInfo.cover_image_url }} style={styles.coverImage} />
                            ) : (
                                // Mostrar un botón o mensaje si no hay imagen de encabezado
                                <TouchableOpacity onPress={handleChangeCoverImage}>
                                    <Text style={styles.changeCoverText}>Agregar imagen de encabezado</Text>
                                </TouchableOpacity>
                            )}
                            <Image source={{ uri: userInfo.profile_image_url }} style={styles.profileImage} />
                            <View style={styles.usernameContainer}>
                                <Text style={styles.username}>{userInfo.username}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                    <Icon name="create-outline" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.bio}>{userInfo.description || "No description"}</Text>
                            <View style={styles.levelAndPosts}>
                                <Text style={styles.level}>
                                    {userInfo.level ? `Nivel: ${userInfo.level}` : "Nivel: Null"}
                                </Text>
                                <Text style={styles.postsCount}>{userInfo.posts_count} Posts</Text>
                            </View>
                        </View>

                        <View style={styles.followContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Followers')} style={styles.followButton}>
                                <Text style={styles.followNumber}>{userInfo.followers_count}</Text>
                                <Text style={styles.followText}>Followers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Following')} style={styles.followButton}>
                                <Text style={styles.followNumber}>{userInfo.following_count}</Text>
                                <Text style={styles.followText}>Following</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />

            <Footer />
        </View>
    );
}
