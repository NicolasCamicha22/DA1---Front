import { StyleSheet,useColorScheme  } from 'react-native';
import { lightTheme, darkTheme } from './themes';

export const createStyles = () => {
    const colorScheme = useColorScheme(); // Determina si es 'light' o 'dark'
  const currentTheme = colorScheme === 'light' ? lightTheme : darkTheme; // Aplica el tema correspondiente

    
    return  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  currentTheme.backgroundColor,
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
        color: currentTheme.textColor,
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
        borderColor: currentTheme.inputBorderColor, 
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
        backgroundColor: currentTheme.dividerColor, 
        marginVertical: 10,
    },
    noResultsText: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
    },

    // Footer reutilizable
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: currentTheme.footerBackgroundColor, 
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopColor: currentTheme.footerBorderColor, 
        borderTopWidth: 1,
    },
    footerIcon: {
        fontSize: 28,
        color: currentTheme.footerIconColor,
    },
    activeIcon: {
        color: "#6c44f4", // Color violeta para el ícono activo
    },
  
    
    // Header reutilizable
    header: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        flexDirection: 'row', 
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.headerBorderColor, 
        
    },
    headerLogo: {
        width: 120,
        height: 50,
        resizeMode: 'contain', 
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
        color: currentTheme.headerTitleColor, 

    },
    iconSetting: {
        color: currentTheme.iconSettings,
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
};