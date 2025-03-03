import { View, Text, StyleSheet } from "react-native";


/**
 * SupportScreen Component
 * 
 * Renders the support screen.
 * Features:
 * - Displays a title for the support section.
 * - Shows a message with the support contact email.
 * 
 * @returns {JSX.Element} Support screen UI
 */
export default function SupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.text}>For support, contact us at:</Text>
      <Text style={styles.email}>support@fitapp.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181636",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#bdbbbb",
  },
  email: {
    fontSize: 18,
    color: "#007AFF",
    marginTop: 5,
  },
});
