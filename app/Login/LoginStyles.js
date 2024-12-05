import { StyleSheet,useColorScheme  } from 'react-native';
import { lightTheme, darkTheme } from '../themes';
import { Dimensions } from 'react-native';


export const createStylesLogin = () => {
    const colorScheme = useColorScheme(); 
  const currentTheme = colorScheme === 'light' ? lightTheme : darkTheme; 
  const { width, height } = Dimensions.get('window');

    return  StyleSheet.create({

    containerLogin: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        //justifyContent: 'center',
    },
    scrollContainerLogin: {
        flexGrow: 1,
        //justifyContent: 'center',
    },

    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain'
    },

    titleLogin: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputWrapperLogin: {
        marginBottom: height * 0.03, // Espacio entre los inputs
        width: '100%',
    },
    inputLabelLogin: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontSize: 14,
        color: '#888',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        zIndex: 1,
    },
    inputLogin: {
        height: 45, // El input ocupa el 6% de la altura
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: '5%', // Espaciado interno horizontal del 5% del ancho
        fontSize: 14, // Tamaño de fuente relativo a la altura
    },

    inputWrapperPassword: {
        marginBottom: 5,
        width: '100%',
    },
    inputPassword: {
        flex: 1,
        height: 45,
        paddingHorizontal: '5%',
        fontSize: 14,
    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },

    eyeIcon: {
        paddingHorizontal: width * 0.05,// Espaciado para el ícono
    },

    buttonLogin: {
        backgroundColor: '#6c44f4',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonTextLogin: {
        color: '#fff',
        fontSize: height * 0.02, // Tamaño de texto proporcional a la altura
        fontWeight: 'bold',
    },
    signupContainerLogin: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signupTextLogin: {
        fontSize: 14,
        color: '#555',
    },
    signupLinkLogin: {
        fontSize: 14,
        color: '#6c44f4',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    forgotPasswordLogin: {
        fontSize: 14,
        color: '#6c44f4',
        textAlign: 'center',
        marginTop: 15,
    },
    dividerContainerLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    lineLogin: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    orTextLogin: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#555',
    },
    googleButtonLogin: {
        width: 50,
        height: 50,
        alignSelf: 'center',
    },

    scrollContainerSignUp: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'center'
    },


    titleSignUp: {
        fontSize: height * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputWrapperSignUp: {
        position: 'relative',
        marginBottom: 25,
        paddingVertical: 5
    },
    inputSignUp: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 16,
        position: 'relative',
        height: 38,  // Asegúrate de que esto sea consistente
        zIndex: 0,
    },
    
    inputLabelSignUp: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontSize: 14,
        color: '#888',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        zIndex: 1,
    },
    profilePicButtonSignUp: {
        marginBottom: 20,
        backgroundColor: '#6c44f4',
        paddingVertical: height * 0.012,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    profilePicButtonTextSignUp: {
        color: '#fff',
        fontSize: height * 0.022,

    },
    profilePicPreviewSignUp: {
        borderRadius: width * 0.012, // Radio proporcional
        alignSelf: 'center',
    },
    buttonSignUp: {
        marginBottom: 20,
        backgroundColor: '#6c44f4',
        paddingVertical: height * 0.012,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonTextSignUp: {
        color: '#fff',
        fontSize: height * 0.022,
    },
    signupContainerSignUp: {
        flexDirection: 'row',
        //justifyContent: 'center',
    },
    signupTextSignUp: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        paddingVertical: 10,
        alignItems: 'center'
    },
    signupLinkSignUp: {
        fontSize: 16,
        color: "#6c44f4",
        marginLeft: 5,
        paddingVertical: 10,
        alignItems: 'center'
    },

    //Forgot Password
    containerForgotPassword: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: height * 0.05,
        backgroundColor: '#fff',
    },

    titleForgotPassword: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        marginBottom: height * 0.05,

    },
    inputContainerForgotPassword: {
        width: '100%',
        marginBottom: height * 0.03,
        position: 'relative',
    },
    labelForgotPassword: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },

    buttonForgotPassword: {
        width: '100%',
        backgroundColor: '#6c44f4',
        paddingVertical: height * 0.02,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    buttonTextForgotPassword: {
        color: '#fff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
    },
    messageForgotPassword: {
        marginTop: 20,
        fontSize: height * 0.02,
        color: '#f44336',
        textAlign: 'center',
    },

    returnContainerForgotPassword: {
        marginTop: 30,
        alignItems: 'center',
    },


});
};