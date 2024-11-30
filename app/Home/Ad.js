import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from '../styles';

function Ad({ title, imageUrl, linkUrl }) {
    const handlePress = () => {
        console.log("Abriendo URL:", linkUrl);
        if (linkUrl) {
            Linking.openURL(linkUrl)
                .catch(err => console.error("Error al abrir el enlace:", err));
        }
    };
    

    return (
        <View style={styles.adContainer}>
            <Text style={styles.adLabel}>Publicidad</Text>
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.postImage} />
            ) : (
                <Text style={styles.noImageText}>Imagen no disponible</Text>
            )}
            <Text style={styles.adTitle}>{title}</Text>
            <TouchableOpacity onPress={handlePress} >
                <Text style={styles.adButtonText}>Visitar</Text>
            </TouchableOpacity>
        </View>
    );
}



export default Ad;
