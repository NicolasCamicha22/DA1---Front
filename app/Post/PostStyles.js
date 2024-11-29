import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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

    postContent: {
        padding: 10,
    },
    postCaption: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    postActionIcon: {
        fontSize: 20,
        color: '#333',
    },

    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 100,
        padding: 16,
    },

    // UPLOAD STYLES

    uploadContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    cameraContainer: {
        height: 200,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15,
    },
    cameraPreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    cameraButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 20,
    },
    cameraButtonWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    cameraButton: {
        width: 60,
        height: 60,
        backgroundColor: '#6c44f4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    confirmButtonUpload: {
        backgroundColor: '#6c44f4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    galleryButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,


    },
    galleryButtonText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,

    },

    GaleriaButtonWrapper: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 5,
    },


    galleryImage: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 10,
    },
    galleryCenteredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    galleryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
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
        width: 200,
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


    //ImageUploadScreen

    galleryPreviewTitle: {
        marginTop: 20,
        fontSize: 20, // Aumenta el tamaño
        textAlign: "left",
        fontWeight: "bold",
        color: "#333", // Añade color para resaltar
        width: "100%",
    },
    selectedImage: {
        width: 100, // Ajusta el ancho según tus necesidades
        height: 100, // Ajusta la altura según tus necesidades
        borderRadius: 10,
        marginRight: 10, // Espacio entre imágenes
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

    confirmButtonText: {
        color: "#fff", // Color del texto
        fontSize: 9, // Tamaño de la fuente
        fontWeight: "bold", // Peso de la fuente
        textAlign: "center", // Alinear el texto al centro
        borderRadius: 20,
    },


    galleryTitle: {
        marginTop: 20,
        fontSize: 20, // Aumenta el tamaño
        textAlign: "left",
        fontWeight: "bold",
        color: "#333", // Añade color para resaltar
        width: "100%",
        textAlign: 'center'
    },




});
