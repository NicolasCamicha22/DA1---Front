import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router'; 
import { refreshAccessToken } from './api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);  // Estado de carga

  useEffect(() => {
    const checkToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (accessToken) {
          // Intenta refrescar el token
          const newAccessToken = await refreshAccessToken();
          
          if (newAccessToken) {
            router.push('./Home/HomeScreen');  // Redirige a la pantalla de inicio
          } else {
            router.push('./Login/LoginScreen');  // Redirige al login si no se pudo refrescar el token
          }
        } else {
          router.push('./Login/LoginScreen');  // Si no hay token, va al login
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        router.push('./Login/LoginScreen');  // En caso de error, ir al login
      } finally {
        setLoading(false);  // Termina el estado de carga
      }
    };

    checkToken();  // Ejecuta la función de validación al iniciar la aplicación
  }, [router]);

  if (loading) {
    return null;  // Puedes mostrar una pantalla de carga aquí si lo prefieres
  }

  return null;  // El componente no necesita renderizar nada directamente
}
