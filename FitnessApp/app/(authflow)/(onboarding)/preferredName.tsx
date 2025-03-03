import { Pressable, StatusBar, StyleSheet, Text, View, Image, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/Colors";
import Footer from "@/components/onboarding/footer";


/**
 * preferredName Component
 * 
 * Renders the preferred name input screen.
 * Features:
 * - Input field for preferred name.
 * - Validation for the input field.
 * - Form submission with validation.
 * 
 * @returns {JSX.Element} Preferred name input screen UI
 */
export default function preferredName() {
  const [name, setName] = useState<string>("");
  const [valid, setValid] = useState<boolean>(true);
  const [initialMount, setInitialMount] = useState<boolean>(true)
  
  /**
   * useEffect Hook
   * 
   * Runs when the component mounts and when the name state changes.
   * 
   * Steps:
   * 1. Checks if the component is in its initial mount.
   * 2. If not, validates the input.
   * 
   * @returns {void}
   */
  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }
    validateInput();
  }, [name]);

  /**
   * Validates the user input for the preferred name.
   * 
   * Steps:
   * 1. Checks if the name is not empty.
   * 2. Sets the valid state based on the input.
   * 
   * @returns {boolean} - Returns true if the input is valid, otherwise false.
   */
  const validateInput = () => {
    if (!name) {
      setValid(false);
      return false;
    }
    setValid(true);
    return true;
  }

  /**
   * Handles the form submission.
   * 
   * Steps:
   * 1. Validates the user input using validateInput function.
   * 2. If input is valid, stores the name in AsyncStorage.
   * 3. Navigates to the next screen.
   * 
   * @returns {Promise<void>}
   */
  const handleSubmit = async () => {
    if (validateInput()) {
      await AsyncStorage.setItem("name", name);
      router.push('/(authflow)/(onboarding)/weightGoal');
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <View style={styles.body}>
        <Text style={{ color: text.SecondaryColor, fontSize: 25, fontWeight: 'bold' }}>First, what can we call you</Text>
        <Text style={{ color: text.PrimaryColor, fontSize: 20, fontWeight: 'bold' }}>We'd like to get to know you</Text>
        <View style={styles.inputContainer}>
          <Text style={{ color: text.PrimaryColor, fontSize: 20, fontWeight: 'bold' }}>Preferred name</Text>
          <TextInput 
            style={[styles.input, !valid ? { borderColor: 'red' } : null ]}
            value={name}
            onChangeText={setName}
            />
          {!valid && <Text style={styles.validateTextStyle}>Name is required</Text>}
        </View>
      </View>
      <Footer handleSubmit={handleSubmit} />
    </View>
  );
}

const { page, text, InputBorderColor } = Colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: page.backgroundColor,
    paddingTop: StatusBar.currentHeight,
    gap: 10
  },
  header: {
    color: text.SecondaryColor,
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingHorizontal: 20
  },
  body: {
    padding: 14,
    height: 560
  },
  inputContainer: {
    marginTop: 35,
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: InputBorderColor,
    height: 60,
    color: text.PrimaryColor,
    fontSize: 20
  },  
  validateTextStyle: {
    position: 'absolute',
    top: 105,
    color: 'red',
    fontSize: 10
  }
})
