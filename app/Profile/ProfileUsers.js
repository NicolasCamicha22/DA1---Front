import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HeaderProfile from './HeaderProfile';
import Footer from '../Footer';
import Post from '../Post/Post';
import styles from './ProfileStyles';

export default function ProfileUsers() {
  const route = useRoute();
  const { userId } = route.params; // Obtén el userId pasado por la navegación
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const response = await axios.get(
          `http://ec2-34-203-234-215.compute-1.amazonaws.com:8080/api/users/${userId}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserInfo(response.data?.data);
        setPosts(response.data?.data?.posts || []);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.containerProfile}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.containerProfile}>
      <HeaderProfile />
      {userInfo && (
        <>
          <Image source={{ uri: userInfo.cover_image_url }} style={styles.coverImage} />
          <Image source={{ uri: userInfo.profile_pic }} style={styles.profileImage} />
          <Text style={styles.username}>{userInfo.username}</Text>
          <Text>{userInfo.descriptionProfile || 'No description'}</Text>
        </>
      )}
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <Footer />
    </View>
  );
}
