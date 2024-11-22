import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://da1-back.onrender.com',
});

// Agregar un interceptor para manejar la expiración de tokens
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica si la solicitud falló debido a un 401 (token expirado)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Obtener el `refreshToken` almacenado
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No se encontró el refresh token');
        }

        // Solicitar un nuevo `accessToken` usando el `refreshToken`
        const response = await axios.post('https://da1-back.onrender.com/token', { token: refreshToken });
        const { accessToken } = response.data;

        // Almacenar el nuevo `accessToken`
        await AsyncStorage.setItem('accessToken', accessToken);

        // Actualizar el encabezado de la solicitud original
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest); // Reintentar la solicitud original
      } catch (error) {
        console.error('Error al refrescar el token:', error);
        // Puedes redirigir al usuario al inicio de sesión si no se pudo renovar el token
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
