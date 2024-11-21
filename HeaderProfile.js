import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function HeaderProfile() {
    const navigation = useNavigation();

    const handleSettingsPress = () => {
        navigation.navigate('EditProfile'); 
    };

    return (
        <View style={styles.header}>
            <Image source={require('../assets/images/SocialMedia - logo.png')} style={styles.headerLogo} />
            <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsIcon}>
                <Icon name="settings-outline" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
}