import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // Asegúrate de usar el useRouter de expo-router
import LoginForm from './LoginForm';
import { login } from '../api'; // Función de login
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Función para intentar iniciar sesión
  const onLogin = async () => {
    console.log('Intentando iniciar sesión con:', email, password);

    try {
      const response = await login(email, password); // Llamada al backend
      console.log('Respuesta completa de login:', response);

      if (response && response.accessToken && response.refreshToken && response.userId) {
        console.log('Tokens y userId recibidos:', response.accessToken, response.refreshToken, response.userId);

        // Almacenar los tokens y userId en AsyncStorage
        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
        await AsyncStorage.setItem('userId', response.userId.toString());

        // Redirigir al Home después de iniciar sesión
        router.push('../Home/HomeScreen'); // Redirige a HomeScreen si el login es exitoso
      } else {
        console.log('No se recibieron datos de la API');
      }
    } catch (error) {
      Alert.alert("Login Error", "Email o password incorrecta");
    }
  };

  // Navegar a la pantalla de SignUp
  const handleSignUp = () => {
    router.push('./SignUpScreen');
  };

  // Navegar a la pantalla de ForgotPassword
  const handleForgotPassword = () => {
    router.push('./Login/ForgotPasswordScreen');
  };

  return (
    <LoginForm
      onLogin={onLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSignUp={handleSignUp} // Pasa la función de navegar a SignUp
      onPasswordReset={handleForgotPassword} // Pasa la función de navegar a ForgotPassword
    />
  );
}
