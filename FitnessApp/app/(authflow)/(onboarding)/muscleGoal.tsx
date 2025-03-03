import { useState } from "react";
import { FlatList, Pressable, StatusBar, StyleSheet, Text, View, Image, TextInput, } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import Footer from "@/components/onboarding/footer";

type Data = {
  id: string;
  name: string;
  description: string;
  checked: boolean;
};

const data: Data[] = [
  {
    id: "1",
    name: "Tone up",
    description: "you want visible muscle with as little as possible, with a low body fat percentage",
    checked: false
  },
  {
    id: "2",
    name: "Bulk up",
    description: "you want large, well-defined muscles, with a low percentage of body fat",
    checked: false
  },
  {
    id: "3",
    name: "Get strong",
    description: "you want to lift the maximum amount of weight and are not concerned with body fat or muscle definition",
    checked: false
  }
]

/**
 * MuscleGoal Component
 * 
 * Renders the muscle goal selection screen.
 * Features:
 * - Muscle goal selection using radio buttons.
 * - Form submission with validation.
 * 
 * @returns {JSX.Element} Muscle goal selection screen UI
 */
export default function MuscleGoal() {
  const [items, setItems] = useState<Data[]>(data);
  const [error, setError] = useState<boolean>(false);

  /**
   * Handles the form submission.
   * 
   * Steps:
   * 1. Checks if a muscle goal is selected.
   * 2. If no goal is selected, sets an error state.
   * 3. If a goal is selected, navigates to the next screen.
   * 
   * @returns {void}
   */
  const handleNext = () => {
    const hasSelection = items.some(item => item.checked)
    if (!hasSelection) {
      setError(true)
      return
    }
    router.push('/(authflow)/(onboarding)/gender')
  }

  /**
 * Handles the toggle of the radio button for selecting a muscle goal.
 * 
 * Steps:
 * 1. Maps through the items and updates the checked state based on the selected id.
 * 2. Sets the updated items state.
 * 
 * @param {string} id - The id of the selected muscle goal.
 * @returns {void}
 */
  const handleRadioBoxToggle = (id: string) => {
    const updatedItems = items.map((item) => ({
      ...item, checked: item.id === id
    }));
    setItems(updatedItems)
  }  
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Goals</Text>
      <View style={styles.body}>
      <Text style={{ color: text.SecondaryColor, fontSize: 25, fontWeight: 'bold' }}>What results do you want to achieve from gaining muscle?</Text>
      <Text style={{ color: text.PrimaryColor, fontSize: 15 }}>Select one.</Text>
      {error && (
        <Text style={{ color: '#ff4444', fontSize: 15, marginTop: 5 }}>
          Please select a muscle goal to continue
        </Text>
      )}
      <View>
        <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.checked ? { borderWidth: 2, borderColor: text.appThemeTextColor }: null]}>
            <View style={{ width: '80%'}}>
            <Text style={{ color: text.SecondaryColor, fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
            <Text style={{ color: text.PrimaryColor, fontSize: 15 }}>{item.description}</Text>
            </View>                        
            <RadioButton.Android
            value={item.id}
            status={item.checked ? 'checked': 'unchecked'}

            onPress={() => handleRadioBoxToggle(item.id)}
            color="#3a85f0"
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        contentContainerStyle={{ paddingBottom: 60 }}
        />
      </View>      
      </View>
      <Footer handleSubmit={handleNext} />
    </View>
  );
}

const { page, text, Card } = Colors;

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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Card.backgroundColor,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10
  }
})
