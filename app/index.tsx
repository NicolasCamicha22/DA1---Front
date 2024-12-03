import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router'; 
import { refreshAccessToken } from './api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);  // Estado de carga

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const isValid = await refreshAccessToken();
        if (isValid) {
          router.push('./Home/HomeScreen');  // Redirige a la pantalla de inicio
        } else {
          router.push('./Login/LoginScreen');  // Redirige a la pantalla de login
        }
      } else {
        router.push('./Login/LoginScreen');  // Si no hay token, va al login
      }
    };

    checkToken();  // Ejecuta la función de validación al iniciar la aplicación
  }, [router]);

  return null;  // El componente no necesita renderizar nada directamente
}