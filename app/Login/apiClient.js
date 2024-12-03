import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiClient = axios.create({
  baseURL: 'http://ec2-34-203-234-215.compute-1.amazonaws.com:8080',
  //baseURL: 'https://da1-back.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('apiClient creado:', apiClient); 

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Evita múltiples reintentos

      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await apiClient.post('/api/auth/refresh-token', { refreshToken });
          console.log('Refrescar token respuesta:', response.data);  // Agrega este log
          const { accessToken } = response.data.data;


          await AsyncStorage.setItem('accessToken', accessToken);

          // Vuelve a enviar la solicitud original con el nuevo token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          console.log('Nuevo Authorization header:', originalRequest.headers['Authorization']);  // Agrega este log
          return apiClient(originalRequest);  // Reenvía la solicitud con el nuevo token

        } catch (refreshError) {
          console.error('Error al refrescar el token:', refreshError.response?.data || refreshError.message);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export {apiClient};
