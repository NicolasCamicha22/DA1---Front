import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/Login/LoginScreen'; // Asegúrate de que la ruta sea correcta
import SignUp from './app/Login/SignUpForm'; // Asegúrate de que la ruta sea correcta

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Followers" component={Followers} /> 
            <Stack.Screen name="Following" component={Following} />
            <Stack.Screen name="HeaderProfile" component={HeaderProfile} />
            <Stack.Screen name="UserPorfileScreen" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
