import { router } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button, Pressable } from "react-native";
import React, { useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import { useDiary } from "@/Context/diaryContext";
import { Food } from "@/Context/diaryContext";
import Colors from "@/constants/Colors";

/**
 * AddItem Component
 * 
 * Renders the add item screen.
 * Features:
 * - Displays an input field for entering the value.
 * - Allows the user to save or cancel the action.
 * 
 * @returns {JSX.Element} Add item screen UI
 */
export default function AddItem() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const { updateDiary } = useDiary();
  const [value, setValue] = useState("");

  /**
   * Handles the save action.
   * 
   * Steps:
   * 1. Parses the entered value to a numeric value.
   * 2. If the value is a valid number, updates the diary using the updateDiary function.
   * 3. Navigates back to the previous screen.
   * 
   * @returns {void}
   */
  const handleSave = () => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      updateDiary(date as string, name === 'Exercise' ? 'Exercise' : 'food', name === 'Exercise' ? null : (name as keyof Food), numericValue);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Text style={styles.title}>Add {name}<Text style={{ color: 'gray', fontSize: 15 }}>(Calories per food)</Text></Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
      <Pressable style={styles.Btn} onPress={value ? handleSave : () => router.back()}>
        <Text style={{ color: 'white'}}>{value ? `Save` : `Cancel`}</Text>
      </Pressable>
      </View>
    </View>
  );
}

const { ButtonColor, page, text} = Colors;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: page.backgroundColor,
    },
    inputContainer: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: text.PrimaryColor,
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: text.appThemeTextColor,
      textAlign: 'center'
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
      marginBottom: 20,
    },
    Btn: {
      backgroundColor: ButtonColor,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      gap: 2,
      borderRadius: 50,
      marginTop: 20
    },
  });