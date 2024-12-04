import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/Login/LoginScreen'; 
import SignUp from './app/Login/SignUpForm'; 
import ProfileUsers from './app/Profile/ProfileUsers';
import ProfileUsers from './app/Profile/ProfileScreen';
import EditProfile from './app/Profile/EditProfile';    
import Followers from './app/Profile/Followers';        
import Following from './app/Profile/Following';         
import HeaderProfile from './app/Profile/HeaderProfile';
import SearchScreen from './app/Home/SearchScreen';

const Stack = createStackNavigator();

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
            <Stack.Screen name="Search" component={SearchScreen} /> 
            <Stack.Screen name="ProfileUsers" component={ProfileUsers} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
