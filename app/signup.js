import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { auth } from "../firebaseconfig.js"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

const SignUpScreen = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Account Created Successfully");
            router.push("/plan"); // Navigate to the next screen
        } catch (error) {
            Alert.alert("Error", JSON.stringify(error, null, 2));

        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <MaterialIcons name="location-on" size={28} color="#1E90FF" />
                    <Text style={styles.title}>Tour Buddy</Text>
                </View>
                <Text style={styles.subtitle}>Create Your Travel Account</Text>

                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={20} color="gray" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Full Name" 
                        placeholderTextColor="gray"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={20} color="gray" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        placeholderTextColor="gray"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color="gray" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Password" 
                        placeholderTextColor="gray" 
                        secureTextEntry 
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color="gray" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Confirm Password" 
                        placeholderTextColor="gray" 
                        secureTextEntry 
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                    Already have an account? <Text style={styles.loginLink} onPress={() => router.push("/login")}>Login</Text>
                </Text>
            </View>
        </View>
    );
};

// Styles remain the same




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#D3D3D3',  // Light Sky Blue background
    },
    card: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E90FF',  // Sky Blue title
        marginLeft: 5,
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#1E90FF',  // Sky Blue Border
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        backgroundColor: '#E0F2FF',  // Light Blue background for input
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    signupButton: {
        backgroundColor: '#1E90FF',  // Sky Blue button
        width: '100%',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    signupText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 15,
        fontSize: 14,
        color: 'gray',
    },
    loginLink: {
        color: '#1E90FF',  // Sky Blue Login Link
        fontWeight: 'bold',
    },
});

export default SignUpScreen;