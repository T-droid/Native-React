import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    WithTimingConfig
} from 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import { Link, useLocalSearchParams } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import { StorageManager } from "@/engine/storage";
import preplannedHabits from "@/constants/habitData";

const ANIMATION_CONFIG: WithTimingConfig = {
    duration: 300,
};



const useAnimatedToggle = (initialValue: number, isEnabled: boolean) => {
    const sharedValue = useSharedValue(initialValue);
    
    useEffect(() => {
        sharedValue.value = withTiming(
            isEnabled ? initialValue : 0,
            ANIMATION_CONFIG
        );
    }, [isEnabled, initialValue]);

    return sharedValue;
};

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
export default function SetHabitReminder() {
    const [isEnabled, setIsEnabled] = useState<boolean>(true);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [notifactionId, setNotificationId] = useState<string | null>(null)
    const { habitId } = useLocalSearchParams();
    
    /**
     * Custom hook that returns a shared animated value that toggles between two states.
     * 
     * @param {number} initialValue - The initial value of the animated property.
     * @param {boolean} isEnabled - The boolean state that controls the toggle.
     * @returns {SharedValue<number>} - The shared animated value.
     */
    const height = useAnimatedToggle(50, isEnabled);
    const borderWidth = useAnimatedToggle(1, isEnabled);

    const animatedHeightStyle = useAnimatedStyle(() => ({
        height: height.value
    }));

    const animatedBorderWidthStyle = useAnimatedStyle(() => ({
        borderBottomWidth: borderWidth.value
    }));

    const toggleSwitch = () => setIsEnabled(prev => !prev);

    useEffect(() => {}, []);

    /**
     * Requests notification permissions from the user.
     * 
     * Steps:
     * 1. Requests notification permissions using Expo Notifications API.
     * 2. If permissions are not granted, shows an alert to the user.
     * 
     * @returns {Promise<void>}
     */
    async function requestNotificationPermissions() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Required", "Please enable notifications in settings");
        }
    }

    /**
     * Schedules a daily notification reminder at the specified time.
     * 
     * Steps:
     * 1. If notifications are enabled, schedules a daily notification using Expo Notifications API.
     * 2. Stores the notification ID and the selected habit in AsyncStorage.
     * 3. Shows an alert to the user confirming the reminder.
     * 
     * @param {Date} time - The time at which the reminder should be scheduled.
     * @returns {Promise<void>}
     */
    async function scheduleDailyRemainder(time: Date) {
        if (!isEnabled) return;

        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Time to practice a habit! 🎯",
                body: "Stay consistent! Keep up your habit.",
                sound: true
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DAILY,
                hour: time.getHours(),
                minute: time.getMinutes(),
            },
        });
        setNotificationId(id);
        console.log("notification id", id);
        const habit = preplannedHabits.find(item => item.id === habitId);
        if (habit) {
            console.log("habit", habit);
            StorageManager.saveUserHabit(habit);
        }
        if (id) {
            Alert.alert("Remainder set!", `You will be reminded daily at ${time.getHours()}:${time.getMinutes()}`)
        }  
    }

    /**
     * Cancels the scheduled notification reminder.
     * 
     * Steps:
     * 1. If a notification ID exists, cancels the scheduled notification using Expo Notifications API.
     * 2. Clears the notification ID state.
     * 3. Shows an alert to the user confirming the cancellation.
     * 
     * @returns {Promise<void>}
     */
    async function cancelRemainder() {
        if (notifactionId) {
            await Notifications.cancelScheduledNotificationAsync(notifactionId);
            setNotificationId(null);
            Alert.alert("Remainder Cancelled", "Your daily remander has been turned off");
        }
    }

    /**
     * Opens the time picker for selecting the reminder time.
     * 
     * @returns {void}
     */
    const openTimePicker = () => {
        setShowPicker(true);
    }

    /**
     * Handles the time change event from the time picker.
     * 
     * Steps:
     * 1. Sets the showPicker state to false if the platform is not iOS.
     * 2. If a time is selected, updates the selectedTime state and schedules the daily reminder if notifications are enabled.
     * 
     * @param {Event} event - The event object from the time picker.
     * @param {Date | undefined} selected - The selected time.
     * @returns {void}
     */
    const onTimeChange = (event: any, selected: Date | undefined) => {
        setShowPicker(Platform.OS === "ios");
        if (selected) {
            setSelectedTime(selected);
            if (isEnabled) {
                scheduleDailyRemainder(selected)
            }
        }
    }

    /**
     * Formats the time to a readable string.
     * 
     * @param {Date} time - The time to format.
     * @returns {string} - The formatted time string.
     */
    const formatTime = (time: Date) => {
        return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true})
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.textStyle, styles.textHeaderStyle]}>Want a nudge</Text>
            <Text style={styles.textStyle}>New habits can be hard. We can help with a daily remainder for habit with id {habitId}</Text>
            <View style={styles.card}>
                <Animated.View style={[styles.cardElements, styles.bottomBorderStyle, animatedBorderWidthStyle]}>
                    <View>
                        <Text style={[styles.textStyle, styles.textHeaderStyle]}>Push notifications</Text>
                        <Text style={styles.textStyle}>Habit remainders turned on</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#3a85f0' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </Animated.View>
                <Animated.View style={[styles.cardElements, animatedHeightStyle]}>
                    <Text style={[styles.textStyle, styles.textHeaderStyle]}>Reminder time</Text>
                    <Pressable onPress={openTimePicker}>
                        <Text style={{ color: '#3a85f0'}}>{formatTime(selectedTime)}</Text>
                    </Pressable>
                    {showPicker && (
                        <DateTimePicker
                        value={selectedTime}
                        mode="time"
                        display="spinner"
                        onChange={onTimeChange}
                        />
                    )}
                </Animated.View>
            </View>
            <Text style={styles.textStyle}>⚡Tip: make it easy with habit stacking. Pair your new habit with something you already do everyday</Text>
            <Link href={{ pathname: '/checkoutHabit'}} asChild>
                <Pressable onPress={() => scheduleDailyRemainder(selectedTime)} style={styles.button}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Create my habit</Text>
                </Pressable>
            </Link>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181636',
        paddingHorizontal: 15,
        gap: 10
    },
    textStyle: {
        color: '#bdbbbb'
    },
    textHeaderStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#3a85f0',
        borderRadius: 20,
        paddingVertical: 10,
        width: 250,
        alignItems: 'center',
        alignSelf: 'center',
        top: 600
    },
    card: {
        backgroundColor: '#343845',
        borderRadius: 10,
        padding: 20,
        gap: 10
    },
    cardElements: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomBorderStyle: {
        paddingBottom: 15,
        // borderBottomWidth: 1,
        borderBottomColor: '#bdbbbb'
    }
})