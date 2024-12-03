import React, { useState } from 'react'; 
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendCode } from '../api';
import commonStyles from '../styles'; 
import styles from './LoginStyles'; 

const ForgotPasswordScreen = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSendCode = async () => {
        if (!emailOrUsername.trim()) {
            setMessage('Por favor, ingresa tu email o username.');
            return;
        }
    
        try {
            const data = emailOrUsername.includes('@') 
                ? { email: emailOrUsername } 
                : { username: emailOrUsername };
    
            const response = await sendCode(data);
            
            // Guardar en AsyncStorage para usarlo en ResetPasswordScreen
            await AsyncStorage.setItem('emailOrUsername', emailOrUsername);
    
            setMessage('Código enviado. Revisa tu bandeja de entrada.');
            setTimeout(() => {
                router.push('./ResetPasswordScreen');
            }, 2000);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error al enviar el código.';
            setMessage(errorMsg);
        }
    };
    

    return (
        <ScrollView contentContainerStyle={styles.scrollContainerLogin} style={styles.containerLogin}>
            <View style={styles.containerForgotPassword}>
                <Image source={require('../../assets/images/SocialMedia - logo.png')} style={styles.logo} />
                <Text style={styles.titleLogin}>Recovery</Text>

                {/* Campo de texto para email o nombre de usuario */}
                <View style={styles.inputContainerForgotPassword}>
                    <Text style={styles.inputLabelLogin}>Email or Username</Text>
                    <TextInput
                        style={styles.inputLogin}
                        value={emailOrUsername}
                        onChangeText={setEmailOrUsername}
                        keyboardType="default"
                        autoCapitalize="none"
                        placeholderTextColor="#a1a1a1"
                    />
                </View>

                {/* Botón para enviar el código */}
                <TouchableOpacity style={styles.buttonForgotPassword} onPress={handleSendCode}>
                    <Text style={styles.buttonTextLogin}>SEND EMAIL</Text>
                </TouchableOpacity>

                {/* Mensaje de respuesta */}
                {message ? <Text style={styles.messageForgotPassword}>{message}</Text> : null}

                {/* Enlace para volver al login */}
                <View style={styles.signupContainerLogin}>
                    <TouchableOpacity onPress={() => router.push('./LoginScreen')}>
                        <Text style={styles.forgotPasswordLogin}>Return</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordScreen;
