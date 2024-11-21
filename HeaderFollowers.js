import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

export default function HeaderFollowers() {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);

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
        navigation.navigate('ProfileScreen'); 
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