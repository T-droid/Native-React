import { Stack } from "expo-router";

/**
 * LoginLayout - Handles the layout configuration for the login flow screens
 * 
 * This component sets up a Stack navigator specifically for the login-related screens.
 * It configures a headerless navigation stack, providing a clean fullscreen experience
 * for the authentication interface.
 * 
 * @returns Stack Navigator component with configured login screen
 */
export default function LoginLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
    )
}