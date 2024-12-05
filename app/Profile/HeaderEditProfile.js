import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; 
import { lightTheme, darkTheme } from '../themes';
import { useColorScheme  } from 'react-native';
import { createStylesProfile} from './ProfileStyles';


const HeaderEditProfile = ({ onSave }) => {
    const router = useRouter();
    const colorScheme = useColorScheme(); 
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const styles = createStylesProfile(theme);

    const handleCancel = () => {
        router.push('./ProfileScreen')
    };

    const handleDone = () => {
        //onSave(); 
        router.push('./ProfileScreen')
    };

    return (
        <View style={styles.editHeaderContainer}>
            <TouchableOpacity onPress={handleCancel} style={styles.editButton}>
                <Text style={styles.cancelTextStyle}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.editHeaderTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleDone} style={styles.editButton}>
                <Text style={styles.doneTextStyle}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HeaderEditProfile;