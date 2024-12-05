import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme  } from 'react-native';
import { createStyles } from '../styles';
import { createStylesPost} from './PostStyles';

export default function HeaderUpload({ goToPostScreen }) {
    const router = useRouter();
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const commonStyles = createStyles(theme);
    const styles = createStylesPost(theme);

        return (
            <View style={commonStyles.header}>
                <Image source={require('../../assets/images/SocialMedia - logo.png')} style={commonStyles.headerLogo} />
                <TouchableOpacity onPress={goToPostScreen} style={styles.postTextButton}>
                <Text style={styles.postText}>Post</Text>
            </TouchableOpacity>
            </View>
        );
       
   
}