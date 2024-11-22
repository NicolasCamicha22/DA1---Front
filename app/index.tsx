import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router'; 
import { validateAccessToken, refreshAccessToken } from './api'; 

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);  // Estado de carga

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Intenta validar el accessToken
        const isValidToken = await validateAccessToken();

        if (isValidToken) {
          router.push('./Home/HomeScreen');  // Si el token es válido, redirige al Home
        } else {
          // Si el token no es válido, intenta refrescarlo
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            router.push('./Home/HomeScreen');  // Redirige si el refresh token es válido
          } else {
            router.push('./Login/LoginScreen');  // Si no, redirige a Login
          }
        }
      } catch (error) {
        console.error('Error al verificar tokens:', error);
        router.push('./Login/LoginScreen');  // En caso de error, redirige a Login
      } finally {
        setLoading(false);  // Al finalizar, actualiza el estado de carga
      }
    };

    checkAuthStatus();
  }, [router]);

  if (loading) {
    return null;  // Mientras se valida el token, no renderiza nada
  }

  return null;  // Este componente no renderiza nada directamente
}
