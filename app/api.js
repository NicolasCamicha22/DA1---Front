import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
    //baseURL: 'http://192.168.100.2:5000',
    baseURL: 'https://da1-back.onrender.com'
});

export const sendCode = async (email) => {
    try {
        const response = await api.post('/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// api.js
export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        
        // Verifica que la respuesta tenga los datos necesarios
        if (response.data && response.data.accessToken && response.data.refreshToken && response.data.userId) {
            return {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                userId: response.data.userId
            };
        } else {
            throw new Error('Faltan datos importantes en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error en la API:', error.response ? error.response.data : error.message); // Log del error
        throw error; // Lanza el error para que sea manejado en el front
    }
};

export const validateAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      if (!accessToken) {
        throw new Error('No se encontró el accessToken');
      }
  
      // Hacemos una solicitud a la API para validar el accessToken
      const response = await api.get('/validate-token', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Si la API nos dice que el token es válido
      return response.data.valid;
  
    } catch (error) {
      console.error('Error al validar el accessToken:', error);
      return false;  // Si hay cualquier error, consideramos que el token no es válido
    }
  };
  
  export const refreshAccessToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No se encontró el refreshToken');
      }
  
      // Solicitar un nuevo accessToken usando el refreshToken
      const response = await api.post('/token', { token: refreshToken });
  
      const newAccessToken = response.data.accessToken;
  
      // Almacenar el nuevo accessToken en AsyncStorage
      await AsyncStorage.setItem('accessToken', newAccessToken);
  
      return newAccessToken;  // Retorna el nuevo accessToken
    } catch (error) {
      console.error('Error al renovar el accessToken:', error);
      throw new Error('No se pudo renovar el accessToken');
    }
  };
  
  export const logout = async () => {
    try {
      // Eliminar los tokens de AsyncStorage
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      
      // Redirigir a la pantalla de Login
      router.push('/LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  


export const resetPassword = async ({ email, code, newPassword }) => {
    try {
        const response = await api.post('/reset-password', {
            email,
            code,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.log('Error en la API:', error.response ? error.response.data : error.message);
        throw error; // Re-lanza el error para que se pueda manejar en el componente
    }
};


