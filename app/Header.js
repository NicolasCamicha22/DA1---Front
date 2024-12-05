import { View, Image } from 'react-native';
import { lightTheme, darkTheme } from './themes';
import { useColorScheme  } from 'react-native';
import { createStyles } from './styles';
import React from 'react';


export default function Header() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const styles = createStyles(theme);
   
    return (
        
        <View style={styles.header}>
            <Image source={require('../assets/images/SocialMedia - logo.png')} style={styles.headerLogo} />
        </View>
    );
}
