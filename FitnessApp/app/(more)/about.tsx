import { View, Text, StyleSheet } from "react-native";

/**
 * AboutScreen Component
 * 
 * Renders the "About" screen.
 * Features:
 * - Displays the app version.
 * - Shows a message indicating the app is built with React Native.
 * 
 * @returns {JSX.Element} About screen UI
 */
export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>FitApp v1.0.0</Text>
      <Text style={styles.text}>Built with ❤️ using React Native</Text>
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
    marginBottom: 5,
  },
});
