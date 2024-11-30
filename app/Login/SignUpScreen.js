// SignUpScreen.js
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Asegúrate de que esta importación esté disponible
import SignUpForm from './SignUpForm'; // Asegúrate de que la ruta sea correcta
import { registerUser } from '../api';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export default function SignUpScreen() {
    const router = useRouter(); // Inicializa el router
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const selectProfilePic = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert('Permiso para acceder a la galería es necesario.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled && result.assets && result.assets[0].uri) {
                const uri = result.assets[0].uri;
                const base64Image = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setProfilePic(`data:image/jpeg;base64,${base64Image}`);
                Alert.alert("Foto de Perfil", "¡Foto seleccionada con éxito!");
            } else {
                console.warn("No se encontró un URI válido para la imagen.");
                Alert.alert("Error", "No se pudo seleccionar la imagen. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al seleccionar la imagen:", error);
            Alert.alert("Error", "Hubo un problema al seleccionar la imagen. Intenta nuevamente.");
        }
    };


    const handleSignUp = async () => {
        try {
            // Aquí envías los datos al backend usando Axios
            const response = await registerUser({ username, name, surname, email, password, profilePic });
            Alert.alert("Registro exitoso", response.message);
            router.push('./LoginForm'); // Redirige al login después de registrar
        } catch (error) {
            Alert.alert("Error al registrar", error.message || "Hubo un error al intentar registrar");
        }
    };

    const handleSignIn = () => {
        // Lógica para volver a la pantalla de Login
        router.push('./LoginForm'); 
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
                profilePic={profilePic}
                selectProfilePic={selectProfilePic}
                onSignUp={handleSignUp}
                onSignIn={handleSignIn} // Pasa la función para volver al login
            />
        </KeyboardAvoidingView>
    );
}