import { Modal, View, Text, Pressable, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { PropsWithChildren, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";


type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;


/**
 * EditProfile Component
 * 
 * Renders the edit profile modal.
 * Features:
 * - Displays a modal with a title and close button.
 * - Shows the children components passed to it.
 * 
 * @param {Props} props - The properties for the edit profile modal.
 * @param {boolean} props.isVisible - Whether the modal is visible.
 * @param {() => void} props.onClose - The function to call when the modal is closed.
 * @param {React.ReactNode} props.children - The children components to display inside the modal.
 * @returns {JSX.Element} The edit profile modal UI.
 */
export default function EditProfile({ isVisible, children, onClose }: Props) {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Edit Profile</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color='#fff' size={22} />
                    </Pressable>
                </View>
                {children}                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        height: '85%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: 40,
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16
    },
})