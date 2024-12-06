import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router'; 
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme  } from 'react-native';
import { createStyles } from '../styles';

export default function HeaderProfile() {
    const router = useRouter();
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const commonStyles = createStyles(theme);


    const handleSettingsPress = () => {
        router.push('./EditProfile')
    };

    return (
        <View style={commonStyles.header}>
            <Image source={require('../../assets/images/SocialMedia - logo.png')} style={commonStyles.headerLogo} />
            <TouchableOpacity onPress={handleSettingsPress} style={commonStyles.settingsIcon}>
                <Icon style={commonStyles.iconSetting} name="settings-outline" size={24}/>
            </TouchableOpacity>
        </View>
    );
}