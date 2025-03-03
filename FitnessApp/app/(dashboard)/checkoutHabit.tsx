import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


/**
 * CheckoutHabit Component
 * 
 * Renders the checkout habit screen.
 * Features:
 * - Displays a congratulatory message.
 * - Shows the selected weekly habit.
 * - Provides tips for tracking and reflecting on the habit.
 * - Navigation to the home screen.
 * 
 * @returns {JSX.Element} Checkout habit screen UI
 */
export default function CheckoutHabit() {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Weekly Habits</Text>
            <View>
                <Text style={[styles.textStyle, styles.congratulationsTextStyle]}>Boom! Congrats</Text>
                <Text style={styles.textStyle}>Your commitment takes you one big step closer to your goals</Text>
            </View>
            <View style={styles.habitContainer}>
                <Text style={[styles.textStyle, { fontSize: 20 }]}>Weekly habits</Text>
                <Text style={styles.textStyle}>Eat 2 fruits for at least 5 days this week</Text>
            </View>
            <View style={styles.body}>
                <MaterialCommunityIcons name="check-circle" color={'white'} size={24} />
                <View>
                    <Text style={[styles.textStyle, styles.bodyHeaderText]}>Give yourself credit</Text>
                    <Text style={styles.textStyle}>Each day you complete the habit, check it off</Text>
                </View>
            </View>
            <View style={styles.body}>
                <FontAwesome name="calendar-o" color={'white'} size={24} />
                <View>
                    <Text style={[styles.textStyle, styles.bodyHeaderText]}>Reflection is key</Text>
                    <Text style={[styles.textStyle]}>At the end of 7 days, reflect and prepare for the week a head</Text>
                </View>
            </View>
            <Pressable style={styles.button} onPress={() => router.replace('/(tabs)/home')}>
                <Text style={styles.btnText}>Let's go!</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f80cf',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    textStyle: {
        color: 'white'
    },
    congratulationsTextStyle: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    habitContainer: {
        backgroundColor: '#373e40',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        gap: 10
    },
    body: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 15,
        width: '90%'
    },
    bodyHeaderText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    button: {
        position: 'absolute',
        top: 680,
        backgroundColor: 'white',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 20
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1f80cf'
    }
})