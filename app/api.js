import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
  //baseURL: 'http://192.168.100.2:5000',
  //baseURL: 'https://da1-back.onrender.com'
  baseURL: 'http://ec2-34-203-234-215.compute-1.amazonaws.com:8080'
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
    //const response = await api.post('/api/auth/register', userData);
    const response = await axios.post(`http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/auth/register`, {
      username: userData.username,
      name: userData.username,
      surname:userData.surname,
      email:userData.email,
      password: userData.password,
      descriptionProfile:userData.descriptionProfile,
      gender:userData.gender
  });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });

    // Ahora accedemos a los datos dentro de response.data.data
    const { accessToken, refreshToken, user } = response.data.data;

    if (accessToken && refreshToken && user) {
      return {
        accessToken,
        refreshToken,
        userId: user.id // Aquí tomamos el `user.id` como `userId`
      };
    } else {
      throw new Error('Faltan datos importantes en la respuesta del servidor');
    }
  } catch (error) {
    console.error('Error en la API:', error.response ? error.response.data : error.message);
    throw error;  // Lanza el error para que sea manejado en el front
  }
};





// Función para obtener el accessToken actualizado
export const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    console.log('Refresh Token:', refreshToken);  // Verifica que el refresh token sea válido

    const response = await api.post('/api/auth/refresh-token', {
      refreshToken,  // Pasar el refresh token en el cuerpo de la solicitud
    });
    console.log('Respuesta del servidor al refrescar token:', response.data);

    if (response.status === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data.token;  // Corregir aquí

      console.log('Nuevo Access Token:', accessToken);  // Verifica el valor del accessToken

      if (!accessToken) {
        throw new Error('No se recibió un accessToken');
      }

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', newRefreshToken);

      return accessToken;  // Retornar el nuevo accessToken
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error;
  }
};





export const logout = async (router) => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    router.push('/LoginScreen');  // Redirige a la pantalla de login
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

    // Verificamos que los datos importantes estén en la respuesta
    if (response.data && response.data.data) {
      return response.data.data; // Retorna los datos dentro de `data` de la respuesta
    } else {
      throw new Error('No se encontraron datos importantes en la respuesta del servidor');
    }
  } catch (error) {
    console.log('Error en la API:', error.response ? error.response.data : error.message);
    throw error; // Re-lanza el error para que se pueda manejar en el componente
  }

  

};



