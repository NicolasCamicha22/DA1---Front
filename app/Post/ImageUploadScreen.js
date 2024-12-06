import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, useColorScheme, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Footer from '../Footer';
import Header from '../Header';
import commonStyles from '../styles';
import styles from './PostStyles';
import * as FileSystem from 'expo-file-system';
import NetInfo from '@react-native-community/netinfo';
import { lightTheme, darkTheme } from '../themes';
import { createStyles } from '../styles';
import { createStylesPost } from './PostStyles';
import HeaderUpload from './HeaderUpload';



// Función para subir la imagen al backend y obtener la URL
const uploadImageToBackend = async (imageUri) => {
    const fileName = imageUri.split('/').pop();  // Extraemos el nombre del archivo
    const fileType = 'image/jpeg';  // Suponiendo que la imagen siempre será JPEG. Cambia según sea necesario.

    try {
        // Leer la imagen y convertirla a base64
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Crear un objeto JSON con los datos
        const imageData = {
            fileContent: base64Image,  // Imagen en base64
            fileType: fileType,  // Tipo de archivo
        };

        // Enviar los datos al backend
        const response = await fetch('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/auth/upload', {
            method: 'POST',
            body: JSON.stringify(imageData),  // Usar JSON.stringify para convertir el objeto a JSON
            headers: {
                'Content-Type': 'application/json',  // Asegúrate de que el contenido sea JSON
                Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,  // Token de autenticación
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();  // Leer el mensaje de error si no es exitosa
            console.error('Error al subir la imagen:', errorMessage);
            throw new Error(`Error al subir la imagen: ${errorMessage}`);
        }

        const data = await response.json();
        console.log('Imagen subida correctamente:', data);
        return data;  // Regresamos la respuesta con la URL de la imagen subida

    } catch (error) {
        console.error('Error al intentar subir la imagen:', error);
        Alert.alert('Error', 'No se pudo subir la imagen.');
    }
};

const ImageUploadScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const router = useRouter();
    const theme = useColorScheme === 'dark' ? darkTheme : lightTheme;
    const styles = createStylesPost(theme);

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
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
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
                const newImage = { id: `${galleryImages.length + 1}`, uri: result.assets[0].uri };
                setGalleryImages([...galleryImages, newImage]);
            } else {
                console.log("No image captured or capture was canceled");
            }
        } catch (error) {
            console.log("Error capturing image from camera:", error);
        }
    };

    const goToPostScreen = async () => {
        // Verificamos si hay conexión a internet antes de continuar
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            Alert.alert('Error de Conexión', 'No hay conexión a internet. Por favor, verifica tu conexión y vuelve a intentarlo.');
            return;
        }

        if (galleryImages.length > 0) {
            try {
                // Creamos un array para almacenar las URLs de las imágenes
                const imageUrls = [];

                for (const image of galleryImages) {
                    const response = await uploadImageToBackend(image.uri);  // Subimos la imagen
                    if (response && response.data && response.data.imageUrl) {
                        imageUrls.push(response.data.imageUrl);  // Agregamos la URL al array
                    }
                }

                // Actualizamos AsyncStorage con el array de URLs
                await AsyncStorage.setItem('galleryImages', JSON.stringify(imageUrls));
                console.log('URLs de las imágenes subidas:', imageUrls);

                // Redirigimos a la pantalla de posteo
                router.push('./ImagePostScreen');
            } catch (error) {
                console.error("Error al guardar las imágenes en AsyncStorage:", error);
            }
        } else {
            alert('Por favor, selecciona o toma una foto antes de continuar.');
        }
    };

    const removeImage = (id) => {
        setGalleryImages(galleryImages.filter(item => item.id !== id));
    };

    return (
        <View style={styles.mainBackground}>
            <HeaderUpload
                goToPostScreen={(images) => goToPostScreen(images)} // Conecta la función
                galleryImages={galleryImages} // Pasa las imágenes seleccionadas
            />
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
                        <Text style={styles.galleryButtonText}>Select from gallery</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.galleryTitle}>Selected photos</Text>

                <View style={styles.divider} />

                <View style={[styles.galleryGrid, { flexDirection: 'row' }]}>
                    {galleryImages.length > 0 ? (
                        galleryImages.map((item) => (
                            <Image key={item.id} source={{ uri: item.uri }} style={styles.galleryImage} />
                        ))
                    ) : (
                        <Text style={styles.noText}>No images selected</Text>
                    )}
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
};

export default ImageUploadScreen;
