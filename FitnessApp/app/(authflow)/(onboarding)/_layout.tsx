import { Stack } from "expo-router";


/**
 * OnBoardingLayout - Defines the navigation stack structure for the onboarding flow
 * 
 * This component sets up a Stack navigator for the onboarding process with the following screens:
 * - moreQuestions: Additional user questions screen
 * - welcome: Initial welcome screen
 * - preferredName: User name input screen
 * - weightGoal: Weight target selection screen
 * - muscleGoal: Muscle building goals screen
 * - gender: Gender selection screen
 * - signup: User registration screen
 * - done: Onboarding completion screen
 * 
 * All screens are configured with headerShown: false to maintain a clean, immersive onboarding experience
 * 
 * @returns {JSX.Element} Stack navigator component with configured screens
 */
export default function OnBoardingLayout() {
    return (
        <Stack>
            <Stack.Screen name="moreQuestions" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="preferredName" options={{ headerShown: false }} />
            <Stack.Screen name="weightGoal" options={{ headerShown: false }} />
            <Stack.Screen name="preconditions" options={{ headerShown: false }} />
            <Stack.Screen name="muscleGoal" options={{ headerShown: false }} />
            <Stack.Screen name="gender" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="done" options={{ headerShown: false }} />
        </Stack>
    );
}