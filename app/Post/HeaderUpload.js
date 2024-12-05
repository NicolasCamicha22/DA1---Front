import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import stylesPost from './PostStyles';
import { useRouter } from 'expo-router';

export default function HeaderUpload({ goToPostScreen }) {
    const router = useRouter();

        return (
            <View style={styles.header}>
                <Image source={require('../../assets/images/SocialMedia - logo.png')} style={styles.headerLogo} />
                <TouchableOpacity onPress={goToPostScreen} style={stylesPost.postTextButton}>
                <Text style={stylesPost.postText}>Post</Text>
            </TouchableOpacity>
            </View>
        );
       
   
}