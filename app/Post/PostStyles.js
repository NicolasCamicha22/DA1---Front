import { StyleSheet,useColorScheme   } from 'react-native';
import { Dimensions } from 'react-native';
import { lightTheme, darkTheme } from '../themes';

const { width, height } = Dimensions.get('window');

export const createStylesPost = () => {
    const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'light' ? lightTheme : darkTheme;

    
    return  StyleSheet.create({
    postContainer: {
        marginBottom: 16,
        padding: 10,
        backgroundColor:  currentTheme.backgroundColor,
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
        color: currentTheme.postCaptionColor,
        marginBottom: 5,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: currentTheme.borderColor,
    },
    postActionIcon: {
        fontSize: 20,
        color: currentTheme.iconColor, 
    },

    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 100,
        padding: 16,
    },

    // UPLOAD STYLES
    mainBackground: {
        flex: 1,
        backgroundColor: currentTheme.backgroundColor, 
    },
    
    uploadContainer: {
        flex: 1,
        backgroundColor: currentTheme.backgroundColor,
        padding: 15,
    },
    cameraContainer: {
        height: 300,
        backgroundColor: currentTheme.cameraBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraPreview: {
        width: '100%',
        height: '100%',
    },
    cameraPlaceholder: {
        fontSize: 18,
        color: currentTheme.cameraTextColor,
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
        backgroundColor: currentTheme.cameraButtonBackground,
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
        color: currentTheme.galleryButtonTextColor,
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
        color: currentTheme.galleryTitleColor,
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
        borderColor: currentTheme.dividerColor,
        marginVertical: 10,
    },
    noText: {
        borderColor: currentTheme.noText,
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
        color: currentTheme.usernameColor, 
    },

    locationIcon: {
        marginRight: 4,
    },
    location: {
        fontSize: width * 0.04,
        color: currentTheme.locationColor, 
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
        color: currentTheme.captionColor,
        marginTop: 8,
    },
    description: {
        fontSize: width * 0.04,
        color: currentTheme.descriptionColor,
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
        color: currentTheme.buttonIconTextColor, 
    },
    modalContent: {
        backgroundColor: currentTheme.modalContentBackground,
        padding: 16,
        borderRadius: 8,
        maxHeight: height * 0.6,
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

 
//posts
commentContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flex: 1,
},
commentInput: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    fontSize: width * 0.04,
},
addCommentButton: {
    marginLeft: 10,
},
inputComment: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 16, 
},
chatIcon: {
    marginRight: 10, 
},
inputContainerComment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: currentTheme.modalBackgroundColor,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 15,
    borderTopWidth: 2, 
    borderTopColor: '#6c44f4',
},
noCommentsText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
    fontSize: 16, 
},
commentText: {
    flex: 1,
    color: currentTheme.commentText,
    fontSize: 16,
},
commentUser: {
    fontWeight: 'bold',
    color: currentTheme.commentTextUser,
    marginRight: 10,
    fontSize: 16, 
},
commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa', 
    paddingVertical: 10,
},
separatorComment: {
    height: 2,
    backgroundColor: '#6c44f4', 
    marginBottom: 15,
},
modalContainerComments: {
    height: '50%',
    backgroundColor: currentTheme.modalBackgroundColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    
},
modalContentComments: {
    flex: 1,
    justifyContent: 'space-between', 
    padding: 16,
    
},
modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: currentTheme.modalTitleColor, 
    textAlign: 'center',
    marginBottom: 15,
},
keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
    
},
scrollViewContent: {
    flexGrow: 1,
},
    
});
};