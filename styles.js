import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 0,
        padding: 20, // Agregar algo de espacio alrededor
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 30, // Ajusta el espacio superior
        paddingBottom: 20, // Ajusta el espacio inferior para el botón Register
    },
    scrollContainerLogIn: {
        paddingHorizontal: 10,
        paddingBottom: 55, // Ajusta el espacio inferior para el botón Register
    },

    containerLogin: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 1,
        resizeMode: "contain", // Esto evitará que el logo se corte,
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
        fontSize: 12,
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },
    signupText: {
        fontSize: 12,
        color: "#a1a1a1",
    },
    signupLink: {
        fontSize: 12,
        color: "#6c44f4",
        fontWeight: "bold",
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
    forgotPassword: {
        textAlign: "center",
        color: "#6c44f4",
        marginTop: 10,
        fontSize: 12,
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
    orText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: "#a1a1a1",
    },

    dividerContainerLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    lineLogin: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orTextLogin: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#888',
    },

    googleButtonLogin: {
        width: 70,
        height: 70,
        alignSelf: "center",
        marginTop: 15,
    },

    //Forgot Password
    containerForgotPassword: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
 
    titleForgotPassword: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputContainerForgotPassword: {
        width: '100%',
        marginBottom: 20,
    },
    labelForgotPassword: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
 
    buttonForgotPassword: {
        width: '100%',
        backgroundColor: '#6c44f4',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },

    buttonTextLogin: {
        color: '#fff',
        fontSize: 12,
    },

    signupContainerLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },

    signupLinkLogin: {
        fontSize: 14,
        color: '#6c44f4',
        marginLeft: 5,
    },

    forgotPasswordLogin: {
        fontSize: 14,
        color: '#6c44f4',
        textAlign: 'center',
        marginVertical: 20,
    },

    buttonTextForgotPassword: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    messageForgotPassword: {
        marginTop: 20,
        fontSize: 16,
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
    titleLogin: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    inputWrapperLogin: {
        marginBottom: 20,
        position: 'relative',
    },
   
    inputLogin: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 12,
        position: 'relative',
        zIndex: 0,
    },

    inputLabelLogin: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontSize: 12,
        color: '#888', 
        backgroundColor: '#fff', 
        paddingHorizontal: 5, 
        zIndex: 1,
    },

    buttonLogin: {
        backgroundColor: '#6c44f4',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },

    buttonTextLogin: {
        color: '#fff',
        fontSize: 14,
    },

    signupTextLogin: {
        fontSize: 14,
        color: '#333',
    },
    
    // Estilos para el Home
    homeScrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80, // Espacio para el footer
    },
    postContainer: {
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 10,
        position: "relative",
    },
    userInfo: {
        //flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 10,
        flex: 1,
        marginLeft: 10,
        marginTop: 10
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
    },

    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    locationIcon: {
        marginRight: 5, // Espacio entre el ícono y el texto
    },
    location: {
        fontSize: 12,
        color: "#666",
    },



    caption: {
        fontSize: 14,
        marginBottom: 5,
    },

    actionText: {
        fontSize: 14,
    },
    iconWithText: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionsContainer: {
        flexDirection: "row", // Alinea los elementos en una fila
        justifyContent: "flex-start", // Alinea al inicio
        padding: 10,
    },
    buttonIcon: {
        flexDirection: "row", // Alinea ícono y texto en una fila
        alignItems: "center", // Centra verticalmente los íconos y textos
        marginRight: 25, // Espacio a la derecha de cada botón
    },
    buttonIconText: {
        marginLeft: 5, // Espacio entre ícono y texto
        fontSize: 16, // Ajusta el tamaño de fuente si es necesario
        alignSelf: "center", // Centra verticalmente el texto con respecto al ícono
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
        position: "absolute",
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
        flexDirection: "row", // Permite que el logo y el icono estén en la misma fila
    },
    headerLogo: {
        width: 120,
        height: 50,
        resizeMode: "contain",
        flex: 1, // Ocupa el espacio restante para centrar el logo
    },
    logoContainer: {
        flex: 1,
        alignItems: "center", // Centra el logo en el espacio disponible
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
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },

    settingsIcon: {
        position: "absolute",
        right: 10, // Posiciona el icono a la derecha del logo
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
        // Sin fondo para el botón de Me gusta
        backgroundColor: "transparent",
    },
    commentButton: {
        // Sin fondo para el botón de Comentarios
        backgroundColor: "transparent",
    },
    favoriteButton: {
        // Sin fondo para el botón de Favoritos
        backgroundColor: "transparent",
    },
    description: {
        fontSize: 11,
        color: "#666",
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: "#a1a1a1",
        textAlign: "right", 
        marginTop: 10, 
    },

    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#000", // Color de los puntos
        margin: 4,
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

    postImage: {
        width: "100%",
        height: 250,
        borderRadius: 10,
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

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
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

    confirmButtonEdit: {
        backgroundColor: '#6c44f4',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalbuttonText: {
        color: 'white',
        fontSize: 16,
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
        marginRight: 8, // Espacio entre el icono y el TextInput
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
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "#6c44f4",
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
    inputImagePost: {
        flex: 1,
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
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

    //Estilos para el modal de comentarios
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    commentText: {
        fontSize: 16,
        marginBottom: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: "100%",
    },

    // Visualizacion de pop up de comentarios
    commentContainer: {
        marginBottom: 15, // Espacio inferior entre comentarios
        paddingVertical: 5, // Padding vertical para separar los comentarios
    },

    commentAuthor: {
        fontWeight: "bold", // Nombre en negrita
        fontSize: 14, // Tamaño del texto del nombre
        color: "#333", // Color de texto (ajustable)
    },

    commentText: {
        fontSize: 14, // Tamaño del texto del comentario
        color: "#666", // Color del texto del comentario
        marginLeft: 5, // Espacio entre el nombre y el comentario
        flexWrap: "wrap", // Permite que el texto del comentario se ajuste en varias líneas si es necesario
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


    //Sign Up
    containerSignUp: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
    },
    scrollContainerSignUp: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    titleSignUp: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
    },
    inputWrapperSignUp: {
        position: 'relative',
        marginBottom: 25,
    },
    inputSignUp: {
        height: 50,
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
        fontSize: 14,
    },
    profilePicPreviewSignUp: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        alignSelf: 'center',
    },
    buttonSignUp: {
        backgroundColor: '#6c44f4',
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonTextSignUp: {
        color: '#fff',
        fontSize: 18,
    },
    signupContainerSignUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
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

    uploadContainer: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    uploadTitle: {
        textAlign: 'left',
        margin: 10,
        fontSize: 18,
        color: 'gray',
    },
    cameraContainer: {
        height: 300,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraPreview: {
        width: '100%',
        height: '100%',
    },
    cameraPlaceholder: {
        fontSize: 18,
        color: 'gray',
    },
    confirmButtonUpload: {
        width: 60,
        height: 40,
        backgroundColor: '#6c44f4',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
 
   
    galleryContainer: {
        paddingHorizontal: 10,
    },
    galleryCenteredContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    galleryImage: {
        width: 120,
        height: 120,
        margin: 5,
    },
    cameraButtonText: {
        color: "#fff",
        fontSize: 18, // Aumenta el tamaño de la fuente
        fontWeight: "bold",
    },
 
 
 
    galleryButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
   
    confirmButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    galleryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
    },
 
    cameraButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
        width: '100%',
    },
    galleryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#d3d3d3',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 20, // Espacio arriba y abajo del botón
    },
 
 
    cameraButton: {
        width: 60,
        height: 60,
        backgroundColor: '#e0e0e0',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
 
    },
    cameraButtonWrapper: {
        flex: 1,                          // Asegura que el contenedor del botón de la cámara ocupe todo el espacio
        alignItems: 'center',             // Centra el contenido horizontalmente
        justifyContent: 'center',         // Alinea el botón al centro verticalmente
    },
 
 
    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
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
 

});

export default styles;