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

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error al subir la imagen:', errorMessage);
            throw new Error(`Error al subir la imagen: ${errorMessage}`);
        }

        // Aquí debe ser la respuesta del backend
        const data = await response.json();
        console.log('Imagen subida correctamente:', data);  // Verifica si la respuesta contiene la URL esperada

        // Verifica si data.imageUrl existe
        if (data && data.imageUrl) {
            return data.imageUrl;  // Regresamos la URL de la imagen subida
        } else {
            throw new Error('La respuesta del backend no contiene la URL de la imagen');
        }
    } catch (error) {
        console.error('Error al intentar subir la imagen:', error);
        Alert.alert('Error', 'No se pudo subir la imagen.');
        return null;  // Devolvemos null en caso de error
    }
};


export default function EditProfile() {
    const router = useRouter();


    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNightMode, setIsNightMode] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
    
        let profileImageUrl = userInfo.profileImage;
        let coverImageUrl = userInfo.coverImage;
    
        // Si la imagen de perfil está seleccionada (y es local), la subimos
        if (userInfo.profileImage && userInfo.profileImage.startsWith('file://')) {
            profileImageUrl = await uploadImageToBackend(userInfo.profileImage);  // Subir imagen de perfil
        }
    
        // Si la imagen de portada está seleccionada (y es local), la subimos
        if (userInfo.coverImage && userInfo.coverImage.startsWith('file://')) {
            coverImageUrl = await uploadImageToBackend(userInfo.coverImage);  // Subir imagen de portada
        }
    
        const updatedData = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            username: userInfo.username,
            bio: userInfo.bio,
            gender: userInfo.gender,
            profileImage: profileImageUrl || "https://api.dicebear.com/8.x/initials/svg?radius=50&seed=NC",  // URL predeterminada si no se sube
            coverImage: coverImageUrl || "https://api.dicebear.com/8.x/initials/svg?radius=50&seed=NC",  // URL predeterminada si no se sube
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
            setUserInfo((prevState) => ({
                ...prevState,
                coverImage: result.assets[0].uri,  // Asegúrate de actualizar correctamente el estado
            }));
            console.log('Imagen de portada seleccionada:', result.assets[0].uri);  // Verifica si la URI está correctamente actualizada
        }
    };

    return (
        <View style={commonStyles.container}>
            <HeaderEditProfile onSave={handleSave} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.coverContainer}>
                    <Image source={{ uri: userInfo.bannerImage }} style={styles.coverImage} />
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

                    <TouchableOpacity style={styles.nightModeButton} onPress={toggleNightMode}>
                        <Ionicons name="moon-outline" size={20} color="black" />
                        <Text style={styles.nightModeText}>
                            {isNightMode ? 'Light mode' : 'Night mode'}
                        </Text>
                    </TouchableOpacity>
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
                    <TouchableOpacity onPress={handleSave}>
                        <Text>Guardar cambios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
                        <Text style={styles.logoutText}>Log out</Text>
                    </TouchableOpacity>
                    <View style={styles.line2} />

                    <TouchableOpacity style={styles.deleteAccountButton} onPress={toggleModal}>
                        <Text style={styles.deleteAccountText}>Delete Account</Text>
                    </TouchableOpacity>

                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={toggleModal}
                    >
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
