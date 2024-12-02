import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
    color: "#6c44f4", // Color violeta 
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
    resizeMode: 'contain',
    flex: 1, 
},
//Header Edit
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
//Header Folloers
headerFollowers: {
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row', 
},
arrowIcon: {
    position: 'absolute',
    left: 35,
    top: 40, 
},
//Header Profile
settingsIcon: {
    position: 'absolute',
    right: 10, 
    padding: 5,
},
//Home Screen
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
//Edit Profile
container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 0,
    padding: 20,
    backgroundColor: '#fff',

},
coverContainer: {
    position: "relative",
    alignItems: "center",
},
coverImage: {
    width: "100%",
    height: 200,
},
coverIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 5,
    borderRadius: 15,
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
fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50, 
},
inputEdit: {
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
dropdownText: {
    color: 'black',
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
    color: 'red', 
    marginBottom: 20,
},
buttonContainerEdit: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
},
modalbuttonText: {
    color: 'white',
    fontSize: 16,
},
confirmButtonEdit: {
    backgroundColor: '#6c44f4', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
},
//Followers/Following
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
inactiveTab: {
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
searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
},
//Profile Screen
changeCoverText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
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
description: {
    fontSize: width * 0.04,
    color: '#555',
    marginTop: 4,
},
levelAndPosts: {
    flex: 1,
    alignItems: "flex-end",
},
level: {
    fontSize: 14,
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
// Post
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
    backgroundColor: '#d3d3d3', 
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
    color: '#333',
    fontSize: 16,
},
commentUser: {
    fontWeight: 'bold',
    color: '#444',
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
    backgroundColor: '#d3d3d3', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: 30,
    height: '50%',
},
modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666', 
    textAlign: 'center',
    marginBottom: 15,
},
keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
},
scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, 
},
//Image Upload
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
    backgroundColor: '#d3d3d3',
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
//Image Post

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
formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    padding: 16,
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
//Forgot Password
containerForgotPassword: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: height * 0.05,
    backgroundColor: '#fff',
},
logo: {
    width: width * 0.5, 
    height: width * 0.5, 
    resizeMode: 'contain',
},
titleForgotPassword: {
    fontSize: height * 0.03,   
    fontWeight: 'bold',
    marginBottom: height * 0.05,
},
titleLogin: {
    fontSize: height * 0.03, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.04, 
},
inputContainerForgotPassword: {
    width: '100%',
    marginBottom: height * 0.03,
    position: 'relative', 
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
buttonForgotPassword: {
    width: '100%',
    backgroundColor: '#6c44f4',
    paddingVertical: height * 0.02,  
    borderRadius: 30,
    alignItems: 'center',
    marginTop: height * 0.02,
},
buttonTextLogin: {
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
signupContainerLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.02, 
},
forgotPasswordLogin: {
    textAlign: 'center',
    color: '#6c44f4',
    marginTop: height * 0.02, 
    fontSize: height * 0.015,
},
//Login Form
containerLogin: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingHorizontal: width * 0.05, 
    backgroundColor: '#fff',
},
inputWrapperPassword: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
},
inputWrapperLogin: {
    width: '100%', 
    height: height * 0.06, 
    marginBottom: 20,
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
inputLogin: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.05, 
    fontSize: height * 0.02,
},
eyeIcon: {
    paddingHorizontal: width * 0.05,
},
buttonLogin: {
    backgroundColor: '#6c44f4',
    paddingVertical: height * 0.015,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: height * 0.04,
    width: '100%',
},
signupTextLogin: {
    fontSize: height * 0.015,
    color: '#a1a1a1',
},
signupLinkLogin: {
    fontSize: height * 0.015,
    color: '#6c44f4',
    fontWeight: 'bold',
    marginLeft: width * 0.02, 
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
    marginHorizontal: width * 0.02, 
    fontSize: height * 0.015, 
    color: '#888',
},
googleButtonLogin: {
    width: width * 0.2, 
    height: width * 0.2, 
    alignSelf: 'center',
    marginTop: height * 0.03, 
},
//Sign Up
scrollContainerSignUp: {
    paddingHorizontal: 20,
    paddingVertical: 30,
},
titleSignUp: {
    fontSize: height * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
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
inputWrapperSignUp: {
    position: 'relative', 
    marginBottom: 25, 
},
inputSignUp: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    position: 'relative',
    zIndex: 0, 
    paddingHorizontal: width * 0.05,
},
inputLabelSignUp: {
    position: 'absolute',
    top: -10,
    left: 12,
    fontSize: height * 0.018,
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
    borderRadius: width * 0.125, 
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
//Ads
adContainer: {
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
//Favorite
noResultsText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
},
//Search
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
});

export default styles;