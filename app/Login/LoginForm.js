import { View, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Image, Platform, ScrollView, Alert } from 'react-native';
import styles from '../styles';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
export default function LoginForm({ onLogin, email, setEmail, password, setPassword, onSignUp, onGoogleLogin, onPasswordReset }) {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        // Verifica si los campos están vacíos
        if (!email || !password) {
            Alert.alert("Error", "Por favor, complete los campos.");
            return;
        }
        onLogin(email, password)
            .catch((error) => {
                // Maneja el error del backend mostrando un mensaje de alerta amigable
                Alert.alert("Login Error", "Email o password incorrectas.");
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.containerLogin}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Para ajustar en iOS y Android
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Ajuste del desplazamiento en iOS
        >
            <ScrollView contentContainerStyle={styles.scrollContainerLogin} showsVerticalScrollIndicator={false}>
                <Image source={require('../../assets/images/SocialMedia - logo.png')} style={styles.logo} />
                <Text style={styles.titleLogin}>Login</Text>

                <View style={styles.inputWrapperLogin}>
                    <Text style={styles.inputLabelLogin}>Email</Text>
                    <TextInput
                        style={styles.inputLogin}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#a1a1a1"
                    />
                </View>

                <View style={styles.inputWrapperPassword}>
                    <Text style={styles.inputLabelLogin}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            placeholderTextColor="#a1a1a1"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                    <Text style={styles.buttonTextLogin}>LOGIN</Text>
                </TouchableOpacity>

                <View style={styles.signupContainerLogin}>
                    <Text style={styles.signupTextLogin}>Don't have an account?</Text>
                    <TouchableOpacity onPress={onSignUp}>
                        <Text style={styles.signupLinkLogin}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => router.push('./ForgotPasswordScreen')}>
                    <Text style={styles.forgotPasswordLogin}>Forgot your password?</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainerLogin}>
                    <View style={styles.lineLogin} />
                    <Text style={styles.orTextLogin}>or</Text>
                    <View style={styles.lineLogin} />
                </View>

                <TouchableOpacity onPress={onGoogleLogin}>
                    <Image
                        source={require('../../assets/images/Google logo.png')}
                        style={styles.googleButtonLogin}
                    />
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}