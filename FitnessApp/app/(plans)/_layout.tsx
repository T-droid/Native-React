import { Stack } from "expo-router";

/**
 * PlansLayout Component
 * 
 * Defines the layout for the "plans" screens.
 * Features:
 * - Uses the Stack component from expo-router to manage the navigation stack.
 * - Configures the header visibility for the planDetails screen.
 * 
 * @returns {JSX.Element} The layout for the "plans" screens.
 */
export default function PlansLayout() {
    return (
        <Stack>
            <Stack.Screen name="planDetails" options={{ headerShown: false }} />
        </Stack>
    )
}