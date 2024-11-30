import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, TextInput, Button } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';



const screenWidth = Dimensions.get('window').width;

const Post = ({ id, username, location, imageUrl, caption, likes, comments, favorites, date, description }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [likeCount, setLikeCount] = useState(Number(likes) || 0);
    const [favoriteCount, setFavoriteCount] = useState(Number(favorites) || 0);
    const [comment, setComment] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const flatListRef = useRef(null);
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        // Si ya tienes datos iniciales (como likes, favoritos), configura los estados
        setIsLiked(likes > 0);
        setIsFavorited(favorites > 0);
    }, [likes, favorites]);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / screenWidth);
        setCurrentImageIndex(index);
    };

    const normalizeImageUrl = (url) => {
        if (!url) return null;
        // Verifica si el URL ya contiene la base o es relativa
        if (url.startsWith('https://')) return url;
        const formattedUrl = `https://da1-back.onrender.com${url.startsWith('/uploads') ? url : '/uploads/' + url}`.replace(/\/uploads\/uploads/, '/uploads');
        return formattedUrl;
    };
    

    const normalizedImageUrls = Array.isArray(imageUrl) ? imageUrl.filter(url => url).map(normalizeImageUrl) : [];



    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            setUserId(storedUserId); // Guarda el userId en el estado
        };
        fetchUserId();
    }, []);


        // Cargar comentarios cuando el componente se monta
        useEffect(() => {
            const fetchComments = async () => {
                try {
                    const response = await axios.get('https://da1-back.onrender.com/comments', {
                        params: { postId: id },
                    });
                    setCommentList(response.data); // Establece los comentarios en el estado
                } catch (error) {
                    console.error('Error al cargar los comentarios:', error);
                }
            };
    
            fetchComments();
        }, [id]); // Se ejecuta cada vez que el post cambia


    const toggleLike = async () => {
        try {
            const response = await axios.post('https://da1-back.onrender.com/like-post', { postId: id, userId });

            if (response.data.liked) {
                // Si el like se agregó, actualiza el estado
                setIsLiked(true);
                setLikeCount((prev) => prev + 1);
            } else {
                // Si el like se eliminó, actualiza el estado
                setIsLiked(false);
                setLikeCount((prev) => prev - 1);
            }
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };



    const toggleFavorite = async () => {
        try {
            const response = await axios.post('https://da1-back.onrender.com/favorite-post', { userId, postId: id });
            if (response.data.favorited) {
                setIsFavorited(true);
                setFavoriteCount((prev) => prev + 1);
            } else {
                setIsFavorited(false);
                setFavoriteCount((prev) => prev - 1);
            }
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
        }
    };





    const handleComment = async () => {
        if (!comment) return;
        try {
            const response = await axios.post('https://da1-back.onrender.com/comment-post', {
                postId: id,
                userId,
                comment
            });
            setComment('');
            setCommentList(prev => [...prev, { userId, comment }]);
            console.log('Comentarios recibidos:', commentList);

        } catch (error) {
            console.error('Error al agregar comentario:', error);
            if (error.response) {
                alert(error.response.data.message || 'Error al agregar comentario');
            } else {
                alert('Error de conexión');
            }
        }
    };

    const toggleModal = async () => {
        if (!modalVisible) {
            // Cuando se abre el modal, carga los comentarios del backend
            try {
                const response = await axios.get('https://da1-back.onrender.com/comments', {
                    params: { postId: id }
                });
                setCommentList(response.data); // Asigna los comentarios recibidos al estado
            } catch (error) {
                console.error('Error al cargar comentarios:', error);
            }
        }
        setModalVisible(!modalVisible);
    };


    return (
        <View style={styles.postContainer}>
            <View style={styles.userInfo}>
                <Text style={styles.username}>{username}</Text>
                <View style={styles.locationContainer}>
                    <Icon name="map-marker" size={16} color="#666" style={styles.locationIcon} />
                    <Text style={styles.location}>{location}</Text>
                </View>
            </View>
            {normalizedImageUrls.length > 0 ? (
                <FlatList
                    data={normalizedImageUrls}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={[styles.postImage, { width: screenWidth }]}
                            onError={(error) => {
                                console.log('Error al cargar la imagen:', error.nativeEvent.error);
                            }}
                        />
                    )}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            ) : (
                <Text>No hay imágenes disponibles</Text>
            )}

            <View style={styles.paginationContainer}>
                {normalizedImageUrls.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            { backgroundColor: currentImageIndex === index ? '#6c44f4' : '#000' }
                        ]}
                    />
                ))}
            </View>
            <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
            <Text style={styles.caption}>{caption}</Text>
            <Text style={styles.description}>{description}</Text>
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
                        onPress={toggleModal}
                    />
                    <Text style={styles.buttonIconText}>{commentList.length}</Text>
                </View>
            </View>

            {/* Modal para mostrar y agregar comentarios */}
            <Modal isVisible={modalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    {commentList.length > 0 ? (
                        <FlatList
                            data={commentList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    <Text style={styles.commentText}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.username}: </Text>
                                        {item.comment}
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
