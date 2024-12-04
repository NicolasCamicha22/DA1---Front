import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Importamos el Picker
import commonStyles from '../styles';
import styles from './LoginStyles';

export default function SignUpForm({
    username, setUsername,
    name, setName,
    surname, setSurname,
    email, setEmail,
    password, setPassword,
    descriptionProfile, setDescriptionProfile,
    gender, setGender,
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

            {/* Gender (Aquí usamos el Picker) */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Gender</Text>
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                    style={[styles.inputSignUp, { height: 45 }]} // Se aplica la misma altura que en los inputs
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male (M)" value="M" />
                    <Picker.Item label="Female (F)" value="F" />
                    <Picker.Item label="Non-binary (X)" value="X" />
                    <Picker.Item label="Prefer not to say (-)" value="-" />
                </Picker>
            </View>


            {/* Description Profile */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Description Profile</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Description profile..."
                    value={descriptionProfile}
                    onChangeText={setDescriptionProfile}
                />
            </View>

            {/* Botón de registro */}
            <TouchableOpacity style={styles.buttonSignUp} onPress={handleSignUp}>
                <Text style={styles.buttonTextSignUp}>REGISTER</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
