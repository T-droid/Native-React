import ExpandableCard from "@/components/Dashboard/expandableCard";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import preplannedHabits from "@/constants/habitData";
import { Link } from "expo-router";
import { useState } from "react";

/**
 * Habits Component
 * 
 * Renders the habits selection screen.
 * Features:
 * - Displays a list of preplanned habits using ExpandableCard components.
 * - Allows the user to select a habit for the week.
 * - Provides navigation to the set habit reminder screen.
 * 
 * @returns {JSX.Element} Habits selection screen UI
 */
export default function Habits() {
    const [selectedCard, setSelectedCard] = useState('');
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerTextStyle}>What will be your habit this week</Text>
                <Text style={{ color: '#bdbbbb' }}>Your will focus on this one for the next 7 days</Text>
            </View>
            <FlatList
            data={preplannedHabits}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
            renderItem={({ item }) => (
                <ExpandableCard
                emoji={item.emoji}
                title={item.title}
                content={item.content}
                isSelected={selectedCard === item.id}
                setSelected={() => setSelectedCard(item.id)}
                />
            )}
            showsVerticalScrollIndicator={false}
            />
            { selectedCard &&
            <Link style={styles.linkbtn} href={{ pathname: '/setHabitRemainder', params: { habitId: selectedCard }}} asChild>
                <Pressable style={styles.button}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
                </Pressable>
            </Link>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181636',
        paddingHorizontal: 15,
        gap: 10
    },
    headerTextStyle: {
        color: '#bdbbbb',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3a85f0',
        borderRadius: 20,
        paddingVertical: 10,
        width: 250,
        alignItems: 'center',
    },
    activeBtn: {
        backgroundColor: '#3a85f0',
    },
    disabledBtn: {
        backgroundColor: '#e1e2e3',
        cursor: 'auto'
    },
    linkbtn: {
        marginLeft: 30,
        marginBottom: 10
    }
})