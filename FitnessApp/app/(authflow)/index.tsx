import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Index() {
    const [hasCompletedOnBoarding, setHasCompletedOnBoarding] = useState<boolean | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkOnBoarding = async () => {
            const value = await AsyncStorage.getItem("onboardingComplete");
            setHasCompletedOnBoarding(value === "true");
        };

        const checkLoggedIn = async () => {
            const loggedIn = await AsyncStorage.getItem("loggedIn");
            setIsLoggedIn(loggedIn === "true");
        };

        checkOnBoarding();
        checkLoggedIn();
    }, []);

    if (hasCompletedOnBoarding === null || isLoggedIn === null) {
        // Optionally, you can return a loading indicator here
        return null;
    }

    if (!hasCompletedOnBoarding) {
        return <Redirect href='/(authflow)/(onboarding)/welcome' />;
    }

    if (!isLoggedIn) {
        return <Redirect href='/(authflow)/(login)/login' />;
    }

    return <Redirect href='/(tabs)/home' />;
}