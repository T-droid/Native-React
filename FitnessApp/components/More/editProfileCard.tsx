import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/Colors";


/**
 * EditCard Component
 * 
 * Renders the edit profile card.
 * Features:
 * - Allows the user to update their name and email.
 * - Validates that the email and confirm email fields match.
 * - Saves the updated profile information to AsyncStorage.
 * 
 * @param {Object} props - The properties for the edit profile card.
 * @param {() => void} props.doneEditing - The function to call when the user is done editing.
 * @returns {JSX.Element} The edit profile card UI.
 */
export default function EditCard({ doneEditing }: { doneEditing: () => void }) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>("");

    /**
     * Handles the save action for updating the user's profile.
     * 
     * Steps:
     * 1. Checks if the email and confirm email fields match.
     * 2. Saves the name and email to AsyncStorage if they are not empty.
     * 3. Displays a success message and calls the doneEditing function.
     * 4. Logs any errors that occur during the save process and displays an error message.
     * 
     * @returns {Promise<void>}
     */
    const handleSave = async () => {
        if (email !== confirmEmail) {
            alert("Emails do not match!");
            return;
        }

        try {
            if (name.length > 0) await AsyncStorage.setItem("name", name);
            if (email.length > 0) await AsyncStorage.setItem("email", email);
            alert("Profile updated successfully!");
            doneEditing();
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to update profile.");
        }
    };

    const isButtonDisabled = !name && !email;

    return (
        <View style={styles.editContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.textColor}>New Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.textInputStyle}
                    textColor="white"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textColor}>New Email</Text>
                <TextInput
                    value={email}
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    style={styles.textInputStyle}
                    textColor="white"
                />
            </View>
            {email && (
                <View style={styles.inputContainer}>
                    <Text style={styles.textColor}>Confirm Email</Text>
                    <TextInput
                        value={confirmEmail}
                        keyboardType='email-address'
                        onChangeText={setConfirmEmail}
                        style={styles.textInputStyle}
                        textColor="white"
                    />
                </View>
            )}
            <TouchableOpacity disabled={isButtonDisabled} style={[styles.button, isButtonDisabled && styles.buttonDisabled]} onPress={handleSave}>
                <Text style={styles.buttonText}>Done!</Text>
            </TouchableOpacity>
        </View>
    );
}

const { page, ButtonColor} = Colors;

const styles = StyleSheet.create({
    editContainer: {
        padding: 10,
        gap: 10,
    },
    inputContainer: {
        gap: 5,
    },
    button: {
        backgroundColor: ButtonColor,
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    textInputStyle: {
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        borderWidth: 1,
        borderColor: '#bdbbbb',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: "#fff",
        height: 50,
    },
    textColor: {
        color: '#bdbbbb',
    },
});