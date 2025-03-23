import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/Colors";


/**
 * Login Component
 * 
 * Handles user authentication through email and password.
 * Features:
 * - Email and password validation
 * - Credential verification against AsyncStorage
 * - Password visibility toggle
 * - Keyboard-aware layout
 * - Navigation to signup and home screens
 * 
 * @returns {JSX.Element} Login screen UI
 */
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /**
     * Handles the login authentication process
     * 
     * Steps:
     * 1. Validates form completion
     * 2. Verifies email against stored value
     * 3. Verifies password against stored value
     * 4. Sets login status and redirects on success
     * 
     * @returns {Promise<void>}
     */
    const handleLogin = async () =>  {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        try {
            const storedEmail = await AsyncStorage.getItem("email");
            if (storedEmail !== email) {
                Alert.alert('Error', "Incorrect email");
                return;
            }

            const storedPwd = await AsyncStorage.getItem("password");
            if (storedPwd !== password) {
                Alert.alert("Error", "Wrong password");
                return;
            }
            await AsyncStorage.setItem("loggedIn", "true")
            router.replace('/(tabs)/home');
        } catch (error) {
            Alert.alert("Error", "Login failed");
            console.log(error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <Text style={styles.header}>Welcome back</Text>
                <View style={styles.body}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter email</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="your@email.com"
                            placeholderTextColor="#818285"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter password</Text>
                        <TextInput 
                            style={[styles.input, styles.passwordInput]} 
                            secureTextEntry={!showPassword}
                            placeholder="Your password"
                            placeholderTextColor={placeHolderColor}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity 
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                            >
                            <Ionicons 
                                name={showPassword ? "eye-off" : "eye"} 
                                size={24} 
                                color={placeHolderColor} 
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => router.replace('/(authflow)/(onboarding)/signup')}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const { page, text, InputBorderColor, ButtonColor, placeHolderColor } = Colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: page.backgroundColor,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        color: text.SecondaryColor,
        fontSize: 32,
        fontWeight: 'bold',
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 20,
    },
    body: {
        padding: 24,
        flex: 1,
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        color: placeHolderColor,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: InputBorderColor,
        height: 56,
        color: 'white',
        fontSize: 16,
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    button: {
        backgroundColor: ButtonColor,
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    buttonText: {
        color: text.SecondaryColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        gap: 8,
    },
    footerText: {
        color: placeHolderColor,
        fontSize: 16,
    },
    linkText: {
        color: ButtonColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 43,
        height: 24,
        width: 24,
    }
});
