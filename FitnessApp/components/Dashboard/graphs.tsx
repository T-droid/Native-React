import { StyleSheet, View } from "react-native";

export default function GraphCard() {
    return <View style={styles.card}></View>
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#343845',
        borderRadius: 10,
        padding: 20,
        width: '98%',
        height: 200
    }
})