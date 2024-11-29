import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerProfile: {
        flex: 1,
        backgroundColor: '#fff',
    },
    coverContainer: {
        position: 'relative',
    },
    coverImage: {
        width: '100%',
        height: 200,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        position: 'absolute',
        bottom: -50,
        left: 20,
    },
    usernameContainer: {
        position: 'absolute',
        bottom: 10,
        left: 140,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoContainer: {
        padding: 20,
        marginTop: 40,
    },
    bio: {
        fontSize: 14,
        color: '#555',
        marginBottom: 15,
    },
    levelAndPosts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    level: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    postsCount: {
        fontSize: 14,
        color: '#555',
    },
    followContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    followButton: {
        alignItems: 'center',
    },
    followNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    followText: {
        fontSize: 14,
        color: '#555',
    },
    miniHeader: {
        padding: 10,
        alignItems: 'center',
    },
    changeCoverText: {
        fontSize: 14,
        color: '#6c44f4',
        fontWeight: 'bold',
    },

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
