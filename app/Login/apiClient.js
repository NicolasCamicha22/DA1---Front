import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // Asegúrate de usar useRouter en el componente que maneja la redirección

const apiClient = axios.create({
  baseURL: 'https://ec2-34-203-234-215.compute-1.amazonaws.com:8080',
  //baseURL: 'https://da1-back.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


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
          console.log('Refrescar token respuesta:', response.data);

          const { accessToken } = response.data.data;

          await AsyncStorage.setItem('accessToken', accessToken);

          // Reenvía la solicitud original con el nuevo token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return apiClient(originalRequest);  // Reenvía la solicitud con el nuevo token

        } catch (refreshError) {
          console.error('Error al refrescar el token:', refreshError.response?.data || refreshError.message);
          
          // Aquí rediriges al login cuando el refresh token también falla
          const router = useRouter();
          router.push('/LoginScreen');  // Redirige al login si el refresh token ha fallado
          return Promise.reject(refreshError);
        }
      } else {
        // Si no hay refresh token, redirige al login también
        const router = useRouter();
        router.push('/LoginScreen');
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
