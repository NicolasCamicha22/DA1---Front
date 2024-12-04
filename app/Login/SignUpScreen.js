// SignUpScreen.js
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import SignUpForm from './SignUpForm'; 
import { registerUser } from '../api';



export default function SignUpScreen() {
    const router = useRouter(); // Inicializa el router
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(''); 
    const [descriptionProfile, setDescriptionProfile] = useState('');
    


    const handleSignUp = async () => {
        try {
            // Aquí envías los datos al backend usando Axios
            const response = await registerUser({ username, name, surname, email, password, descriptionProfile, gender });

            Alert.alert("Registro exitoso", response.message);
            router.push('./LoginScreen'); // Redirige al login después de registrar
        } catch (error) {
            Alert.alert("Error al registrar", error.message || "Hubo un error al intentar registrar");
        }
    };

    const handleSignIn = () => {
        // Lógica para volver a la pantalla de Login
        router.push('./LoginScreen'); 
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Para ajustar en iOS y Android
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Ajuste del desplazamiento en iOS
        >
            <SignUpForm
                username={username}
                setUsername={setUsername}
                name={name}
                setName={setName}
                surname={surname}
                setSurname={setSurname}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                gender={gender}
                setGender={setGender}
                descriptionProfile={descriptionProfile}
                setDescriptionProfile={setDescriptionProfile}
                onSignUp={handleSignUp}
                onSignIn={handleSignIn} // Pasa la función para volver al login
            />
        </KeyboardAvoidingView>
    );
}