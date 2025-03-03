import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    title: string;
    content: { header: string; body: string; };
    emoji: string;
    isSelected: boolean;
    setSelected: () => void;
}

/**
 * ExpandableCard Component
 * 
 * Renders an expandable card.
 * Features:
 * - Displays an icon, title, and description.
 * - Expands or collapses the card content when pressed.
 * 
 * @param {Props} props - The properties for the expandable card.
 * @param {string} props.title - The title of the expandable card.
 * @param {{ header: string; body: string; }} props.content - The content of the expandable card.
 * @param {string} props.emoji - The emoji to display in the card header.
 * @param {boolean} props.isSelected - Whether the card is currently selected (expanded).
 * @param {() => void} props.setSelected - The function to call when the card is pressed.
 * @returns {JSX.Element} The expandable card UI.
 */
export default function ExpandableCard({ title, content, emoji, isSelected, setSelected }: Props) {
    const [animation] = useState(new Animated.Value(0));


    useEffect(() => {
        const toggle = () => {
            Animated.timing(animation, {
                toValue: isSelected ? 1: 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }

        toggle();
    }, [isSelected])

    const heighInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });

    return (
        <View style={[styles.card, isSelected ? styles.expandedStyles : null ]}>
            <TouchableOpacity onPress={() => setSelected()} style={styles.header}>
                <Text style={{ marginRight: 10, fontSize: 20 }}>{emoji}</Text>
                <Text style={styles.title}>{title}</Text>
                <MaterialCommunityIcons style={{ marginRight: 10 }} name="menu-down" size={20} color='#bdbbbb' />
            </TouchableOpacity>
            <Animated.View style={[styles.content, { height: heighInterpolation }]}>
                <Text style={styles.contentText}>{content.header}</Text>
                <Text style={{ color: '#bdbbbb', }}>{content.body}</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#343845',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#343845',
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white'
    },
    contentText: {
        color: '#bdbbbb',
        fontWeight: 'bold',
        fontSize: 15
    },
    content: {
        overflow: 'hidden',
        // padding: 10
    },
    iconStyle: {
        position: 'absolute',
        right: 10
    },
    expandedStyles: {
        borderWidth: 1,
        borderColor: '#4e8bf5',
    }
})