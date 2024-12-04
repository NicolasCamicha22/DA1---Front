import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import Footer from '../Footer';
import commonStyles from '../styles';
import styles from './PostStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImagePostScreen = () => {
    const route = useRouter();
    const [location, setLocation] = useState('');
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [galleryImages, setGalleryImages] = useState([]); // Contendrá las URLs de las imágenes

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const storedImages = await AsyncStorage.getItem('galleryImages');
                if (storedImages) {
                    setGalleryImages(JSON.parse(storedImages));  // Recuperar las URLs desde AsyncStorage
                }
            } catch (error) {
                console.error("Error al recuperar imágenes:", error);
            }
        };
        fetchImages();
    }, []); // Recuperar las imágenes cuando se monta el componente

    const handleSharePost = async () => {
        if (!caption.trim()) {
            Alert.alert("Error", "El título (caption) no puede estar vacío.");
            return;
        }

        if (galleryImages.length === 0) {
            Alert.alert("Error", "Debe seleccionar al menos una imagen.");
            return;
        }

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const userId = await AsyncStorage.getItem('userId');

            if (!token || !userId) {
                Alert.alert("Error", "No se encontró el token de acceso o el ID de usuario. Por favor, inicia sesión nuevamente.");
                return;
            }

            // Crear el payload con las imágenes en URLs
            const media = galleryImages; // Aquí, directamente usamos las URLs que guardamos en AsyncStorage

            const payload = {
                userId,
                title: description,
                caption,
                location: location || 'Sin ubicación',
                description: description || 'Sin descripción',
                media,  // Aquí enviamos las URLs directamente
            };

            console.log("Payload enviado al backend:", payload);

            const response = await axios.post(
                'http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/posts',
                payload, // Enviamos las URLs de las imágenes
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status === 'success') {
                console.log("Publicación compartida:", response.data);
                Alert.alert("Éxito", "Publicación compartida exitosamente.");
                route.push('../Home/HomeScreen');  // Redirige a la pantalla de inicio
            } else {
                Alert.alert("Error", "Hubo un problema al compartir la publicación.");
            }
        } catch (error) {
            console.error("Error al compartir publicación:", error.response || error.message);
            Alert.alert("Error", "Ocurrió un error al compartir la publicación.");
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
                    keyExtractor={(item, index) => `${item}-${index}`}  // Usamos la URL directamente para las keys
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.selectedImage} />
                    )}
                    ListEmptyComponent={<Text>No hay imágenes seleccionadas</Text>}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginVertical: 10 }}
                />

                <View style={styles.formContainer}>
                    <TouchableOpacity style={styles.locationContainer}>
                        <Icon name="map-marker" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            placeholder="Agregar ubicación"
                            value={location}
                            onChangeText={setLocation}
                            style={styles.inputImagePost}
                        />
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Icon name="pencil" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            placeholder="Título"
                            value={caption}
                            onChangeText={setCaption}
                            style={styles.inputImagePost}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="pencil" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            placeholder="Descripción"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.inputImagePost}
                            multiline
                        />
                    </View>

                    <TouchableOpacity style={styles.shareButton} onPress={handleSharePost}>
                        <Text style={styles.shareButtonText}>Compartir</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
};

export default ImagePostScreen;
