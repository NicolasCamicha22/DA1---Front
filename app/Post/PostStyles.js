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
    cameraButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
        width: '100%',
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
        flex: 1,                        
        alignItems: 'center',             
        justifyContent: 'center',         
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
    confirmButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    galleryButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    galleryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'lightblue',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 20, 
    },
    galleryTitle: {
        fontSize: 16,
        textAlign: 'left',
        color: 'gray',
        marginLeft: 8,
    },
    galleryCenteredContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    uploadButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
        width: '100%',
    },
    uploadButton: {
        width: 60,
        height: 60,
        backgroundColor: '#6c44f4',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    divider: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
    },
    
    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    
    galleryImage: {
        width: '30%',
        height: 120,
        marginBottom: 10,
        borderRadius: 5,
    },

   
    GaleriaButtonWrapper: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 5,
    },


    userInfo: {
        marginBottom: 8,
    },

    username: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#333',
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
    postTextButton: {
        position: 'absolute',
        right: 10, 
        padding: 5,
    },
    postText: {
        fontSize: 16,
        color: '#6c44f4',  
        fontWeight: 'bold',
    },
    //ImagePostScreen
    galleryPreviewTitle: {
        marginTop: 20,
        fontSize: 20, 
        textAlign: "left",
        fontWeight: "bold",
        color: "#333",
        width: "100%",
    },
    selectedImage: {
        width: 100, 
        height: height * 0.4,
        borderRadius: 0,
        marginRight: 10, 
    },
  
    inputImagePost: {
        flex: 1,
        height: 30,
        borderColor: "#ccc",
        borderWidth: 0,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    icon: {
        fontSize: 18,
        color: "#888",
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        width: "100%",
    },

    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        width: "100%",
    },
    
    shareButton: {
        backgroundColor: "#6c44f4", 
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
    formContainerPost: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        padding: 16,
    },


});
