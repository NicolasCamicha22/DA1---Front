import React from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, useSegments } from 'expo-router';
import { createStyles } from './styles';
import { lightTheme, darkTheme } from './themes';

export default function Footer() {
    const router = useRouter();
    const segments = useSegments();  // Obtiene el segmento actual de la ruta
    const isActive = (screen) => segments[0] === screen; // Comprueba si estamos en la pantalla activa
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;   
    const styles = createStyles(theme);

    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.push('../Home/HomeScreen')}>
                <Icon
                    name={isActive('HomeScreen') ? "home" : "home-outline"}
                    style={[styles.footerIcon, isActive('HomeScreen') && styles.activeIcon]}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('../Home/SearchScreen')}>
                <Icon
                    name={isActive('SearchScreen') ? "search" : "search-outline"}
                    style={[styles.footerIcon, isActive('SearchScreen') && styles.activeIcon]}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('../Post/ImageUploadScreen')}>
                <Icon
                    name={isActive('CreatePostScreen') ? "add-circle" : "add-circle-outline"}
                    style={[styles.footerIcon, isActive('CreatePostScreen') && styles.activeIcon]}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('../Home/FavoritesScreen')}>
                <Icon
                    name={isActive('FavoritesScreen') ? "star" : "star-outline"}
                    style={[styles.footerIcon, isActive('FavoritesScreen') && styles.activeIcon]}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('../Profile/ProfileScreen')}>
                <Icon
                    name={isActive('ProfileScreen') ? "person" : "person-outline"}
                    style={[styles.footerIcon, isActive('ProfileScreen') && styles.activeIcon]}
                />
            </TouchableOpacity>
        </View>
    );
}
