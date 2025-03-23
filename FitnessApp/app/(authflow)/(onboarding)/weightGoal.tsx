import { useState } from "react";
import { FlatList, Pressable, StatusBar, StyleSheet, Text, View, Image, TextInput, } from "react-native";
import { Checkbox } from 'react-native-paper';
import { router } from "expo-router";
import Footer from "@/components/onboarding/footer";
import Colors from "@/constants/Colors";

type Data = {
  id: string;
  name: string;
  checked: boolean;
};

const data: Data[] = [
  {
    id: "1",
    name: "Lose Weight",
    checked: false
  },
  {
    id: "2",
    name: "Maintain Weight",
    checked: false
  },
  {
    id: "3",
    name: "Gain Weight",
    checked: false
  },
  {
    id: "4",
    name: "Gain Muscle",
    checked: false
  },
  {
    id: "5",
    name: "Modify My Diet",
    checked: false
  },
  {
    id: "6",
    name: "Manage Stress",
    checked: false
  },
  {
    id: "7",
    name: "Increase My Step Count",
    checked: false
  }
]

/**
 * WeightGoal Component
 * 
 * Renders the weight goal selection screen.
 * Features:
 * - Weight goal selection using checkboxes.
 * - Form submission with validation.
 * 
 * @returns {JSX.Element} Weight goal selection screen UI
 */
export default function WeightGoal() {
  const [items, setItems] = useState<Data[]>(data);
  const [canProceed, setCanProceed] = useState(false);

  /**
   * Handles the toggle of the checkbox for selecting a weight goal.
   * 
   * Steps:
   * 1. Maps through the items and updates the checked state based on the selected id.
   * 2. Counts the number of selected items.
   * 3. Sets the canProceed state based on the number of selected items.
   * 4. Sets the updated items state.
   * 
   * @param {string} id - The id of the selected weight goal.
   * @returns {void}
   */
  const handleCheckBoxToggle = (id: string) => {
    const updatedItems = items.map((item) => 
      item.id === id ? {...item, checked: !item.checked } : item
    );
    const selectedCount = updatedItems.filter(item => item.checked).length;
    setCanProceed(selectedCount >= 3);
    setItems(updatedItems);
    setItems(updatedItems);
  }

  /**
   * Handles the form submission.
   * 
   * Steps:
   * 1. Navigates to the next screen.
   * 
   * @returns {void}
   */
  const handleSubmit = (): void => {
    router.push('/(authflow)/(onboarding)/preconditions');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Goals</Text>
      <View style={styles.body}>
      <Text style={{ color: text.SecondaryColor, fontSize: 25, fontWeight: 'bold' }}>Let's start with goals.</Text>
      <Text style={{ color: text.PrimaryColor, fontSize: 15 }}>Select up to 3 that are important to you, including one weight goal</Text>
      <View>
        <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.checked ? { borderWidth: 2, borderColor: text.appThemeTextColor }: null]}>
            <Text style={{ color: text.SecondaryColor, fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
            <Checkbox
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => handleCheckBoxToggle(item.id)}
            color="#3a85f0"
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        contentContainerStyle={{ paddingBottom: 60 }}
        />
      </View>      
      </View>
      <Footer handleSubmit={handleSubmit} condition={canProceed} />
    </View>
  );
}

const { text, page, Card } = Colors;

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
  },
})
