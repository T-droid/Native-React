import Colors from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
    type: 'Exercise' | 'Steps';
}

/**
 * DiscoverCard Component
 * 
 * Renders a discover card.
 * Features:
 * - Displays an icon, title, and description.
 * - Navigates to the discover item screen when pressed.
 * 
 * @param {Props} props - The properties for the discover card.
 * @param {keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof FontAwesome.glyphMap} props.iconName - The name of the icon to display.
 * @param {string} props.title - The title of the discover card.
 * @param {string} props.text - The description of the discover card.
 * @returns {JSX.Element} The discover card UI.
 */
export default function ExerciseStepCard({ type }: Props) {
    return (
        <Link push href={{ pathname: type === 'Steps' ? '/trackSteps' : '/diary'}} asChild>
            <Pressable style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.headerTextStyle}>{type}</Text>
                    {type === 'Exercise' &&
                    <FontAwesome name="plus" size={20} color={'white'} />}
                </View>
                {type === 'Steps' ? (
                    <View style={styles.cardBody}>
                        <MaterialCommunityIcons name="shoe-print" size={27} color={ButtonColor} />
                        <Text style={{ width: '45%', color: text.PrimaryColor}}>Connect to track steps</Text>
                        <FontAwesome name="angle-right" size={25} color={text.PrimaryColor} />
                    </View>
                ):(
                    <View>
                        <View style={styles.cardBody}>
                            <MaterialCommunityIcons name="fire" size={25} color={'#e37827'} />
                            <Text style={styles.exerciseText}> 0 cal</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <MaterialCommunityIcons name="clock" size={25} color={'#e37827'} />
                            <Text style={styles.exerciseText}>0:00 hr</Text>
                        </View>
                    </View>
                )}
            </Pressable>
        </Link>
    )
}

const { text, Card, ButtonColor } = Colors;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Card.backgroundColor,
        borderRadius: 10,
        padding: 20,
        gap: 10,
        width: '47%'
    },
    headerTextStyle: {
        color: text.PrimaryColor,
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseText: {
        color: '#828485',
        fontWeight: 'bold',
        fontSize: 20
    }
})