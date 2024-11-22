import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles'; // Asegúrate de que la ruta sea correcta

export default function Header() {
    return (
        <View style={styles.header}>
            <Image source={require('../assets/images/SocialMedia - logo.png')} style={styles.headerLogo} />
        </View>
    );
}
