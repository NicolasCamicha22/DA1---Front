import { StyleSheet,useColorScheme   } from 'react-native';
import { Dimensions } from 'react-native';
import { lightTheme, darkTheme } from '../themes';


export const createStylesProfile = () => {
    const colorScheme = useColorScheme(); 
  const currentTheme = colorScheme === 'light' ? lightTheme : darkTheme;
    const { width, height } = Dimensions.get('window');
    
    return  StyleSheet.create({

    containerProfile: {
        flex: 1,
        backgroundColor: currentTheme.backgroundColor,
    },
    coverContainer: {
        position: 'relative',
        alignItems: 'center',
        marginTop: 2,
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
    },
    usernameContainer: {
        position: 'absolute',
        top: 180,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'center',
        zIndex: 1,
    },
    username: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#333',
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    bio: {
        fontSize: 14,
        flex: 1,
        color: "#555",
    },
    levelAndPosts: {
        flex: 1,
        alignItems: "flex-end",
    },
    level: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    postsCount: {
        fontSize: 14,
        color: "#888",
    },
    followContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    followButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    followNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 4,
    },
    followText: {
        fontSize: 16,
        color: "#666",
    },
    miniHeader: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    changeCoverText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },


    //header edit profile

    editCoverContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },

    editCoverImage: {
        width: '100%',
        height: 150,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    editProfileImageContainer: {
        position: 'absolute',
        bottom: -30,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 50,
    },

    editHeaderContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    editHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
    },

    editButton: {
        marginHorizontal: 10,
    },

    coverIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 5,
        borderRadius: 15,
    },

    profileIconOverlay: {
        position: 'absolute',
        height: 40,
        width: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 4,
        top: 80,
        left: 175,
        justifyContent: 'center',
        alignItems: 'center',
    },

    formContainerEdit: {
        marginTop: 10,
        padding: 20,
    },

    dropdownText: {
        color: 'black',
    },

    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
    },

    input2: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 40,
    },
    label: {
        fontSize: 16,
        color: 'black',
        width: 100,
        marginBottom: 5,
    },
    line2: {
        height: 1,
        backgroundColor: '#6c44f4',
        marginVertical: 10,
    },

    textArea: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 40,
    },

    nightModeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 3,
        borderRadius: 5,
        marginBottom: 3,
    },

    nightModeText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'black',
    },

    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    dropdownOption: {
        color: 'gray',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        textAlignVertical: 'center',
        paddingHorizontal: 100,
        marginVertical: 5,
    },
    dropdownOptions: {
        position: 'relative',
        marginTop: 5,
        marginLeft: 10,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        width: '90%',
        zIndex: 1000,

    },
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginHorizontal: 100,
        position: 'relative',
        marginRight: -25,
    },
    logoutButton: {
        marginTop: 10,
        marginBottom: 10,

    },
    logoutText: {
        color: 'blue',
        fontSize: 16,
    },
    deleteAccountButton: {
        marginTop: 10,
    },
    deleteAccountText: {
        color: 'darkred',
        fontSize: 16,
    },

    modalContainer: {
        flex: 1,  // Hace que ocupe todo el espacio de la pantalla
        justifyContent: 'center',  // Centra el contenido verticalmente
        alignItems: 'center',  // Centra el contenido horizontalmente
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fondo semi-transparente para oscurecer el fondo
        position: 'absolute',  // Hace que el contenedor se posicione en el medio
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666', // Gris oscuro
        textAlign: 'center',
        marginBottom: 15,
    },

    modalContentEdit: {
        width: '80%',
        backgroundColor: currentTheme.backgroundColor,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        padding: 20,
        paddingVertical: 30,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: 'red', // Texto en rojo
        marginBottom: 20,
    },
    buttonContainerEdit: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },

    confirmButton: {
        backgroundColor: '#6c44f4',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalbuttonText: {
        color: 'black',
        fontSize: 16,
    },



});
};