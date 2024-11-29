import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Footer';
import Header from '../Header';
import commonStyles from '../styles';
import styles from './PostStyles';

const ImageUploadScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const router = useRouter();

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

        if (galleryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
            alert('Lo siento, necesitamos permisos de acceso a la galería y la cámara para mostrar tus fotos.');
        }
    };

    const selectImageFromGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                allowsMultipleSelection: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const newImages = result.assets.map((asset, index) => ({
                    id: `${galleryImages.length + index + 1}`,
                    uri: asset.uri,
                }));

                setGalleryImages([...galleryImages, ...newImages]);
            } else {
                console.log("No images selected or selection was canceled");
            }
        } catch (error) {
            console.log("Error selecting images from gallery:", error);
        }
    };

    const openCamera = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri);
                setGalleryImages([...galleryImages, { id: `${galleryImages.length + 1}`, uri: result.assets[0].uri }]);
            } else {
                console.log("No image captured or capture was canceled");
            }
        } catch (error) {
            console.log("Error capturing image from camera:", error);
        }
    };

    const goToPostScreen = async () => {
        if (galleryImages.length > 0) {
            try {
                await AsyncStorage.setItem('galleryImages', JSON.stringify(galleryImages));
                router.push('./ImagePostScreen');
            } catch (error) {
                console.error("Error al guardar las imágenes en AsyncStorage:", error);
            }
        } else {
            alert('Por favor, selecciona o toma una foto antes de continuar.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
                <View style={styles.cameraContainer}>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.cameraPreview} />
                    ) : (
                        <Text style={styles.cameraPlaceholder}>CAMARA</Text>
                    )}
                </View>

                <View style={styles.cameraButtonContainer}>
                    <View style={styles.cameraButtonWrapper}>
                        <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
                            <Ionicons name="camera" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.confirmButtonUpload} onPress={goToPostScreen}>
                        <Text style={styles.confirmButtonText}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.GaleriaButtonWrapper}>
                    <TouchableOpacity style={styles.galleryButton} onPress={selectImageFromGallery}>
                        <Ionicons name="folder-open" size={25} color="black" />
                        <Text style={styles.galleryButtonText}>Seleccionar desde la Galería</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.galleryTitle}>Selected photos</Text>

                {/* Galería de imágenes seleccionadas */}
                <View style={[styles.galleryCenteredContainer, { flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }]}>
                    {galleryImages.length > 0 ? (
                        galleryImages.map((item) => (
                            <Image key={item.id} source={{ uri: item.uri }} style={styles.galleryImage} />
                        ))
                    ) : (
                        <Text>No hay imágenes en la galería</Text>
                    )}
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
};

export default ImageUploadScreen;
