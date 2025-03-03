import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, Link } from "expo-router";
import Colors from "@/constants/Colors";

/**
 * Footer Component
 * 
 * Renders the footer for the onboarding screens.
 * Features:
 * - Displays a back button that navigates to the previous screen.
 * - Displays a next button that triggers the handleSubmit function.
 * - Conditionally disables the next button if the condition is not met.
 * 
 * @param {Object} props - The properties for the footer component.
 * @param {() => void} props.handleSubmit - The function to call when the next button is pressed.
 * @param {boolean} [props.condition=true] - The condition to determine if the next button should be enabled.
 * @returns {JSX.Element} The footer UI.
 */
export default function Footer({ handleSubmit, condition=true }: { handleSubmit: () => void; condition?: boolean; }) {
  return (
    <View style={styles.footer}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={ButtonColor} />
        </Pressable>
        
        {condition ? (
          <Pressable style={styles.nextBtn} onPress={handleSubmit}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Next</Text>
          </Pressable>          
        ) : (
          <Pressable style={[styles.nextBtn, { backgroundColor: '#29324d' }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#666' }}>
              Select at least 3 options
            </Text>
          </Pressable>
        )}
      </View>
  );
}

const { ButtonColor, BackBtnColor, footerBackgroundColor } = Colors;

const styles = StyleSheet.create({
    footer: {
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: footerBackgroundColor,
        justifyContent: 'center',
        paddingVertical: 20,
        alignSelf: 'stretch',
        height: 100
    },
    nextBtn: {
        backgroundColor: ButtonColor,
        borderRadius: 20,
        paddingVertical: 10,
        width: 250,
        alignItems: 'center'
    },
        backBtn: {
        backgroundColor: BackBtnColor,
        width: 50,
        height: 50,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
})