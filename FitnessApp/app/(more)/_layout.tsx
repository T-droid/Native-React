import { Stack } from "expo-router";


/**
 * MoreLayout Component
 * 
 * Defines the layout for the "more" screens.
 * Features:
 * - Uses the Stack component from expo-router to manage the navigation stack.
 * - Configures the header visibility for each screen.
 * 
 * @returns {JSX.Element} The layout for the "more" screens.
 */
export default function MoreLayout() {
    return (
        <Stack>
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="logout" options={{ headerShown: false }} />
            <Stack.Screen name="notifications" options={{ headerShown: false }} />
            <Stack.Screen name="preferences" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="subscription" options={{ headerShown: false }} />
            <Stack.Screen name="support" options={{ headerShown: false }} />
        </Stack>
    )
}