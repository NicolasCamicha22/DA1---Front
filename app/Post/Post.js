import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './PostStyles';
import Modal from 'react-native-modal';

const screenWidth = Dimensions.get('window').width;

const Post = ({ id, username, location, media, caption, likes, comments, favorites, countFavorite, date, description, isLike, imageUrl }) => {
    const [isLiked, setIsLiked] = useState(isLike);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [likeCount, setLikeCount] = useState(likes || 0);
    const [isFavorited, setIsFavorited] = useState(favorites);
    const [favoriteCount, setFavoriteCount] = useState(countFavorite || 0);
    const [userId, setUserId] = useState(null);
    const [comment, setComment] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId) {
                setUserId(storedUserId);
            } else {
                console.error("No userId found");
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const response = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const postData = response.data.data;  // Asegurándonos de que el post esté dentro de "data"


                // Establecer los estados para like y favoritos
                setLikeCount(postData.likesCount);
                //setFavoriteCount(postData.favoritesCount);






                // Aquí actualizamos el estado para los comentarios
                setCommentList(postData.Comments.map(comment => ({
                    text: comment.text,  // El texto del comentario
                    username: comment.User.username,  // El nombre de usuario que hizo el comentario


                })));
            } catch (error) {
                console.error('Error al cargar los datos del post:', error);
            }
        };

        fetchPostData();
    }, [id]); // Solo se ejecuta cuando el id del post cambia


    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / screenWidth);
        setCurrentImageIndex(index);
    };

    // Función para manejar el like
    const toggleLike = async () => {
        console.log("Like button clicked. isLiked:", isLiked);
        try {
            setIsLiked(prev => !prev);
            setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
            const token = await AsyncStorage.getItem('accessToken');
            const response = await axios.put(
                `http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${id}/likes`,
                { userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Respuesta del like:', response.data);

            if (response.data.message === 'Like added') {
                setIsLiked(true);
                setLikeCount(likeCount + 1);
                await AsyncStorage.setItem(`like_${id}`, 'true');
            } else if (response.data.message === 'Like removed') {
                setIsLiked(false);
                setLikeCount(likeCount - 1);
                await AsyncStorage.setItem(`like_${id}`, 'false');
            }
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

    // Función para agregar o quitar favoritos
    const toggleFavorite = async () => {
        console.log("Favorite button clicked. isFavorited:", isFavorited);
        try {
            const token = await AsyncStorage.getItem('accessToken');
            let response;
            setIsFavorited(prev => !prev);
            setFavoriteCount(prev => isFavorited ? prev - 1 : prev + 1);

            if (isFavorited) {
                console.log('Eliminando de favoritos...');
                response = await axios.delete(
                    `http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/favorites/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('Eliminar favorito response:', response.data);

                if (response.data.status === 'success') {
                    setIsFavorited(false);
                    setFavoriteCount(favoriteCount - 1);
                    await AsyncStorage.setItem(`favorite_${id}`, 'false');
                }
            } else {
                console.log('Marcando como favorito...');
                response = await axios.post(
                    `http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${id}/favorites`,
                    { userId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('Marcar como favorito response:', response.data);

                if (response.data.status === 'success' && response.data.favorited) {
                    setIsFavorited(true);
                    setFavoriteCount(favoriteCount + 1);
                    await AsyncStorage.setItem(`favorite_${id}`, 'true');
                }
            }
        } catch (error) {
            console.error('Error al agregar o quitar de favoritos:', error);
        }
    };

    // Función para agregar un comentario
    const handleComment = async () => {
        if (!comment) return;
        try {
            const token = await AsyncStorage.getItem('accessToken');
    
            // Hacer la solicitud para agregar el comentario
            const response = await axios.post(
                `http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts/${id}/comments`,
                { userId, text: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Comentario agregado:', response.data);
    
            // Obtener el username del comentario
            const commentUserId = response.data.data.userId;  // Obtener el userId del comentario
            const userResponse = await axios.get(
                `http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            const username = userResponse.data.username || 'Usuario desconocido';  // Obtener el username
    
            // Limpiar el campo de comentario
            setComment('');
    
            // Agregar el nuevo comentario con el username a la lista sin necesidad de recargar
            setCommentList(prev => [
                ...prev,
                {
                    userId,
                    username,  // Asignar el username obtenido
                    text: response.data.data.text,
                }
            ]);
        } catch (error) {
            console.error('Error al agregar comentario:', error);
            alert(error.response?.data?.message || 'Error al agregar comentario');
        }
    };
    


    const finalImageUrl = imageUrl || 'https://via.placeholder.com/150';

    return (
        <View style={styles.postContainer}>
            <View style={styles.userInfo}>
                <Text style={styles.username}>{username || 'Usuario desconocido'}</Text>
                <View style={styles.locationContainer}>
                    <Icon name="map-marker" size={16} color="#666" style={styles.locationIcon} />
                    <Text style={styles.location}>{location || 'Ubicación no especificada'}</Text>
                </View>
            </View>

            {finalImageUrl ? (
                <FlatList
                    data={media}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={[styles.postImage, { width: screenWidth }]}
                        />
                    )}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            ) : (
                <Text>No hay imágenes disponibles</Text>
            )}

            <Text style={styles.date}>{date}</Text>
            <Text style={styles.caption}>{caption || 'Sin título'}</Text>
            <Text style={styles.description}>{description || 'Sin descripción'}</Text>


            <View style={styles.actionsContainer}>
                <View style={styles.buttonIcon}>
                    <Ionicons
                        name={isFavorited ? "star" : "star-outline"}
                        size={24}
                        color={isFavorited ? 'lightblue' : 'black'}
                        onPress={toggleFavorite}
                    />
                    <Text style={styles.buttonIconText}>{favoriteCount}</Text>
                </View>
                <View style={styles.buttonIcon}>
                    <Ionicons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={24}
                        color={isLiked ? 'darkred' : 'black'}
                        onPress={toggleLike}
                    />
                    <Text style={styles.buttonIconText}>{likeCount}</Text>
                </View>
                <View style={styles.buttonIcon}>
                    <Ionicons
                        name="chatbubble-outline"
                        size={22}
                        color="black"
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                    <Text style={styles.buttonIconText}>{commentList.length}</Text>
                </View>
            </View>

            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
                <View style={styles.modalContent}>
                    {commentList.length > 0 ? (
                        <FlatList
                            data={commentList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    <Text style={styles.commentText}>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {item.username}:
                                        </Text>
                                        {item.text}
                                    </Text>
                                </View>
                            )}
                        />
                    ) : (
                        <Text>No hay comentarios disponibles</Text>
                    )}
                    <TextInput
                        style={styles.commentInput}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Escribe un comentario..."
                    />
                    <Button title="Comentar" onPress={handleComment} />
                </View>
            </Modal>
        </View>
    );
};

export default Post;
