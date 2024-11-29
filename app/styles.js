/*
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 0,
        padding: 20,
        backgroundColor: '#fff',

    },
    
    fixedContainerLogin: {
        flex: 1,
        justifyContent: 'space-evenly', // Distribuye el contenido uniformemente en la pantalla
        alignItems: 'center', // Centra los elementos horizontalmente
        backgroundColor: '#fff',
    },

    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20, 
    },
    contentContainer: {
        width: '90%',
        alignItems: 'center',
    },
    logo: {
        flex: 1,                  
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 300,               
        height: 200,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        overflow: 'hidden',
        fontSize: 14,
    },
    containerLogin: {
        flex: 1,
        justifyContent: 'flex-start', // Centra el contenido verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
        backgroundColor: '#fff',
    },

    titleLogin: {
        fontSize: height * 0.03, // 3% de la altura de la pantalla
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.04, // Margen inferior de 4% de la altura
    },
    inputWrapperLogin: {
        marginBottom: height * 0.03, // Espacio entre los inputs
        width: '100%',
    },
    inputWrapperPassword: {
        marginBottom: 5,
        width: '100%',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    inputPassword: {
        flex: 1,
        height: height * 0.06,
        paddingHorizontal: width * 0.05,
        fontSize: height * 0.02,
    },
    eyeIcon: {
        paddingHorizontal: width * 0.05,// Espaciado para el ícono
    },
    inputLogin: {
        height: height * 0.06, // El input ocupa el 6% de la altura
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: '40%', // Espaciado interno horizontal del 5% del ancho
        fontSize: height * 0.02, // Tamaño de fuente relativo a la altura
    },
    inputLabelLogin: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontSize: height * 0.018,
        color: '#888', 
        backgroundColor: '#fff', 
        paddingHorizontal: 5, 
        zIndex: 1,
    },
   
    buttonLogin: {
        backgroundColor: '#6c44f4',
        paddingVertical: height * 0.015, // El botón tiene 1.5% de la altura de la pantalla
        borderRadius: 30,
        alignItems: 'center',
        marginTop: height * 0.04, // Espaciado superior de 4% de la altura
        width: '100%',
    },
    buttonTextLogin: {
        color: '#fff',
        fontSize: height * 0.02, // Tamaño de texto proporcional a la altura
        fontWeight: 'bold',
    },

    signupContainerLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.02, // Espaciado superior
    },
    signupTextLogin: {
        fontSize: height * 0.015, // Ajuste de tamaño para la fuente
        color: '#a1a1a1',
    },
    signupLinkLogin: {
        fontSize: height * 0.015,
        color: '#6c44f4',
        marginLeft: width * 0.02, // Espaciado entre el texto y el link
    },
    forgotPasswordLogin: {
        textAlign: 'center',
        color: '#6c44f4',
        marginTop: height * 0.02, // Espaciado superior
        fontSize: height * 0.015,
    },
    dividerContainerLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.03,
    },
    lineLogin: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orTextLogin: {
        marginHorizontal: width * 0.02, // Espaciado horizontal
        fontSize: height * 0.015, // Ajuste proporcional al tamaño de la pantalla
        color: '#888',
    },
    googleButtonLogin: {
        width: width * 0.2, // El botón de Google será el 20% del ancho
        height: width * 0.2, // El mismo valor para altura
        alignSelf: 'center',
        marginTop: height * 0.03, // Espaciado superior
    },
    button: {
        backgroundColor: "#6c44f4",
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#ffff",
        fontSize: 12,
        fontWeight: "bold",
        flexWrap: "wrap",
        textAlign: "center",
        paddingHorizontal: 16
    },
    titleLogin: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.04,
    },
  
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
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
    returnTextForgotPassword: {
        fontSize: 16,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    // Estilos para el Home
    postContainer: {
        marginBottom: 16,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userInfo: {
        marginBottom: 8,
    },
    username: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#333',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationIcon: {
        marginRight: 4,
    },
    location: {
        fontSize: width * 0.04,
        color: '#666',
    },
    postImage: {
        height: height * 0.35,
        resizeMode: 'cover',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    paginationDot: {
        width: width * 0.02,
        height: width * 0.02,
        borderRadius: width * 0.015,
        marginHorizontal: 4,
    },
    date: {
        marginTop: 8,
        fontSize: width * 0.035,
        color: '#999',
        textAlign: 'right',  
    },
    caption: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: '#000',
        marginTop: 8,
    },
    description: {
        fontSize: width * 0.04,
        color: '#555',
        marginTop: 4,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 12,
    },
    buttonIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    
        marginRight: 25,
    },
    buttonIconText: {
        marginLeft: 4,
        fontSize: width * 0.04,
        color: '#000',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        maxHeight: height * 0.6,
    },
    commentContainer: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    
    commentInput: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        fontSize: width * 0.04,
    },
    homeScrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80, // Espacio para el footer
    },
  
   
    actionText: {
        fontSize: 14,
    },
    iconWithText: {
        flexDirection: "row",
        alignItems: "center",
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

    // Footer reutilizable
     footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopColor: "#ddd",
        borderTopWidth: 1,
    },
    footerIcon: {
        fontSize: 28,
        color: "#000",
    },
    activeIcon: {
        color: "#6c44f4", // Color violeta para el ícono activo
    },
  
    
    // Header reutilizable
    header: {
        height: 60,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        flexDirection: 'row', 
    },
    headerLogo: {
        width: 120,
        height: 50,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center', 
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        height: 60,
        width: '100%',

    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
   
    settingsIcon: {
        position: 'absolute',
        right: 10, 
        padding: 5,
    },

    arrowIcon: {
        position: 'absolute',
        left: 35,
        top: 40, 
    },
    headerFollowers: {
        height: 80,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row', 
    },

    likeButton: {
        backgroundColor: 'transparent',  
    },
    commentButton: {
        backgroundColor: 'transparent',
    },
    favoriteButton: {
        backgroundColor: 'transparent',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribución uniforme
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20, // Espaciado lateral
    },

    
    //Estilos para perfil
    coverContainer: {
        position: "relative",
        alignItems: "center",
    },
    coverImage: {
        width: "100%",
        height: 200,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#fff",
        position: "absolute",
        top: 50,
    },
    usernameProfile: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
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

    level: {
        fontSize: 14,
    },
    postsCount: {
        fontSize: 14,
        color: "#888",
    },

 

    actionText: {
        fontSize: 14,
    },

    profileHeader: {
        alignItems: "center",
        marginTop: -50, // Para que la imagen de perfil esté encima de la portada
    },

    levelAndPosts: {
        flex: 1,
        alignItems: "flex-end",
    },

    postCaption: {
        fontWeight: "bold",
        marginTop: 5,
    },
    postLocation: {
        fontStyle: "italic",
        color: "#555",
    },
    postDetails: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 5,
    },
    postDate: {
        color: "#aaa",
        marginTop: 5,
        fontSize: 12,
    },
    //Para el Edit Profile

    actionsContainerConfigProfile: {
        width: "100%",
        height: "15%",
        paddingHorizontal: 20,
        display: "flex",
        gap: 10,
    },
    profileConfigHeader: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 15,
    },
    

    // Search screnn

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Fondo gris claro
        borderRadius: 8,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
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
    userInfoSearch: {
        flex: 1,
        marginLeft: 10,
    },
   
    fullName: {
        color: "#666",
    },
    followButtonSearch: {
        backgroundColor: '#007AFF',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    followTextSearch: {
        color: '#fff',
        fontWeight: 'bold',
    },

    // Estilos para UploadScreen
    uploadContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: "center",
        display: "flex",
        gap: 10,
    },
    cameraButton: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "gray",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    cameraButtonText: {
        color: "#fff",
        fontSize: 18, // Aumenta el tamaño de la fuente
        fontWeight: "bold",
    },
    selectedImageContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    selectedImage: {
        width: 100, // Ajusta el ancho según tus necesidades
        height: 100, // Ajusta la altura según tus necesidades
        borderRadius: 10,
        marginRight: 10, // Espacio entre imágenes
    },
    confirmButton: {
        backgroundColor: "gray",
        padding: 10,
        alignItems: "center",
        borderRadius: 20,
        width: "50%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
    },

    confirmButtonText: {
        color: "#fff", // Color del texto
        fontSize: 9, // Tamaño de la fuente
        fontWeight: "bold", // Peso de la fuente
        textAlign: "center", // Alinear el texto al centro
        borderRadius: 20,
    },

    galleryButton: {
        backgroundColor: "gray",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        flexDirection: "row",
    },
    galleryButtonText: {
        color: "#fff",
        fontSize: 9, // Aumenta el tamaño de la fuente
        fontWeight: "bold",
        flexWrap: "wrap",
        textAlign: "center",
        paddingHorizontal: 16,
        addingVertical: 8
    },





    galleryPreviewTitle: {
        marginTop: 20,
        fontSize: 20, // Aumenta el tamaño
        textAlign: "left",
        fontWeight: "bold",
        color: "#333", // Añade color para resaltar
        width: "100%",
    },
  
    galleryImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginHorizontal: 8, // Ajusta el espacio entre las imágenes
        borderWidth: 1,
        borderColor: "#ddd", // Añade borde ligero para resaltar cada imagen
    },

    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 100,
        padding: 16,
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        width: "100%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        width: "100%",
    },
    icon: {
        fontSize: 18,
        color: "#888",
        marginRight: 10,
    },
    
    //Edit Profile
    modalContainer: {
        backgroundColor: '#d3d3d3', // Fondo gris del modal
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        paddingBottom: 30, // Espacio para el input
        height: '50%', // El modal ocupa la mitad de la pantalla
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666', // Gris oscuro
        textAlign: 'center',
        marginBottom: 15,
    },
    separatorComment: {
        height: 2,
        backgroundColor: '#800080', // Línea violeta
        marginBottom: 15,
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#aaa', 
        paddingVertical: 10,
    },
    commentUser: {
        fontWeight: 'bold',
        color: '#444',
        marginRight: 10,
        fontSize: 16, 
    },
    commentText: {
        flex: 1,
        color: '#333',
        fontSize: 16,
    },
    inputContainerComment: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d3d3d3', // Fondo gris claro
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 15,
        borderTopWidth: 2, // Línea superior violeta
        borderTopColor: '#800080',
    },

    chatIcon: {
        marginRight: 10, // Espacio entre el icono y el input
    },
    modalContentEdit: {
        width: '80%',
        backgroundColor: '#f0f0f0',
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
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#6c44f4', 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalbuttonText: {
        color: 'white',
        fontSize: 16,
    },
    noCommentsText: {
        textAlign: 'center',
        color: '#666',
        marginVertical: 20,
        fontSize: 16, // Texto más grande
    },
    formContainer: {
        marginTop: 100,
        padding: 16,
    },
    inputComment: {
        flex: 1,
        height: 40,
        color: '#333',
        fontSize: 16, // Texto más grande
    },
    addCommentButton: {
        marginLeft: 10,
    },
    addCommentText: {
        color: '#800080',
        fontWeight: 'bold',
    },
    inputEdit: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
  
    saveButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
    textArea: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 40, 
    },
    dropdownText: {
        color: 'black',
    },
   
    line2: {
        height: 1,
        backgroundColor: '#6c44f4',
        marginVertical: 10,
    },
    triangleContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end', 
        marginLeft: 8,
    },
    
   
    coverIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 5,
        borderRadius: 15,
    },
    profileImageContainer: {
        position: 'absolute',
        bottom: -40,
        left: 20,
    },
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
    profileIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 5,
        borderRadius: 15,
    },
    formContainerEdit: {
        marginTop: 10,
        padding: 20,
    },

    label: {
        fontSize: 16,
        color: 'black',
        width: 100,
         marginBottom: 5, 
    },
   

    nightModeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
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
 
  
    coverContainer: {
        position: 'relative',
        alignItems: 'center',
        marginTop: 2,
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
        backgroundColor: '#fff',
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

    cancelTextStyle: {
        fontSize: 16,
        color: 'black',
        marginTop: 20, 

    },

    doneTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6c44f4', 
        marginTop: 20, 
    },
    shareButton: {
        backgroundColor: "#A020F0", // Color púrpura
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
    },
    shareButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
    },

    //Estilos para la registracion del user

    profilePicButton: {
        backgroundColor: "#6c44f4",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 15,
    },
    profilePicButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    profilePicPreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
        alignSelf: "center",
    },

    // estilos para propaganda

    adLabel: {
        fontSize: 14,
        color: "#888",
        fontWeight: "bold",
        marginBottom: 5,
    },

    adTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    adDescription: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginBottom: 10,
    },

    adButtonText: {
        color: "blue",
        fontWeight: "bold",
    },

    
  //followers
  containerFollower: {
    flex: 1,
    backgroundColor: '#fff',
},
tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
},
tab: {
    alignItems: 'center',
},
activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'purple',
},
tabText: {
    fontSize: 16,
    fontWeight: '600',
},
activeTabText: {
    color: 'black',
},
inactiveTabText: {
    color: 'gray',
},
searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 10,
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
},
fullNameFollowers: {
    fontSize: 14,
    color: 'gray',
},
followIconContainer: {
    padding: 8,
},


    // Visualizacion de pop up de comentarios
   

    commentAuthor: {
        fontWeight: "bold", // Nombre en negrita
        fontSize: 14, // Tamaño del texto del nombre
        color: "#333", // Color de texto (ajustable)
    },

 
    buttonsBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
    },
    cameraContainerBox: {
        height: "40vh",
        width: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
    },
    cameraContainerBoxText: {
        textAlign: "center",
    },

    //Profile Screen
    miniHeader: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    changeCoverText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },




    //Sign Up
    containerSignUp: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: width * 0.05,        
        justifyContent: 'center', 
    },
    scrollContainerSignUp: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    titleSignUp: {
        fontSize: height * 0.04,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputWrapperSignUp: {
        position: 'relative', 
        marginBottom: 25, 
    },
    inputSignUp: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 16,
        position: 'relative',
        zIndex: 0, 
    },
    inputLabelSignUp: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontSize: 14,
        color: '#888', 
        backgroundColor: '#fff', 
        paddingHorizontal: 5, 
        zIndex: 1,
    },
    profilePicButtonSignUp: {
        marginBottom: 20,
        backgroundColor: '#6c44f4',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    profilePicButtonTextSignUp: {
        color: '#fff',
        fontSize: 16,
    },
    profilePicPreviewSignUp: {
        borderRadius: width * 0.125, // Radio proporcional
        alignSelf: 'center',
    },
    buttonSignUp: {
        backgroundColor: '#6c44f4',
        paddingVertical: height * 0.02,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonTextSignUp: {
        color: '#fff',
        fontSize: height * 0.022,
    },
    signupContainerSignUp: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupTextSignUp: {
        fontSize: 16,
        color: '#333',
        marginBottom: 30,
    },
    signupLinkSignUp: {
        fontSize: 16,
        color: "#6c44f4",
        marginLeft: 5,
    },


});

export default styles;
*/

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6c44f4',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 14,
    },
    errorMessage: {
        color: '#f44336',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },

    // Footer reutilizable
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopColor: "#ddd",
        borderTopWidth: 1,
    },
    footerIcon: {
        fontSize: 28,
        color: "#000",
    },
    activeIcon: {
        color: "#6c44f4", // Color violeta para el ícono activo
    },
  
    
    // Header reutilizable
    header: {
        height: 60,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        flexDirection: 'row', 
    },
    headerLogo: {
        width: 120,
        height: 50,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center', 
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        height: 60,
        width: '100%',

    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
   
    settingsIcon: {
        position: 'absolute',
        right: 10, 
        padding: 5,
    },

    arrowIcon: {
        position: 'absolute',
        left: 35,
        top: 40, 
    },
});
