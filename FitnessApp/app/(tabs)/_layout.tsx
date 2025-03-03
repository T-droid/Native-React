import { Tabs } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";


/**
 * TabLayout Component
 * 
 * Defines the layout for the tab navigation screens.
 * Features:
 * - Uses the Tabs component from expo-router to manage the tab navigation.
 * - Configures the tab bar style and icons for each screen.
 * 
 * @returns {JSX.Element} The layout for the tab navigation screens.
 */
export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: ButtonColor, tabBarInactiveTintColor: '#a0a1a3', tabBarStyle: { backgroundColor: '#181636' } }}>
            <Tabs.Screen
            name="home"
            options={{
                title: 'Dashboard',
                headerShown: false,
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="view-dashboard" color={color} />
            }}
            />
            <Tabs.Screen
            name="diary"
            options={{
                title: 'Diary',
                headerShown: false,
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="book-edit" color={color} />
            }}
            />
            <Tabs.Screen
            name="plans"
            options={{
                title: 'Plans',
                headerShown: false,
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="clipboard-list" color={color} />
            }}
            />
            <Tabs.Screen
            name="more"
            options={{
                title: 'More',
                headerShown: false,
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="dots-vertical" color={color} />
            }}
            />
        </Tabs>
    )
}

const { text, ButtonColor } = Colors;