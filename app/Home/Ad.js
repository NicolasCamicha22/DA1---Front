import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; // Usa Ionicons o cualquier biblioteca de íconos
import { createStylesHome } from './HomeStyles';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme  } from 'react-native';

const screenWidth = Dimensions.get('window').width;

function Ad({ title, imageUrl, linkUrl }) {
    const colorScheme = useColorScheme(); 


 const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const styles = createStylesHome(theme);

    const handlePress = () => {
        console.log("Abriendo URL:", linkUrl);
        if (linkUrl) {
            Linking.openURL(linkUrl)
                .catch(err => console.error("Error al abrir el enlace:", err));
        }
    };

    return (
        <View style={styles.adContainer}>
            {/* Cabecera */}
            <View style={styles.adHeader}>
                <Text style={styles.adLabel}>Publicidad</Text>
                <FontAwesome name="dollar" size={20} color="#6c44f4" />
            </View>

            {/* Título */}
            <Text style={styles.adTitle}>{title}</Text>

            {/* Imagen */}
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={[styles.postImage, { width: screenWidth }]} />
            ) : (
                <Text style={styles.noImageText}>Imagen no disponible</Text>
            )}

            {/* Botón de Visitar */}
            <View style={styles.adFooter}>
                <TouchableOpacity onPress={handlePress} style={styles.visitButtonContainer}>
                    <Text style={styles.visitButton}>Visitar</Text>
                    <Ionicons name="link-outline" size={16} color="#6c44f4" style={styles.linkIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Ad;
