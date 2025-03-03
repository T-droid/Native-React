import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StorageManager } from "@/engine/storage";
import { HabitData } from "@/types";


/**
 * ChooseHabit Component
 * 
 * Renders the habit selection screen.
 * Features:
 * - Loads the user's habits from storage on initial load.
 * - Displays the current habit if one exists.
 * - Provides an option to start a new habit if no current habit exists.
 * - Allows the user to delete the current habit.
 * 
 * @returns {JSX.Element} The habit selection screen UI.
 */
export default function ChooseHabit() {
    const [habits, setHabits] = useState<HabitData[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
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
        const loadUserHabit = async () => {
            const habit = StorageManager.loadUserHabits()
                .then((habit) => {
                    setHabits(habit);
                })
                .catch((error) => {
                    console.error('Error loading habits:', error);
                }
            );
        }

        loadUserHabit();
    }, [refresh]);

    /**
     * Deletes a habit from storage and updates the state.
     * 
     * Steps:
     * 1. Deletes the habit using the StorageManager.
     * 2. If successful, updates the habits state by removing the deleted habit.
     * 3. Logs any errors that occur during the process.
     * 4. Toggles the refresh state to trigger a re-render.
     * 
     * @param {string} habitId - The ID of the habit to delete.
     * @returns {Promise<void>}
     */
    const deleteHabit = async (habitId: string) => {
        try {
            const success = await StorageManager.deleteHabit(habitId);
            if (success) {
                setHabits(habits.filter(habit => habit.id !== habitId));
            }
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
        setRefresh(!refresh);
    }
    return (
        <View style={styles.card}>
            {habits.length === 0 ? (
                <>
                <View>
                    <Text style={styles.headerTextStyle}>Choose your next habit</Text>
                    <Text style={{ color: '#a0a1a3'}}>Big gaol starts with small habits</Text>
                </View>
                <Link href={{ pathname: '/habits' }} asChild>
                    <Pressable style={ styles.button }>
                        <Text style={{ color: ButtonColor }}>Start a habit</Text>
                    </Pressable>
                </Link>
                </>
            ) : (
                <View>
                    <Text style={styles.headerTextStyle}>Your current habit</Text>
                    <Text style={{ color: '#a0a1a3'}}>Keep going!</Text>
                    <Text
                    style={{ textAlign: 'center', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10, marginVertical: 10 }}
                    >
                        {habits[0].title}
                    </Text>
                    <Pressable
                    style={[styles.button, { backgroundColor: '#de9e9e' }]}
                    onPress={() => deleteHabit(habits[0].id)}
                    >
                        <Text style={{ color: 'red' }}>Cancel Habit</Text>
                    </Pressable>
                </View>
            )}
            
        </View>
    )
};

const { text, ButtonColor, Card } = Colors;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Card.backgroundColor,
        borderRadius: 10,
        padding: 20,
        gap: 10
    },
    headerTextStyle: {
        color: text.PrimaryColor,
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#646d7d',
        borderRadius: 10,
        padding: 3,
        width: 85
    }
})