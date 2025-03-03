import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Pressable, StatusBar, StyleSheet, Text, View, Image, TextInput, } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import Footer from "@/components/onboarding/footer";

type Data = {
  id: string;
  name: string;
}
const data: Data[] = [
  { id: "1", name: "Lesotho" },
  { id: "2", name: "Cameroon" },
  { id: "3", name: "Eswatini" },
  { id: "4", name: "Kenya" },
  { id: "5", name: "São Tomé and Príncipe" },
  { id: "6", name: "Chad" },
  { id: "7", name: "Comoros" },
  { id: "8", name: "Cabo Verde" },
  { id: "9", name: "Mauritius" }
]

/**
 * Gender Component
 * 
 * Renders the gender selection screen.
 * Features:
 * - Gender selection using radio buttons.
 * - Age input with validation.
 * - Country selection using a dropdown.
 * - Form submission with validation.
 * 
 * @returns {JSX.Element} Gender selection screen UI
 */
export default function Gender() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("0");
  const [isFocus, setIsFocus] = useState(false);
  const [textFocus, setTextFocus] = useState(false);
  const [country, setCountry] = useState("");
  const [items, setItems] = useState(data);

  /**
 * finishOnboarding Function
 * Handles the completion of the onboarding process by:
 * 1. Generating a random calorie goal between 2000-3000
 * 2. Storing onboarding completion status in AsyncStorage
 * 3. Storing the generated calorie goal in AsyncStorage
 * 4. Navigating to the signup screen
 * @returns {Promise<void>}
 */
  const validateInputs = () => {
    if (!gender) {
      alert("Please select your gender");
      return false;
    }

    const ageNum = parseInt(age);
    if (!age || ageNum <= 0 || ageNum > 120) {
      alert("Please enter a valid age between 1-120");
      return false;
    }

    if (!country) {
      alert("Please select your country");
      return false;
    }

    return true;
  }

  /**
 * finishOnboarding Function
 * Handles the completion of the onboarding process by:
 * 1. Generating a random calorie goal between 2000-3000
 * 2. Storing onboarding completion status in AsyncStorage
 * 3. Storing the generated calorie goal in AsyncStorage
 * 4. Navigating to the signup screen
 * @returns {Promise<void>}
 */
  const handleSubmit = () => {
    if (validateInputs()) {
      router.push('/(authflow)/(onboarding)/moreQuestions');
    }
  }

  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.header}>You</Text>
      <View style={styles.body}>
      <Text style={{ color: text.SecondaryColor, fontSize: 25, fontWeight: 'bold' }}>Tell us a little bit about yourself</Text>
      
      <View>
        <Text style={{ color: text.PrimaryColor, fontSize: 15 }}>Please select which sex we should use to calculate your calories.</Text>
        <View style={styles.genderContainer}>
          <View style={[styles.genderStyles, gender === 'Male' ? { borderWidth: 2, borderColor: text.appThemeTextColor } : null]}>
            <Text style={{ color: text.SecondaryColor, fontWeight: 'bold', fontSize: 20}}>Male</Text>
            <RadioButton
            value="Male"
            status={gender === "Male" ? 'checked' : 'unchecked'}
            onPress={() => setGender("Male")}
            />
          </View>
          <View style={[styles.genderStyles, gender === 'Female' ? { borderWidth: 2, borderColor: text.appThemeTextColor } : null]}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20}}>Female</Text>
            <RadioButton
            value="Female"
            status={gender === "Female" ? 'checked' : 'unchecked'}
            onPress={() => setGender("Female")}
            />
          </View>
        </View>
        <View>
          <Text style={{ color: text.PrimaryColor, fontSize: 15 }}>How old are you</Text>
          <TextInput
          style={[styles.textInputStyles, textFocus ? { borderWidth: 2, borderColor: text.appThemeTextColor } : { borderColor: InputBorderColor }]}
          keyboardType='numeric'
          value={age}
          onChangeText={(text) => setAge(text)}
          onFocus={() => setTextFocus(true)}
          onBlur={() => setTextFocus(false)}
          />
          <Text style={{ color: text.PrimaryColor, fontSize: 12 }}>We use sex at birth and age to calculate an accurate goal for you</Text>
        </View>
        <View>
          <Text style={{ color: text.PrimaryColor, fontSize: 15 }}>Where do you live</Text>
          <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: text.appThemeTextColor}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={items}
          search          
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder="Select Country"
          searchPlaceholder="Search..."
          value={country}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCountry(item.id);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
            style={{ marginRight: 5 }}
            color={isFocus ? text.appThemeTextColor: InputBorderColor }
            name="Safety"
            size={20}
            />
          )}
          />
        </View>
      </View>      
      </View>
      <Footer handleSubmit={handleSubmit} />
    </View>
    </TouchableWithoutFeedback>
  );
}

const { page, text, InputBorderColor, Card } = Colors;

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
  genderContainer: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    marginVertical: 10
  },
  genderStyles: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: Card.backgroundColor,
    padding: 10,
    borderRadius: 10
  },
  textInputStyles: {
    borderWidth: .5,
    borderRadius: 10,
    borderColor: InputBorderColor,
    height: 50,
    color: text.SecondaryColor
  },
  dropdown: {
    height: 50,
    borderColor: InputBorderColor,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    color: text.PrimaryColor,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: text.SecondaryColor
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
})
