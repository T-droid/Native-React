import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; 
import { Ionicons } from "@expo/vector-icons"; // For icons
import Colors from "@/constants/Colors";


type Options = {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: any;
}
const moreOptions: Options[] = [
  { id: "1", title: "Profile", icon: "person", route: "/profile" },
  { id: "2", title: "Subscription", icon: "card", route: "/subscription" },
  { id: "3", title: "Preferences", icon: "settings", route: "/preferences" },
  { id: "4", title: "Notifications", icon: "notifications", route: "/notifications" },
  { id: "5", title: "Help & Support", icon: "help-circle", route: "/support" },
  { id: "6", title: "About", icon: "information-circle", route: "/about" },
  { id: "7", title: "Logout", icon: "log-out", route: "/logout" },
];

/**
 * MoreScreen Component
 * 
 * Renders the "More" screen.
 * Features:
 * - Displays a list of options for the user to navigate to different sections of the app.
 * - Each option includes an icon and a title.
 * - Navigates to the corresponding screen when an option is pressed.
 * 
 * @returns {JSX.Element} More screen UI
 */
export default function MoreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>More</Text>
      <FlatList
        data={moreOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.option} onPress={() => router.push(item.route)}>
            <Ionicons name={item.icon} size={24} color="#fff" style={styles.icon} />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const { text, page, InputBorderColor } = Colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: page.backgroundColor,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#343845",
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    color: text.PrimaryColor,
  },
});
