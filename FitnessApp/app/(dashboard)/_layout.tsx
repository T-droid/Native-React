import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";


/**
 * DashboardLayout Component
 * 
 * Defines the layout for the dashboard screens.
 * Features:
 * - Uses the Stack component from expo-router to manage the navigation stack.
 * - Configures the header style, tint color, and visibility for each screen.
 * 
 * @returns {JSX.Element} The layout for the dashboard screens.
 */
export default function DashboardLayout() {
    return (
        <Stack>
            <Stack.Screen
            name="habits"
            options={{                
                headerStyle: {
                    backgroundColor: '#181636',
                },
                headerTintColor: '#a0a1a3',
                headerShadowVisible: false,
                headerTitle: 'weekly habits'
            }} />
            <Stack.Screen
            name="setHabitRemainder"
            options={{                
                headerStyle: {
                    backgroundColor: '#181636',
                },
                headerTintColor: '#a0a1a3',
                headerShadowVisible: false,
                headerTitle: 'weekly habits'
            }} />
            <Stack.Screen name="checkoutHabit" options={{ headerShown: false}} />
            <Stack.Screen name="trackSteps"
            options={{                
                headerStyle: {
                    backgroundColor: '#181636',
                },
                headerTintColor: '#a0a1a3',
                headerShadowVisible: false,
                headerTitle: 'Track steps'
            }} />
            <Stack.Screen name="discoverItem" options={{ headerShown: false }} />
        </Stack>
    )
}