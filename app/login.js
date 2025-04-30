

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth } from "../firebaseconfig.js"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Login Successful");
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
                <Text style={styles.subtitle}>Your Customized Travel Planner</Text>

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

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.signupText}>
                    Don't have an account?
                    <Text style={styles.signupLink} onPress={() => router.push("/signup")}> Sign Up</Text>
                </Text>
            </View>
        </View>
    );
};




const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D3D3D3' },
    card: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 20, alignItems: 'center', elevation: 5 },
    header: { flexDirection: 'row', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1E90FF', marginLeft: 5 },
    subtitle: { fontSize: 14, color: 'gray', marginBottom: 20 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#1E90FF', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 15, backgroundColor: '#E0F2FF' },
    input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
    loginButton: { backgroundColor: '#1E90FF', width: '100%', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    loginText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    signupText: { marginTop: 15, fontSize: 14, color: 'gray' },
    signupLink: { color: '#1E90FF', fontWeight: 'bold' },
});

export default LoginScreen;