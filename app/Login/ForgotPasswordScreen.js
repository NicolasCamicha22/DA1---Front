import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity,  KeyboardAvoidingView, Platform,   Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendCode } from '../api';
import styles from '../styles'; 

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSendCode = async () => {
        try {
            await sendCode(email);
            await AsyncStorage.setItem('email', email); // Guardar email en AsyncStorage
            setMessage('Código enviado a tu email. Por favor, revisa tu bandeja de entrada.');
            setTimeout(() => {
                router.push('./ResetPasswordScreen'); // Redirigir a ResetPasswordScreen
            }, 2000); 
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al enviar el código.');
        }
    };

    const { width, height } = Dimensions.get('window'); 

    return (
        <KeyboardAvoidingView
    style={[styles.containerLogin, { width, height }]}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
       
       <View style={styles.containerForgotPassword}>
                <Image source={require('../../assets/images/SocialMedia - logo.png')} style={[styles.logo, { marginTop: -43 }]}/>
                <Text style={styles.titleForgotPassword}>Recovery</Text>

                {/* Campo de texto para email o nombre de usuario */}
                <View style={[styles.inputContainerForgotPassword, { width: width * 0.9 }]}>
                    <Text style={styles.inputLabelSignUp}>Email</Text>
                    <TextInput
                        style={[styles.inputLogin, { width: '100%' }]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#a1a1a1"
                    />
                </View>

                {/* Botón para enviar el código */}
                <TouchableOpacity style={[styles.buttonForgotPassword, { width: width * 0.8 }]} onPress={handleSendCode}>
                    <Text style={styles.buttonTextLogin}>SEND EMAIL</Text>
                </TouchableOpacity>

                {/* Mensaje de respuesta */}
                {message ? <Text style={styles.messageForgotPassword}>{message}</Text> : null}

                {/* Enlace para volver al login */}
                <View style={styles.signupContainerLogin}>
                    <TouchableOpacity onPress={() => router.push('./LoginForm')}>
                        <Text style={styles.forgotPasswordLogin}>Return</Text>
                    </TouchableOpacity>
                </View>
            </View>
    
        </KeyboardAvoidingView>
    );
};

export default ForgotPasswordScreen;
