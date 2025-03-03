import { Stack } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import React from "react";
import { AuthProvider } from "../Context/AuthContext";
import { DiaryProvider } from "@/Context/diaryContext";

export const DATABASE_NAME = 'FitnessDb';

/**
 * RootLayout Component
 * 
 * Provides the root layout for the application.
 * Features:
 * - Wraps the application with the AuthProvider.
 * - Uses Suspense to handle loading states with an ActivityIndicator.
 * 
 * @returns {JSX.Element} The root layout for the application.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <Suspense fallback={<ActivityIndicator size="large" />}>      
        <App />
      </Suspense>
    </AuthProvider> 
  );
}

/**
 * App Component
 * 
 * Provides the application layout.
 * Features:
 * - Wraps the application with the DiaryProvider.
 * - Defines the navigation stack using the Stack component from expo-router.
 * 
 * @returns {JSX.Element} The application layout.
 */
function App() {
  return (
    <DiaryProvider>
      <Stack>       
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
            <Stack.Screen name="(plans)" options={{ headerShown: false }} />
            <Stack.Screen name="(more)" options={{ headerShown: false }} />
            <Stack.Screen name="(authflow)" options={{ headerShown: false }} />
            <Stack.Screen name="(diary)" options={{ headerShown: false }} />
      </Stack>
    </DiaryProvider> 
  );
}
