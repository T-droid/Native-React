import { AuthContext } from "../Context/AuthContext";
import { Redirect } from "expo-router";
import { useContext, useEffect } from "react";
import { Text } from "react-native";
import plans from "@/constants/PlansData";
import { StorageManager } from "@/engine/storage";

/**
 * Index Component
 * 
 * Handles the initial loading and redirection based on the user's authentication status.
 * Features:
 * - Saves the user's plans to storage on initial load.
 * - Redirects to the authentication flow if the user is not authenticated.
 * - Redirects to the home screen if the user is authenticated.
 * 
 * @returns {JSX.Element} The initial loading and redirection UI.
 */
export default function Index() {
    useEffect(() => {
        const savePlans = async () => {
            await StorageManager.saveAllUserPlans(plans);
            const userPlans = await StorageManager.loadUserPlans();
        }
        savePlans();
    }, [])
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) return <Text>Loading...</Text>;

    if (!user) return <Redirect href='/(authflow)' />;

    return <Redirect href='/(tabs)/home' />;
}