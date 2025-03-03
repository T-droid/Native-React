import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";


/**
 * ConnectSteps Component
 * 
 * Renders the connect steps screen.
 * Features:
 * - Allows the user to choose a device to connect for step tracking.
 * - Provides an option to not track steps.
 * - Toggles the checkbox status for not tracking steps.
 * 
 * @returns {JSX.Element} Connect steps screen UI
 */
export default function ConnectSteps() {
    const [checkboxStatus, setCheckBoxStatus] = useState<'checked' | 'unchecked'>('checked');

    /**
     * SetHabitReminder Component
     * 
     * Renders the set habit reminder screen.
     * Features:
     * - Allows the user to enable/disable push notifications.
     * - Allows the user to select a reminder time.
     * - Schedules or cancels daily reminders based on user input.
     * 
     * @returns {JSX.Element} Set habit reminder screen UI
     */
    const toggleCheckBox = () => {
        setCheckBoxStatus(prevState => prevState === 'checked' ? 'unchecked' : 'checked')
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.textColor, { fontWeight: 'bold', padding: 10 }]}>Choose your device</Text>
            <Pressable>
                <View style={styles.card}>
                    <FontAwesome name="plus-square" color='#1f80cf' size={24} />
                    <View>
                        <Text style={styles.textColor}>Add a device</Text>
                        <Text style={styles.textColor}>Connect your steps tracker to MyFitnessPal</Text>
                    </View>
                </View>
            </Pressable>
            <View style={[styles.card, { borderBottomWidth: 1 }]}>
                <FontAwesome name="ban" color='white' size={24} />
                <View>
                    <Text style={styles.textColor}>Don't track steps</Text>
                    <Text style={styles.textColor}>No step data will be stored</Text>
                </View>
                <Pressable style={{ left: 80}} onPress={toggleCheckBox}>
                    <Checkbox status={checkboxStatus} color="#2083d4" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181636'
    },
    card: {
        borderTopWidth: 1,
        borderColor: '#9b9d9e',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    textColor: {
        color: '#b3b4b5'
    }
})