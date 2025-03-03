import { Stack } from "expo-router";

/**
 * LoginLayout Component
 * 
 * Defines the layout for the login screens.
 * Features:
 * - Uses the Stack component from expo-router to manage the navigation stack.
 * - Configures the header visibility for each screen.
 * 
 * @returns {JSX.Element} The layout for the login screens.
 */
export default function LoginLayout() {
    return (
        <Stack>
            <Stack.Screen name="addItem" options={{ headerShown: false }} />
        </Stack>
    )
}