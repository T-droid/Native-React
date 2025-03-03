import Colors from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


type Props = {
    iconName: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof FontAwesome.glyphMap,
    title: string;
    text: string;
}

/**
 * DiscoverCard Component
 * 
 * Renders a discover card.
 * Features:
 * - Displays an icon, title, and description.
 * - Navigates to the discover item screen when pressed.
 * 
 * @param {Props} props - The properties for the discover card.
 * @param {keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof FontAwesome.glyphMap} props.iconName - The name of the icon to display.
 * @param {string} props.title - The title of the discover card.
 * @param {string} props.text - The description of the discover card.
 * @returns {JSX.Element} The discover card UI.
 */
export default function DiscoverCard({ iconName, title, text}: Props) {
    /**
     * ChooseHabit Component
     * 
     * Renders the habit selection screen.
     * Features:
     * - Loads the user's habits from storage on initial load.
     * - Displays the current habit if one exists.
     * - Provides an option to start a new habit if no current habit exists.
     * - Allows the user to delete the current habit.
     * 
     * @returns {JSX.Element} The habit selection screen UI.
     */
    const handlePress = () => {
        router.push({ pathname: '/(dashboard)/discoverItem', params: { title, description: text } });
    }
    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <View style={styles.iconBackground}>
                {iconName in MaterialCommunityIcons.glyphMap ? (
                    <MaterialCommunityIcons name={iconName as keyof typeof MaterialCommunityIcons.glyphMap} size={25} color={DiscoverIcons.color} />
                ) : (
                    <FontAwesome name={iconName as keyof typeof FontAwesome.glyphMap} size={25} color={DiscoverIcons.color} />
                )}
            </View>
            <Text style={styles.headerTextStyle}>{title}</Text>
            <Text style={{ color: '#a0a1a3'}}>{text}</Text>
        </Pressable>
    )
}

const { text, Card, DiscoverIcons } = Colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Card.backgroundColor,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 15
    },
    headerTextStyle: {
        color: text.PrimaryColor,
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconBackground: {
        backgroundColor: DiscoverIcons.BackGround,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 25
    }
})