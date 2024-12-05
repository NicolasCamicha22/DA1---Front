import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import commonStyles from '../styles';
import HeaderEditProfile from './HeaderEditProfile';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import styles from './ProfileStyles';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme } from 'react-native';
import { createStyles } from '../styles';
import { createStylesProfile } from './ProfileStyles';

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
        console.log('Imagen subida correctamente:', data.data.imageUrl);
        return data.data.imageUrl;  // Regresamos la URL de la imagen subida
    } catch (error) {
        console.error('Error al intentar subir la imagen:', error);
        Alert.alert('Error', 'No se pudo subir la imagen.');
    }
};

export default function EditProfile() {
    const router = useRouter();
    const handleSettingsPress = () => {
        router.push('./PorfileScreen');
    };

    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNightMode, setIsNightMode] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const commonStyles = createStyles(theme);
    const styles = createStylesProfile(theme);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                setUserId(storedUserId);
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
            }
        };
        fetchUserId();
    }, []);


    useEffect(() => {
        const loadUserInfo = async () => {
            if (!userId) return;
            try {
                const response = await axios.get(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                    },
                });
                setUserInfo({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    bio: response.data.bio,
                    gender: response.data.gender,
                    profileImage: response.data.profile_pic,  // Verifica si aquí hay un valor
                    coverImage: response.data.bannerImage,   // Verifica si aquí hay un valor
                });
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
            }
        };
        loadUserInfo();
    }, [userId]);

    const handleSave = async () => {
        if (!userId) return;

        // Subir las imágenes si han sido cambiadas
        let profileImageUrl = userInfo.profileImage;
        let coverImageUrl = userInfo.coverImage;

        // Si la imagen de perfil está seleccionada, la subimos
        if (userInfo.profileImage && userInfo.profileImage.startsWith('file://')) {
            profileImageUrl = await uploadImageToBackend(userInfo.profileImage);  // Subir imagen de perfil
        }

        // Si la imagen de portada está seleccionada, la subimos
        if (userInfo.coverImage && userInfo.coverImage.startsWith('file://')) {
            coverImageUrl = await uploadImageToBackend(userInfo.coverImage);  // Subir imagen de portada
        }

        const updatedData = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            username: userInfo.username,
            bio: userInfo.bio,
            gender: userInfo.gender,
            profile_pic: profileImageUrl || "https://api.dicebear.com/8.x/initials/svg?radius=50&seed=NC",  // Usa una URL predeterminada si no está definida
            bannerImage: coverImageUrl || "https://api.dicebear.com/8.x/initials/svg?radius=50&seed=NC",  // Usa una URL predeterminada si no está definida
        };

        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await axios.put('http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/profile', updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200 && response.data.status === 'success') {
                Alert.alert('Perfil actualizado con éxito');
                router.push('./ProfileScreen');
            } else {
                throw new Error('Error al actualizar el perfil');
            }
        } catch (error) {
            console.error("Error al guardar los cambios:", error.response ? error.response.data : error.message);
            Alert.alert('Error al actualizar el perfil', error.response ? error.response.data.message : error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('userId');
            router.push('../Login/LoginScreen');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleGenderChange = (gender) => {
        setUserInfo({ ...userInfo, gender });
        setIsDropdownOpen(false);
    };

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    // Selección de imagen de perfil
    const handleProfileImageChange = async () => {
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
            const localUri = result.assets[0].uri;
            console.log('Imagen seleccionada:', localUri);

            // Subir la imagen y obtener la URL pública
            const imageUrl = await uploadImageToBackend(localUri);

            // Actualiza el estado con la URL pública
            setUserInfo((prevState) => ({
                ...prevState,
                profileImage: imageUrl,  // Actualiza con la URL pública
            }));
            console.log('URL de imagen de perfil subida:', imageUrl);  // Verifica si la URL pública es correcta
        }
    };

    // Selección de imagen de portada
    const handleCoverImageChange = async () => {
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
            const localUri = result.assets[0].uri;
            console.log('Imagen de portada seleccionada:', localUri);

            // Subir la imagen de portada y obtener la URL pública
            const imageUrl = await uploadImageToBackend(localUri);

            // Actualiza el estado con la URL pública de la portada
            setUserInfo((prevState) => ({
                ...prevState,
                coverImage: imageUrl,  // Actualiza con la URL pública de la portada
            }));
            console.log('URL de imagen de portada subida:', imageUrl);  // Verifica si la URL pública es correcta
        }
    };


    const deleteFriend = async (friendId) => {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('accessToken');
    
        if (!userId || !token) {
            console.error('No se encontró el userId o token');
            return;
        }
    
        try {
            // Realiza la solicitud DELETE para eliminar al amigo
            const response = await axios.delete(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/friends/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                Alert.alert('Amigo eliminado', 'Se ha eliminado al amigo correctamente.');
    
                // Aquí, actualiza la lista de amigos (followers o following) si es necesario
                // Ejemplo:
                // setFollowersData(prevData => prevData.filter(item => item.id !== friendId));
                // setFollowingData(prevData => prevData.filter(item => item.id !== friendId));
            } else {
                Alert.alert('Error', 'No se pudo eliminar al amigo.');
            }
        } catch (error) {
            console.error('Error al eliminar el amigo:', error);
            Alert.alert('Error', 'Hubo un problema al eliminar el amigo.');
        }
    };

    return (
        <View style={commonStyles.container}>
            <HeaderEditProfile onSave={handleSave} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.coverContainer}>
                    <Image source={{ uri: userInfo.coverImage }} style={styles.coverImage} />
                    <TouchableOpacity style={styles.coverIconContainer} onPress={handleCoverImageChange}>
                        <Ionicons name="camera" size={24} color="white" />
                    </TouchableOpacity>

                    <Image source={{ uri: userInfo.profile_pic }} style={styles.profileImage} />
                    <TouchableOpacity style={styles.profileIconOverlay} onPress={handleProfileImageChange}>
                        <Ionicons name="camera" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainerEdit}>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input2}
                            value={userInfo.firstName}
                            onChangeText={(text) => setUserInfo({ ...userInfo, firstName: text })}
                        />
                    </View>
                    <View style={styles.line2} />

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Lastname</Text>
                        <TextInput
                            style={styles.input2}
                            value={userInfo.lastName}
                            onChangeText={(text) => setUserInfo({ ...userInfo, lastName: text })}
                        />
                    </View>
                    <View style={styles.line2} />

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input2}
                            value={userInfo.username}
                            onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
                        />
                    </View>
                    <View style={styles.line2} />

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Bio</Text>
                        <TextInput
                            style={styles.textArea}
                            value={userInfo.bio}
                            onChangeText={(text) => setUserInfo({ ...userInfo, bio: text })}
                            multiline
                        />
                    </View>
                    <View style={styles.line2} />

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Gender</Text>
                        <TouchableOpacity style={styles.dropdownContainer} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <Text style={styles.dropdownText}>{userInfo.gender}</Text>
                            <Ionicons
                                name="caret-down"
                                size={16}
                                color="black"
                                style={{ marginLeft: 'auto', transform: [{ rotate: isDropdownOpen ? '180deg' : '0deg' }] }}
                            />
                        </TouchableOpacity>
                    </View>

                    {isDropdownOpen && (
                        <View style={styles.dropdownOptions}>
                            {['M', 'F', 'X', '-'].map((option) => (
                                <React.Fragment key={option}>
                                    <TouchableOpacity onPress={() => handleGenderChange(option)}>
                                        <Text style={styles.dropdownOption}>{option}</Text>
                                    </TouchableOpacity>
                                </React.Fragment>
                            ))}
                        </View>
                    )}

                    <View style={styles.line2} />


                    <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
                        <Text style={styles.logoutText}>Log out</Text>
                    </TouchableOpacity>
                    <View style={styles.line2} />

                    <TouchableOpacity style={styles.deleteAccountButton} onPress={toggleModal}>
                        <Text style={styles.deleteAccountText}>Delete Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Guardar cambios</Text>
                    </TouchableOpacity>

                    <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={toggleModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContentEdit}>
                                <Text style={styles.modalText}>Are you sure?</Text>
                                <View style={styles.buttonContainerEdit}>
                                    <TouchableOpacity style={styles.confirmButtonEdit} onPress={handleLogout}>
                                        <Text style={styles.modalbuttonText}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButtonEdit} onPress={toggleModal}>
                                        <Text style={styles.modalbuttonText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </View>
    );
}
