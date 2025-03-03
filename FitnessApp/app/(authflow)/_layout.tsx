/**
 * Authentication Flow Layout Component
 * Manages the navigation stack and onboarding state for the auth flow
 */
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"


/**
 * AuthFlowLayout Component
 * @returns Stack Navigator configuration for authentication flow
 * 
 * Features:
 * - Tracks onboarding completion status
 * - Manages navigation stack for auth-related screens
 * - Handles header visibility settings
 */
export default function AuthFlowLayout() {
    const [hasCompletedOnBoarding, setHasCompletedOnBoarding] = useState<boolean>(false)


    /**
     * Checks onboarding completion status on component mount
     * Retrieves stored value from AsyncStorage
     */
    useEffect(() => {
        const checkOnBoarding = async () => {
            const value = await AsyncStorage.getItem("onboardingComplete");
            setHasCompletedOnBoarding(value === "true");
        }
        checkOnBoarding();
    }, [])
    return (
        <Stack>
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
            <Stack.Screen name="(login)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}