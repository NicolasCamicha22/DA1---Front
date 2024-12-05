import { Dimensions } from 'react-native';
import { StyleSheet, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../themes';

export const createStylesHome = () => {
    const colorScheme = useColorScheme();
    const currentTheme = colorScheme === 'light' ? lightTheme : darkTheme;
    const { width, height } = Dimensions.get('window');

    return StyleSheet.create({


        container: {
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 0,
            padding: 20,
            backgroundColor: currentTheme.backgroundColor,

        },
        containerHome: {
            flex: 1,
            backgroundColor: currentTheme.backgroundColor,
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
            marginBottom: 16,
            padding: 10,
            backgroundColor: currentTheme.backgroundColor,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        adHeader: {
            flexDirection: "row",
            justifyContent: "space-between", // Espacio entre el label y el ícono
            alignItems: "center",
            marginBottom: 5,
        },
        adLabel: {
            fontSize: 14,
            color: "#888",
            fontWeight: "bold",
        },
        adTitle: {
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 10,
            textAlign: "left",
        },
        adFooter: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10,

        },
        visitButtonContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        visitButton: {
            fontSize: 16,
            color: '#6c44f4',
            fontWeight: 'bold',
            marginRight: 5, // Espacio entre texto y ícono
            textAlign: "left",

        },
        linkIcon: {
            marginLeft: 5,
        },
        noImageText: {
            textAlign: "center",
            marginTop: 20,
            color: "#999",
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
        fullName: {
            color: "#666",
        },
        followerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
        },
        profileImageFollower: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 12,
        },
        userInfoFollower: {
            flex: 1,
        },
        usernameFollower: {
            fontSize: 16,
            fontWeight: '600',
            color: currentTheme.usernameColor,
        },
        fullNameFollowers: {
            fontSize: 14,
            color: 'gray',
        },
        followIconContainer: {
            padding: 8,
        },
        containerFollower: {
            flex: 1,
            backgroundColor: currentTheme.backgroundColor,
        },

        searchBox: {
            flexDirection: "row",
            //alignItems: "center",
            backgroundColor: currentTheme.backgroundColorSearch,
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
            color: currentTheme.textColorSearch,
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
};