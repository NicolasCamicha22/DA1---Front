import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderFollowers from './HeaderFollowers'; // Importa el header que definimos antes
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Following() {
    const [selectedTab, setSelectedTab] = useState('following');
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    // Ejemplo de datos hardcodeados para las personas seguidas
    const followingData = [
        { id: 1, username: 'Juan_Gomez', fullName: 'Juan Ignacio Gomez', profileImage: 'https://example.com/image1.jpg' },
        { id: 2, username: 'JuanaMartinez', fullName: 'Juana Martinez', profileImage: 'https://example.com/image2.jpg' },
        { id: 3, username: 'MarianaPonce', fullName: 'Mariana Ponce', profileImage: 'https://example.com/image3.jpg' },
        // Agrega más ejemplos según sea necesario
    ];

    const filteredFollowing = followingData.filter((follower) =>
        follower.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
        follower.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.containerFollower}>
            <HeaderFollowers />

            {/* Selector de pestaña de Followers y Following */}
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Followers')}>
                    <Text style={styles.inactiveTab}>14 Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, selectedTab === 'following' && styles.activeTab]}>
                    <Text style={[styles.tabText, selectedTab === 'following' && styles.activeTabText]}>20 Following</Text>
                </TouchableOpacity>
            </View>

            {/* Buscador */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#ccc" style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Lista de personas seguidas */}
            <FlatList
                data={filteredFollowing}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.followerRow}>
                        <Image source={{ uri: item.profileImage }} style={styles.profileImageFollower} />
                        <View style={styles.userInfoFollower}>
                            <Text style={styles.usernameFollower}>{item.username}</Text>
                            <Text style={styles.fullNameFollowers}>{item.fullName}</Text>
                        </View>
                        <TouchableOpacity style={styles.followIconContainer}>
                            <Icon 
                                name="person-remove-outline" 
                                size={24} 
                                color="red" 
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}