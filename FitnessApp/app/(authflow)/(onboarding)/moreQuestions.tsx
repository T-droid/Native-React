import { useState, useMemo } from "react";
import { TouchableWithoutFeedback, Keyboard, Pressable, StatusBar, StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import Footer from "@/components/onboarding/footer";


/**
 * MoreQuestions Component
 * 
 * Renders the more questions screen.
 * Features:
 * - Input fields for height, current weight, and weight goal.
 * - Validation for each input field.
 * - Form submission with validation.
 * 
 * @returns {JSX.Element} More questions screen UI
 */
export default function MoreQuestions() {
  const [height, setHeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [weightGoal, setWeightGoal] = useState('');
  const [touched, setTouched] = useState({
    height: false,
    currentWeight: false,
    weightGoal: false
  });

  /**
   * Validates the user inputs for height, current weight, and weight goal.
   * 
   * @returns {Object} - An object containing boolean values indicating the validity of each input.
   */
  const isValid = useMemo(() => ({
    height: height.length > 0 && Number(height) > 0 && Number(height) < 300,
    currentWeight: currentWeight.length > 0 && Number(currentWeight) > 0 && Number(currentWeight) < 500,
    weightGoal: weightGoal.length > 0 && Number(weightGoal) > 0 && Number(weightGoal) < 500
  }), [height, currentWeight, weightGoal]);


  const isFormValid = isValid.height && isValid.currentWeight && isValid.weightGoal;

  /**
   * Handles the blur event for input fields.
   * 
   * @param {string} field - The name of the field that lost focus.
   * @returns {void}
   */
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  /**
 * Handles the form submission.
 * 
 * Steps:
 * 1. Validates the user inputs using isFormValid.
 * 2. If inputs are valid, navigates to the next screen.
 * 
 * @returns {void}
 */
  const handleSubmit = () => {
    if (isFormValid) {
      router.push('/(authflow)/(onboarding)/done');
    }
  }


  /**
 * InputField Component
 * 
 * Renders an input field with a label and unit.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.value - The value of the input field.
 * @param {function} props.onChangeText - The function to call when the input value changes.
 * @param {string} props.unit - The unit to display next to the input field.
 * @param {string} props.field - The name of the field (height, currentWeight, weightGoal).
 * 
 * @returns {JSX.Element} The rendered input field component.
 */
  const InputField = ({ label, value, onChangeText, unit, field }: { label: string; value: string; onChangeText: (text: string) => void; unit: string; field: 'height' | 'currentWeight' | 'weightGoal' }) => {
    const [textFocus, setTextFocus] = useState(false);

    return (
      <View style={styles.inputContainer}>
        <Text style={{ color: text.PrimaryColor, fontSize: 15 }}>{label}</Text>
        <View style={styles.inputField}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={text.SecondaryColor}
            style={[
              styles.textInputStyles,
              textFocus ? { borderWidth: 2, borderColor: text.appThemeTextColor } : { borderColor: InputBorderColor },
              touched[field] && !isValid[field] ? { borderColor: 'red' } : null
            ]}
            keyboardType="numeric"
            onFocus={() => setTextFocus(true)}
            onBlur={() => {
              setTextFocus(false);
              handleBlur(field);
            }}
          />
          <View style={styles.inputTextContainer}>
            <Text style={{ fontWeight: 'bold', color: text.SecondaryColor, fontSize: 20 }}>{unit}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>You</Text>
        <View style={styles.body}>
          <Text style={{ color: text.SecondaryColor, fontSize: 25, fontWeight: 'bold' }}>Just a few more questions</Text>
          <InputField
            label="How tall are you"
            value={height}
            onChangeText={setHeight}
            unit="cm"
            field="height"
          />
          <InputField
            label="How much do you weigh"
            value={currentWeight}
            onChangeText={setCurrentWeight}
            unit="kg"
            field="currentWeight"
          />
          <InputField
            label="What is your weight goal"
            value={weightGoal}
            onChangeText={setWeightGoal}
            unit="kg"
            field="weightGoal"
          />
        </View>
        <Footer handleSubmit={handleSubmit} />
      </View>
    </TouchableWithoutFeedback>
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
    flex: 1
  },
  inputContainer: {
    marginVertical: 10,
    gap: 7
  },
  inputField: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  inputTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  textInputStyles: {
    borderWidth: .5,
    borderRadius: 10,
    borderColor: InputBorderColor,
    height: 50,
    width: '75%',
    color: text.SecondaryColor
  },
  footer: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f162e',
    justifyContent: 'center',
    paddingVertical: 20,
    alignSelf: 'stretch',
    height: 100
  },
  nextBtn: {
    backgroundColor: '#3a85f0',
    borderRadius: 20,
    paddingVertical: 10,
    width: 250,
    alignItems: 'center'
  },
  backBtn: {
    backgroundColor: '#29324d',
    width: 50,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});