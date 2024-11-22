import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import HeaderEditProfile from './HeaderEditProfile';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';  // Usamos useRouter para navegar

export default function EditProfileScreen() {
    const router = useRouter();
    const handleSettingsPress = () => {
        router.push('./PorfileScreen')
    };
    
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        username: '',
        bio: '',
        gender: 'prefer not to say',
        profileImage: "https://randomuser.me/api/portraits/men/41.jpg",
        coverImage: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    });

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
                const response = await axios.get(`https://da1-back.onrender.com/user/${userId}`);
                setUserInfo({
                    firstName: response.data.user.first_name,
                    lastName: response.data.user.last_name,
                    username: response.data.user.username,
                    bio: response.data.user.bio,
                    gender: response.data.user.gender,
                    profileImage: response.data.user.profile_pic,
                    coverImage: response.data.user.cover_image_url,
                });
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
            }
        };
        loadUserInfo();
    }, [userId]);

    const handleSave = async () => {
        if (!userId) return;

        const updatedData = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            username: userInfo.username,
            bio: userInfo.bio,
            gender: userInfo.gender,
            profileImage: userInfo.profileImage,
            coverImage: userInfo.coverImage,
        };

        try {
            const response = await axios.put(`https://da1-back.onrender.com/user/${userId}`, updatedData);
            console.log("Perfil actualizado:", response.data);
            router.push('./PorfileScreen')
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
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

    return (
        <View style={styles.container}>
            <HeaderEditProfile onSave={handleSave} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.coverContainer}>
                    <Image source={{ uri: userInfo.coverImage }} style={styles.coverImage} />
                    <TouchableOpacity style={styles.coverIconContainer}>
                        <Ionicons name="camera" size={24} color="white" />
                    </TouchableOpacity>

                    <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
                    <TouchableOpacity style={styles.profileIconOverlay}>
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
                        <TouchableOpacity style={styles.dropdownContainer} onPress={toggleDropdown}>
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
                            {['male', 'female', 'non-binary', 'prefer not to say'].map((option) => (
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