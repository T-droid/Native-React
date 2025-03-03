import { FontAwesome } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

/**
 * DashboardHeader Component
 * 
 * Renders the header for the dashboard.
 * Features:
 * - Displays a user icon that navigates to the profile screen when pressed.
 * - Shows the app title.
 * - Displays a notification bell icon.
 * 
 * @returns {JSX.Element} The dashboard header UI.
 */
export default function DashboardHeader() {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.push('/(more)/profile')}>
            <FontAwesome
            name="user-circle-o"
            size={28}
            color={ButtonColor}
            />
            </Pressable>
            <Text style={styles.textStyle}>Fitness App</Text>
            <FontAwesome
            name="bell-o"
            size={20}
            color={ButtonColor}
            />
        </View>
    )
};

const { ButtonColor, text } = Colors;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 15,
    },
    textStyle: {
        color: text.appThemeTextColor,
        fontSize: 40,
        fontWeight: 'bold'
    }
})