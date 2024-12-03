import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import commonStyles from '../styles'; 
import styles from './LoginStyles';

export default function SignUpForm({
    username, setUsername, 
    name, setName, 
    surname, setSurname, 
    email, setEmail, 
    password, setPassword, 
    profilePic, selectProfilePic, 
    onSignUp, onSignIn 
}) {
    // Estado para Confirm Password y error de validación
    const [confirmPassword, setConfirmPassword] = useState('');

    // Expresión regular para validar correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Función para manejar el envío del formulario
    const handleSignUp = () => {
        // Validar que las contraseñas coinciden
        if (password !== confirmPassword) {
            Alert.alert(
                'Error',
                'Las contraseñas no coinciden. Por favor, ingrésalas nuevamente.',
                [{ text: 'OK' }]
            );
            return;
        }

        // Validar el correo electrónico
        if (!emailRegex.test(email)) {
            Alert.alert(
                'Error',
                'Por favor, ingrese un correo electrónico válido.',
                [{ text: 'OK' }]
            );
            return;
        }

        // Llamar la función de registro si todo es válido
        onSignUp();
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainerSignUp}>
            <Text style={styles.titleSignUp}>Sign Up</Text>
            <View style={styles.signupContainerSignUp}>
                <Text style={styles.signupTextSignUp}>Already an account?</Text>
                <TouchableOpacity onPress={onSignIn}>
                    <Text style={styles.signupLinkSignUp}>Sign In</Text>
                </TouchableOpacity>
            </View>

            {/* Username */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Username</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Name */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Name</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Surname */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Surname</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Surname"
                    value={surname}
                    onChangeText={setSurname}
                />
            </View>

            {/* Email */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Email</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Email"
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {/* Password */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Password</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    secureTextEntry
                />
            </View>

            {/* Confirm Password */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Confirm Password</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    autoCapitalize="none"
                    secureTextEntry
                />
            </View>

            {/* Foto de perfil */}
            <TouchableOpacity style={styles.profilePicButtonSignUp} onPress={selectProfilePic}>
                <Text style={styles.profilePicButtonTextSignUp}>Elegir Foto de Perfil</Text>
            </TouchableOpacity>

            {profilePic && <Image source={{ uri: profilePic }} style={styles.profilePicPreviewSignUp} />}

            {/* Botón de registro */}
            <TouchableOpacity style={styles.buttonSignUp} onPress={handleSignUp}>
                <Text style={styles.buttonTextSignUp}>REGISTER</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
