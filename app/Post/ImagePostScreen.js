import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Header from '../Header';
import styles from '../styles';

const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');

const ImagePostScreen = () => {
    const route = useRouter();
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [caption, setCaption] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const storedImages = await AsyncStorage.getItem('galleryImages');
                if (storedImages) {
                    setGalleryImages(JSON.parse(storedImages));
                }
            } catch (error) {
                console.error("Error al recuperar imágenes:", error);
            }
        };
        fetchImages();
    }, []);

    const handleSharePost = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                alert("No se encontró el ID de usuario. Por favor, inicia sesión nuevamente.");
                return;
            }

            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('location', location);
            formData.append('caption', caption);
            formData.append('description', description);

            galleryImages.forEach((image, index) => {
                formData.append('images', {
                    uri: image.uri,
                    name: `image_${index}.jpg`,
                    type: 'image/jpeg',
                });
            });

            const response = await axios.post('https://da1-back.onrender.com/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Publicación compartida:", response.data);
            alert("Post compartido exitosamente!");
            route.push('../Home/HomeScreen');
        } catch (error) {
            console.error("Error al compartir publicación:", error);
            alert("Ocurrió un error al compartir la publicación.");
        }
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / screenWidth);
        setCurrentImageIndex(index);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
                keyboardShouldPersistTaps="handled"
            >
                <Header />

                <FlatList
                    ref={flatListRef}
                    data={galleryImages}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item.uri }}
                            style={[styles.selectedImage, { width: screenWidth }]}
                        />
                    )}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
                <View style={styles.paginationContainer}>
                    {galleryImages.length > 1 && galleryImages.map((_, index) => (
                        <View
                            key={index}
                            style={[styles.paginationDot, { backgroundColor: currentImageIndex === index ? '#6c44f4' : '#000' }]}
                        />
                    ))}
                </View>

                <View style={styles.formContainer}>
                    <TouchableOpacity style={styles.locationContainer}>
                        <Icon name="map-marker" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            placeholder="Add Location"
                            value={location}
                            onChangeText={setLocation}
                            style={styles.inputImagePost}
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <View style={styles.inputContainer}>
                        <Icon name="pencil" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            placeholder="Add Title"
                            value={caption}
                            onChangeText={setCaption}
                            style={styles.inputImagePost}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="pencil" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            placeholder="Add Description"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.inputImagePost}
                            multiline
                        />
                    </View>

                    <TouchableOpacity style={styles.buttonSignUp} onPress={handleSharePost}>
                        <Text style={styles.buttonTextSignUp}>SHARE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
};

export default ImagePostScreen;
