import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { resetPassword, sendCode } from '../api';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';
import styles from './LoginStyles';

const ResetPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Recuperar email o username de AsyncStorage
        const fetchEmailOrUsername = async () => {
            try {
                const storedEmailOrUsername = await AsyncStorage.getItem('emailOrUsername');
                if (storedEmailOrUsername) {
                    setEmailOrUsername(storedEmailOrUsername); // Llena el campo automáticamente
                }
            } catch (error) {
                console.error('Error al recuperar email o username:', error);
            }
        };

        fetchEmailOrUsername();
    }, []);

    const handleResetPassword = async () => {
        if (code && newPassword) {
            try {
                const data = emailOrUsername.includes('@') 
                    ? { email: emailOrUsername } 
                    : { username: emailOrUsername };
                
                const payload = { emailOrUsername, code, newPassword };
                console.log('Datos enviados a la API:', payload); 

                const response = await resetPassword({ ...data, code, newPassword });
                console.log('Respuesta de la API:', response);
                // Mostrar mensaje de éxito
                setMessage(response.message || 'Contraseña cambiada con éxito.');
                setError('');  // Limpiar errores previos

                // Redirigir después de un pequeño retraso
                setTimeout(() => {
                    router.push('./LoginScreen');  // Redirige al Login
                }, 2000); // Espera 2 segundos antes de redirigir

            } catch (error) {
                // Manejo de errores
                setError(error.response?.data?.message || 'Error al cambiar la contraseña.');
                setMessage(''); // Limpiar el mensaje si hay un error
            }
        } else {
            setError('Por favor, completa todos los campos.');
        }
    };
    


    const handleSendCode = async () => {
        const data = emailOrUsername.includes('@')
            ? { email: emailOrUsername }
            : { username: emailOrUsername };

        try {
            console.log("Datos a enviar:", data);
            const response = await sendCode(data); // Enviar email o username
            console.log(response); // Verificar respuesta
            setMessage('Código enviado. Revisa tu bandeja de entrada.');
        } catch (error) {
            console.error('Error en sendCode:', error.response?.data || error.message);
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