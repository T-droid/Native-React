import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";


/**
 * PreferencesScreen Component
 * 
 * Renders the preferences screen.
 * Features:
 * - Allows the user to enable or disable dark mode.
 * 
 * @returns {JSX.Element} Preferences screen UI
 */
export default function PreferencesScreen() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences</Text>
      
      <View style={styles.row}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    color: "#bdbbbb",
  },
});
