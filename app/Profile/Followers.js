import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderFollowers from './HeaderFollowers'; // Importa el header que definimos antes
import styles from '../styles';
import { useRouter } from 'expo-router';

export default function Followers() {
    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState('followers');
    const [searchQuery, setSearchQuery] = useState('');
    const [followersData, setFollowersData] = useState([
        { id: 1, username: 'Juan_Gomez', fullName: 'Juan Ignacio Gomez', profileImage: 'https://example.com/image1.jpg', following: true },
        { id: 2, username: 'JuanaMartinez', fullName: 'Juana Martinez', profileImage: 'https://example.com/image2.jpg', following: true },
        { id: 3, username: 'MarianaPonce', fullName: 'Mariana Ponce', profileImage: 'https://example.com/image3.jpg', following: false },
        { id: 4, username: 'Lu_99', fullName: 'Lucia Lopez', profileImage: 'https://example.com/image4.jpg', following: false },
    ]);

    const filteredFollowers = followersData.filter((follower) =>
        follower.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
        follower.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFollow = (id) => {
        setFollowersData((prevData) =>
            prevData.map((follower) =>
                follower.id === id
                    ? { ...follower, following: !follower.following }
                    : follower
            )
        );
    };

    const renderFollower = ({ item }) => (
        <View style={styles.followerRow}>
            <Image source={{ uri: item.profileImage }} style={styles.profileImageFollower} />
            <View style={styles.userInfoFollower}>
                <Text style={styles.usernameFollower}>{item.username}</Text>
                <Text style={styles.fullNameFollowers}>{item.fullName}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFollow(item.id)} style={styles.followIconContainer}>
                <Icon
                    name={item.following ? "person-remove-outline" : "person-add-outline"}
                    size={24}
                    color={item.following ? "red" : "purple"}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.containerFollower}>
            <HeaderFollowers />

            {/* Selector de pestaña de Followers y Following */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    onPress={() => setSelectedTab('followers')}
                    style={[styles.tab, selectedTab === 'followers' && styles.activeTab]}
                >
                    <Text style={[styles.tabText, selectedTab === 'followers' && styles.activeTabText]}>14 Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('./Following')}>
                    <Text style={styles.inactiveTab}>20 Following</Text>
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

            {/* Lista de seguidores */}
            <FlatList
                data={filteredFollowers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderFollower}
            />
        </View>
    );

}
