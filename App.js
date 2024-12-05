import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/Login/LoginScreen';
import SignUp from './app/Login/SignUpForm';
import HomeScreen from './app/Home/HomeScreen'; 
import EditProfile from './app/Profile/EditProfile'; 
import ProfileScreen from './app/Profile/ProfileScreen'; 
import React, { useState } from 'react';  // Asegúrate de importar useState
import { useColorScheme } from 'react-native';
import Header from './Header'; 
import Footer from './Footer'; 
import { lightTheme, darkTheme } from './themes';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Followers" component={Followers} /> 
            <Stack.Screen name="Following" component={Following} />
            <Stack.Screen name="HeaderProfile" component={HeaderProfile} />
            <Stack.Screen name="UserPorfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Header" component={Header} />
            <Stack.Screen name="Footer" component={Footer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
