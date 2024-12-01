import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { useRouter } from 'expo-router'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeaderFollowers() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Obtener el userId desde AsyncStorage
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                }
            } catch (error) {
                console.error('Error al cargar userId de AsyncStorage:', error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const loadUserData = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`https://da1-back.onrender.com/user/${userId}`);
                
                // Verifica si la respuesta contiene los datos correctos
                if (response.data && response.data.user) {
                    const { username, name, surname } = response.data.user;

                    if (name && surname) {
                        // Combinamos el nombre y apellido
                        const fullName = `${name} ${surname}`;
                        setUserInfo({ username: fullName });
                    } else if (username) {
                        // Si no hay nombre completo, mostramos solo el username
                        setUserInfo({ username });
                    } else {
                        console.error('No se encontró nombre o nombre de usuario');
                    }
                } else {
                    console.error('No se encontraron datos del usuario');
                }
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
            }
        };

        loadUserData();
    }, [userId]);

    const handleSettingsPress = () => {
        router.push('./ProfileScreen'); 
    };

    return (
        <View style={styles.headerFollowers}>
            <Text style={styles.editHeaderTitle}>
                {userInfo && userInfo.username ? userInfo.username : 'Cargando...'}
            </Text>
            <TouchableOpacity onPress={handleSettingsPress} style={styles.arrowIcon}>
                <Icon name="arrow-back-outline" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
}
