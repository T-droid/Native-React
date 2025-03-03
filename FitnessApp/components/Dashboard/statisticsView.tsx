import Colors from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * StatisticsView Component
 * 
 * Renders the statistics view for the dashboard.
 * Features:
 * - Fetches the user's calorie goal from AsyncStorage on initial load.
 * - Displays the remaining calories, base goal, food calories, and exercise calories.
 * 
 * @returns {JSX.Element} The statistics view UI.
 */
export default function StatisticsView() {
    const [goal, setGoal] = useState(2830);

    useEffect(() => {
        const fetchGoal = async () => {
            const goal = await AsyncStorage.getItem('goal');
            if (goal) {
                setGoal(parseInt(goal));
            }
        }
        fetchGoal();
    }, []);
    return (        
        <View style={styles.card}>
            <View>
                <Text style={styles.headerTextStyle}>Calories</Text>
                <Text style={{ color: '#a0a1a3'}}>Remaining = Goal - Food + Exercise</Text>
            </View>
            <View style={styles.cardBody}>
                <View style={styles.caloryCountStyles}>
                    <Text style={styles.textStyles}>{goal}</Text>
                    <Text style={styles.textStyles}>Remaining</Text>
                </View>
                <View>
                    <View style={styles.statistic}>
                        <View>
                            <FontAwesome
                            name="flag"
                            color={'#a0a1a3'}
                            size={20}
                            />
                        </View>
                        <View>
                            <Text style={styles.textStyles}>Base Goal</Text>
                            <Text style={styles.textStyles}>2,830</Text>
                        </View>
                    </View>
                    <View style={styles.statistic}>
                        <View>
                            <MaterialCommunityIcons
                            name="silverware-fork-knife"
                            color={ButtonColor}
                            size={20}
                            />
                        </View>
                        <View>
                            <Text style={styles.textStyles}>Food</Text>
                            <Text style={styles.textStyles}>0</Text>
                        </View>
                    </View>
                    <View style={styles.statistic}>
                        <View>
                            <MaterialCommunityIcons
                            name="fire"
                            color={'#e37827'}
                            size={20}
                            />
                        </View>
                        <View>
                            <Text style={styles.textStyles}>Exercise</Text>
                            <Text style={styles.textStyles}>0</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const { Card, text, page, ButtonColor } = Colors;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Card.backgroundColor,
        borderRadius: 10,
        padding: 20
    },
    headerTextStyle: {
        color: text.PrimaryColor,
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    caloryCountStyles: {
        width: 110,
        height: 110,
        borderWidth: 10,
        borderColor: page.backgroundColor,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyles: {
        color: '#d4d5d6'
    },
    statistic: {
        flexDirection: 'row',
        gap: 10,
        padding: 2
    }
})