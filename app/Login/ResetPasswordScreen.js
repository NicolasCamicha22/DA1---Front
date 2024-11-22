import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { resetPassword, sendCode } from '../api';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
 
const ResetPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();
 
    useEffect(() => {
        const fetchEmail = async () => {
            const storedEmail = await AsyncStorage.getItem('email');
            setEmail(storedEmail || '');
        };
        fetchEmail();
    }, []);
 
    const handleResetPassword = async () => {
        if (code && newPassword) {
            try {
                const response = await resetPassword({ email, code, newPassword });
                setMessage(response.message || 'Contraseña cambiada con éxito.');
                setError('');
                setTimeout(() => router.push('./LoginScreen'), 2000);
            } catch (error) {
                setError(error.response?.data?.message || 'Error al cambiar la contraseña.');
                setMessage('');
            }
        } else {
            setError('Por favor, completa todos los campos.');
        }
    };
 
    const handleSendCode = async () => {
        try {
            await sendCode(email);
            await AsyncStorage.setItem('email', email); // Guardar email en AsyncStorage
            setMessage('Código enviado a tu email. Por favor, revisa tu bandeja de entrada.');
        } catch (error) {
            setError(error.response?.data?.message || 'Error al enviar el código.');
        }
    };
 
    return (
        <ScrollView contentContainerStyle={styles.scrollContainerLogin}>
            <View style={styles.containerForgotPassword}>
                <Image source={require('../../assets/images/SocialMedia - logo.png')} style={styles.logo} />
                <Text style={styles.titleLogin}>Recovery</Text>
 
                {/* Campo de texto para el código */}
                <View style={styles.inputContainerForgotPassword}>
                    <Text style={styles.inputLabelLogin}>Code</Text>
                    <TextInput
                        style={styles.inputLogin}
                        placeholder="Code"
                        value={code}
                        onChangeText={setCode}
                    />
                </View>
 
                {/* Campo de texto para nueva contraseña */}
                <View style={styles.inputContainerForgotPassword}>
                    <Text style={styles.inputLabelLogin}>New password</Text>
                    <TextInput
                        style={styles.inputLogin}
                        placeholder="New password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                    />
                </View>
 
                {/* Botón para cambiar contraseña */}
                <TouchableOpacity style={[styles.buttonForgotPassword, { marginBottom: 15 }]} onPress={handleResetPassword}>
                    <Text style={styles.buttonTextLogin}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
 
                {/* Botón para reenviar el correo con handleSendCode */}
                <TouchableOpacity style={styles.buttonForgotPassword} onPress={handleSendCode}>
                    <Text style={styles.buttonTextLogin}>RE SEND EMAIL</Text>
                </TouchableOpacity>
 
                {/* Enlace para volver al login */}
                <View style={styles.signupContainerLogin}>
                    <TouchableOpacity onPress={() => router.push('./ForgotPasswordScreen')}>
                        <Text style={styles.forgotPasswordLogin}>Return</Text>
                    </TouchableOpacity>
                </View>
 
                {/* Mostrar mensaje o error */}
                {message ? <Text style={styles.messageForgotPassword}>{message}</Text> : null}
                {error ? <Text style={styles.errorForgotPassword}>{error}</Text> : null}
            </View>
        </ScrollView>
    );
};
 
export default ResetPasswordScreen;