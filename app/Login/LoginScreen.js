import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import LoginForm from './LoginForm';
import { login } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0); // Contador de intentos
  const router = useRouter();


  

  // Función para intentar iniciar sesión
  const onLogin = async () => {
    if (attempts >= 3) {
      Alert.alert('Cuenta bloqueada', 'Has superado el número de intentos. Por favor, recupera tu contraseña.');
      router.push('./ForgotPasswordScreen');
      return;
    }
  
    try {
      const response = await login(email, password);
      if (response) {
        const { accessToken, refreshToken, userId } = response;
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userId', userId.toString());

        router.push('../Home/HomeScreen');
      }
    } catch (error) {
      setAttempts((prev) => prev + 1);
      Alert.alert('Error', 'Email o contraseña incorrectos');
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
