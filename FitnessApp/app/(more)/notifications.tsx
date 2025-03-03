import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";


/**
 * NotificationsScreen Component
 * 
 * Renders the notifications settings screen.
 * Features:
 * - Allows the user to enable or disable notifications.
 * 
 * @returns {JSX.Element} Notifications settings screen UI
 */
export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      
      <View style={styles.row}>
        <Text style={styles.text}>Enable Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
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
