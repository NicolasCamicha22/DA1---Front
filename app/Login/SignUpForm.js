import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from '../styles'; // Ruta correcta de tus estilos

const { height, width } = Dimensions.get('window'); // Obtener dimensiones del dispositivo


export default function SignUpForm({ username, setUsername, name, setName, surname, setSurname, email, setEmail, password, confirmPassword,setConfirmPassword, setPassword, profilePic, selectProfilePic, onSignUp, onSignIn }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    return (
        <KeyboardAvoidingView
            style={[styles.containerSignUp, { paddingVertical: height * 0.02, paddingHorizontal: 20 }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={[styles.titleSignUp, { fontSize: height * 0.04 }]}>Sign Up</Text>

            <View style={[styles.signupContainerSignUp, { marginBottom: height * 0.02 }]}>
                <Text style={[styles.signupTextSignUp, { fontSize: height * 0.02 }]}>
                    Already an account?
                </Text>
                <TouchableOpacity onPress={onSignIn}>
                    <Text style={[styles.signupLinkSignUp, { fontSize: height * 0.02 }]}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Username */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Username</Text>
                <TextInput
                    style={[styles.inputSignUp, { height: height * 0.06 }]}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

           
            {/* Name */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Name</Text>
                <TextInput
                    style={[styles.inputSignUp, { height: height * 0.06 }]}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Surname */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Surname</Text>
                <TextInput
                    style={[styles.inputSignUp, { height: height * 0.06 }]}
                    value={surname}
                    onChangeText={setSurname}
                />
            </View>

            {/* Email */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Email</Text>
                <TextInput
                    style={[styles.inputSignUp, { height: height * 0.06 }]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {/* Password */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                        <Ionicons
                            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Botón para elegir foto */}
            <TouchableOpacity
                style={[styles.buttonSignUp, { marginVertical: height * 0.02 }]}
                onPress={selectProfilePic}
            >
                <Text style={styles.buttonTextSignUp}>Choose Profile Picture</Text>
            </TouchableOpacity>

            {profilePic && (
                <Image
                    source={{ uri: profilePic }}
                    style={[
                        styles.profilePicPreviewSignUp,
                        { width: width * 0.25, height: width * 0.25 },
                    ]}
                />
            )}

            {/* Botón de registro */}
            <TouchableOpacity style={styles.buttonSignUp} onPress={onSignUp}>
                <Text style={styles.buttonTextSignUp}>REGISTER</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );

};