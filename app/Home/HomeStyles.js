import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    containerHome: {
        flex: 1,
        backgroundColor: '#fff',
    },
    feedContainer: {
        padding: 10,
    },
    postContainer: {
        marginBottom: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    headerIcon: {
        fontSize: 20,
        color: '#6c44f4',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    footerIcon: {
        fontSize: 24,
        color: '#333',
    },

    noResultsText: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
    },

    // Estilos para la publicidad
    adContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        alignItems: "center",
    },
    adImage: {
        width: "100%",
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    adText: {
        fontSize: 16,
        fontWeight: "bold",
    },

    adTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },

    adButtonText: {
        color: "blue",
        fontWeight: "bold",
    },

    //Search screen
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    userInfo: {
        marginBottom: 8,
        flex: 1,
        marginLeft: 10,
    },

    username: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#333',
    },

    fullName: {
        color: "#666",
    },

    followButton: {
        flexDirection: 'row',
        alignItems: 'right',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginRight: 5
    },

    searchBox: {
        flexDirection: "row",
        //alignItems: "center",
        backgroundColor: "#f0f0f0", // Fondo gris claro
        borderRadius: 8,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'flex-end',
        padding: 10
    },

    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    noResultsText: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
    },

    postImage: {
        height: height * 0.35,
        resizeMode: 'cover',
    },


    //Estilos para cuando no hay post

    noPostsContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding: 20,
    },

    noPostsImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    noPostsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },

    goToSearchButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#6c44f4',
        borderRadius: 5,
    },
    goToSearchButtonText: {
        color: 'white',
        fontSize: 16,
    },





});
