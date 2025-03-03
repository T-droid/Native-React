import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * LogoutScreen Component
 * 
 * Renders the logout screen.
 * Features:
 * - Displays a confirmation message for logging out.
 * - Provides buttons to confirm or cancel the logout action.
 * 
 * @returns {JSX.Element} Logout screen UI
 */
export default function LogoutScreen() {
  const router = useRouter();

  /**
   * Handles the logout action.
   * 
   * Steps:
   * 1. Removes the "loggedIn" item from AsyncStorage.
   * 2. Navigates to the login screen.
   * 3. Logs any errors that occur during the logout process.
   * 
   * @returns {Promise<void>}
   */
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loggedIn");
      router.replace("/(authflow)/(login)/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Out</Text>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181636",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#bdbbbb",
    textAlign: "center",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bdbbbb",
    width: "80%",
  },
  cancelText: {
    fontSize: 18,
    color: "#bdbbbb",
  },
});