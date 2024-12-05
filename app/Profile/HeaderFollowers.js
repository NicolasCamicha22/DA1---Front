import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import commonStyles from '../styles';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import styles from './ProfileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme } from 'react-native';
import { createStylesProfile } from './ProfileStyles';

export default function HeaderFollowers() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const styles = createStylesProfile(theme);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const username = await AsyncStorage.getItem('username');  // O el campo donde guardas el nombre de usuario
                if (username) {
                    setUserInfo({ username });
                } else {
                    console.error('No se encontró el nombre de usuario en AsyncStorage');
                }
            } catch (error) {
                console.error('Error al obtener el nombre de usuario:', error);
            }
        };

        fetchUserInfo();
    }, []);


    return (
        <View style={styles.headerFollowersContainer}>
            {/* Flecha para regresar */}
            <TouchableOpacity onPress={() => router.push('./ProfileScreen')} style={styles.backButton}>
                <Icon name="arrow-back-outline" size={24} color="#000" />
            </TouchableOpacity>

            {/* Nombre del usuario debajo de la flecha */}
            <View style={styles.usernameContainerFollowers}>
                <Text style={styles.usernameText}>{userInfo ? userInfo.username : 'Loading...'}</Text>
            </View>
        </View>
    );
}
