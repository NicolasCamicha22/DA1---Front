import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import Footer from '../Footer';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImagePostScreen = () => {
    const route = useRouter();
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [caption, setCaption] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);

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

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.galleryPreviewTitle}>Fotos seleccionadas:</Text>
                <FlatList
                    data={galleryImages}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.uri }} style={styles.selectedImage} />
                    )}
                    ListEmptyComponent={<Text>No hay imágenes seleccionadas</Text>}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginVertical: 10 }}
                />

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

                    <TouchableOpacity style={styles.shareButton} onPress={handleSharePost}>
                        <Text style={styles.shareButtonText}>SHARE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
};

export default ImagePostScreen;
