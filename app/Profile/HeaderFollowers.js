import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router'; 
import React, { useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme  } from 'react-native';
import { createStylesProfile} from './ProfileStyles';

export default function HeaderFollowers() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const styles = createStylesProfile(theme);

    useEffect(() => {
        const userData = {
            username: "Nicolas Camicha",
        };

        const timer = setTimeout(() => {
            setUserInfo(userData);
        }, 1000);

        return () => clearTimeout(timer); // Limpieza del temporizador
    }, []);

    const handleSettingsPress = () => {
        router.push('./ProfileScreen'); 
    };

    return (
        <View style={styles.headerFollowers}>
            <Text style={styles.editHeaderTitle}>
                {userInfo ? userInfo.username : 'Loading...'}
            </Text>
            <TouchableOpacity onPress={handleSettingsPress} style={styles.arrowIcon}>
                <Icon name="arrow-back-outline" size={24} color="#000" />
            </TouchableOpacity>
           
        </View>
    );
}