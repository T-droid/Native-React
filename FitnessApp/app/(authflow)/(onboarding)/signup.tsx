import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/Colors";


/**
 * SignUp Component
 * 
 * Renders the signup screen.
 * Features:
 * - Input fields for email and password.
 * - Password visibility toggle.
 * - Form submission with validation.
 * 
 * @returns {JSX.Element} Signup screen UI
 */
export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    /**
     * Retrieves the user's preferred name from AsyncStorage.
     * 
     * Steps:
     * 1. Retrieves the name from AsyncStorage.
     * 2. If the name is not found, navigates to the preferred name input screen.
     * 
     * @returns {Promise<string | null>} - The retrieved name or null if not found.
     */
    const getName = async () => {
        const name =  await AsyncStorage.getItem("name");
        if (!name) router.push('/(authflow)/(onboarding)/preferredName');
        return name;
    }

    /**
     * Handles the signup process.
     * 
     * Steps:
     * 1. Retrieves the user's preferred name using getName function.
     * 2. Validates the email, password, and retrieved name.
     * 3. If inputs are valid, stores the email and password in AsyncStorage.
     * 4. Navigates to the login screen.
     * 
     * @returns {Promise<void>}
     */
    const handleSignup = async () => {
        const retrievedName = await getName();
        if (!email || !password || !retrievedName) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        try {
            await AsyncStorage.setItem("email", email)
            await AsyncStorage.setItem("password", password)
            
            router.replace('/(authflow)/(login)/login')
        } catch (error) {
            console.error("Error during signup:", error);
            Alert.alert("Error", "An error occurred during signup");
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <Text style={styles.header}>Create your account</Text>
                <View style={styles.body}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter email</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="your@email.com"
                            placeholderTextColor={placeHolderColor}
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
                    
                    <TouchableOpacity style={styles.button} onPress={() => handleSignup()}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Sign In</Text>
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
        color: text.SecondaryColor,
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
})
