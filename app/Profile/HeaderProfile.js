import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import commonStyles from '../styles';
import { useRouter } from 'expo-router'; 
import styles from './ProfileStyles';

export default function HeaderProfile() {
    const router = useRouter();

    const handleSettingsPress = () => {
        router.push('./EditProfile')
    };

    return (
        <View style={styles.header}>
            <Image source={require('../../assets/images/SocialMedia - logo.png')} style={styles.headerLogo} />
            <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsIcon}>
                <Icon name="settings-outline" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
}