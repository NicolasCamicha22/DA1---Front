import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles'; // Asegúrate de que la ruta sea correcta

export default function SignUpForm({ username, setUsername, name, setName, surname, setSurname, email, setEmail, password, setPassword, profilePic, selectProfilePic, onSignUp, onSignIn }) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainerSignUp}>
            <Text style={styles.titleSignUp}>Sign Up</Text>
            <View style={styles.signupContainerSignUp}>
                <Text style={styles.signupTextSignUp}>Already an account?</Text>
                <TouchableOpacity onPress={onSignIn}>
                    <Text style={styles.signupLinkSignUp}>Sign In</Text>
                </TouchableOpacity>
            </View>

            {/* Username */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Username</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Name */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Name</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Surname */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Surname</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Surname"
                    value={surname}
                    onChangeText={setSurname}
                />
            </View>

            {/* Email */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Email</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {/* Password */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Password</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {/* Confirm Password */}
            <View style={styles.inputWrapperSignUp}>
                <Text style={styles.inputLabelSignUp}>Confirm Password</Text>
                <TextInput
                    style={styles.inputSignUp}
                    placeholder="Confirm Password"
                    secureTextEntry
                />
            </View>

            {/* Foto de perfil */}
            <TouchableOpacity style={styles.profilePicButtonSignUp} onPress={selectProfilePic}>
                <Text style={styles.profilePicButtonTextSignUp}>Elegir Foto de Perfil</Text>
            </TouchableOpacity>

            {profilePic && <Image source={{ uri: profilePic }} style={styles.profilePicPreviewSignUp} />}

            {/* Botón de registro */}
            <TouchableOpacity style={styles.buttonSignUp} onPress={onSignUp}>
                <Text style={styles.buttonTextSignUp}>REGISTER</Text>
            </TouchableOpacity>

           
        </ScrollView>
    );
};