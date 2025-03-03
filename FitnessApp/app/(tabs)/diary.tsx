import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { useDiary, Food } from "@/Context/diaryContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CaloryCalculatorProps = {
  goal: number;
  food: number;
  exercise: number;
};


/**
 * TabLayout Component
 * 
 * Defines the layout for the tab navigation screens.
 * Features:
 * - Uses the Tabs component from expo-router to manage the tab navigation.
 * - Configures the tab bar style and icons for each screen.
 * 
 * @returns {JSX.Element} The layout for the tab navigation screens.
 */
function CaloryCalculator({ goal, food, exercise }: CaloryCalculatorProps) {
  const remaining = goal - (food + exercise);
  return (
    <View style={styles.calculatorContainer}>
      <Text style={[styles.textColor, { fontSize: 17, fontWeight: 'bold' }]}>Calories Remaining</Text>
      <View style={styles.calculatorCard}>
        <View>
          <Text style={styles.textColor}>{goal}</Text>
          <Text style={styles.textColor}>Goal</Text>
        </View>
        <Text style={styles.textColor}>-</Text>
        <View>
          <Text style={styles.textColor}>{food}</Text>
          <Text style={styles.textColor}>Food</Text>
        </View>
        <Text style={styles.textColor}>+</Text>
        <View>
          <Text style={styles.textColor}>{exercise}</Text>
          <Text style={styles.textColor}>Exercise</Text>
        </View>
        <Text style={styles.textColor}>=</Text>
        <View>
          <Text style={styles.textColor}>{remaining}</Text>
          <Text style={styles.textColor}>Remaining</Text>
        </View>
      </View>
    </View>
  );
}

type Props = {
  name: string;
  date: string;
  isReadOnly?: boolean;
};


/**
 * AddItemCard Component
 * 
 * Displays an item card for adding food or exercise entries.
 * 
 * @param {string} name - The name of the item (e.g., Breakfast, Lunch, Exercise).
 * @param {string} date - The date for which the entry is being added.
 * @param {boolean} isReadOnly - Whether the card is in read-only mode.
 * @returns {JSX.Element} The add item card UI.
 */
function AddItemCard({ name, date, isReadOnly }: Props) {
  const { diary } = useDiary();
  const dateKey = date;
  const itemValue = name === 'Exercise' ? diary[dateKey]?.Exercise : (diary[dateKey]?.food[name as keyof Food] || 0);

  const handleAddItem = () => {
    router.push(`/addItem?name=${name}&date=${date}`);
  };

  return (
    <View style={styles.addItemCard}>
      <View style={[styles.itemCard, { paddingVertical: 10 }]}>
        <Text style={styles.textColor}>{name}</Text>
        <Text style={styles.textColor}>{itemValue}</Text>
      </View>
      <Pressable style={[styles.itemCard, styles.separatorStyle]} disabled={isReadOnly} onPress={handleAddItem}>
        <Text style={{
          color: Colors.headerTextColor,
          fontSize: 15,
          fontWeight: 'bold',
          opacity: isReadOnly ? 0.5 : 1
        }}>{name === 'Exercise' ? 'ADD EXERCISE' : name === 'Water' ? 'ADD WATER' : 'ADD FOOD'}
        </Text>
        <Text style={[styles.textColor, { opacity: isReadOnly ? 0.5 : 1 }]}>?</Text>
      </Pressable>
    </View>
  );
}


/**
 * MealLogger Component
 * 
 * Renders the meal logger screen.
 * Features:
 * - Displays the selected date and allows navigation between dates.
 * - Shows the calorie calculator and item cards for adding food and exercise entries.
 * - Allows the user to complete the diary for the selected date.
 * 
 * @returns {JSX.Element} Meal logger screen UI.
 */
export default function MealLogger() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [goal, setGoal] = useState(2830);
  const { diary, saveDiaryEntry } = useDiary();
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    if (selectedDate.toDateString() === new Date().toDateString()) {
      setIsReadOnly(false);
    }
    else setIsReadOnly(true);
    const getGoal = async () => {
      const goal = await AsyncStorage.getItem("goal");
      if (goal) {
        setGoal(parseInt(goal));
      }
    };
    getGoal();
  }, [selectedDate]);

  const formattedDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    const dateDifference = (selected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (dateDifference === 0) return "Today";
    if (dateDifference === 1) return "Tomorrow";
    if (dateDifference === -1) return "Yesterday";

    return selected.toDateString();
  };

  const changeDate = (days: number) => {
    setSelectedDate((prev) => new Date(prev.setDate(prev.getDate() + days)));
  };

  const dateKey = selectedDate.toISOString().split('T')[0];
  const { food = { Breakfast: 0, Lunch: 0, Dinner: 0, Snacks: 0, Water: 0 }, Exercise = 0 } = diary[dateKey] || {};

  const totalFood = Object.values(food).reduce((acc, curr) => acc + curr, 0);

  const handleCompleteDiary = () => {
    saveDiaryEntry(dateKey);
    setIsReadOnly(true);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.dateContainer}>
          <Pressable onPress={() => changeDate(-1)}>
            <FontAwesome name="angle-left" size={25} color={'#bdbbbb'} />
          </Pressable>
          <Text style={styles.dateText}>{formattedDate()}</Text>
          <Pressable onPress={() => changeDate(1)}>
            <FontAwesome name="angle-right" size={25} color={'#bdbbbb'} />
          </Pressable>
        </View>
        <CaloryCalculator goal={goal} food={totalFood} exercise={Exercise} />

        <AddItemCard name="Breakfast" date={dateKey} isReadOnly={isReadOnly} />
        <AddItemCard name="Lunch" date={dateKey} isReadOnly={isReadOnly} />
        <AddItemCard name="Dinner" date={dateKey} isReadOnly={isReadOnly} />
        <AddItemCard name="Snacks" date={dateKey} isReadOnly={isReadOnly} />
        <AddItemCard name="Exercise" date={dateKey} isReadOnly={isReadOnly} />
        <AddItemCard name="Water" date={dateKey} isReadOnly={isReadOnly} />

        <Pressable style={[styles.completeBtn, { opacity: isReadOnly ? 0.5 : 1 }]} onPress={handleCompleteDiary} disabled={isReadOnly}>
          <MaterialCommunityIcons name="content-save-check" size={25} color={'white'} />
          <Text style={{ color: text.SecondaryColor }}>Complete Diary</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const { text, Card, page, ButtonColor } = Colors;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: page.backgroundColor,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  dateText: {
    color: text.PrimaryColor,
    fontSize: 18,
    fontWeight: "bold"
  },
  label: {
    color: text.PrimaryColor,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10
  },
  calculatorContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#7e8182',
    paddingVertical: 10,
    marginBottom: 20
  },
  calculatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  addItemCard: {
    backgroundColor: Card.backgroundColor,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separatorStyle: {
    borderTopWidth: 1,
    borderTopColor: text.PrimaryColor,
    paddingVertical: 10
  },
  completeBtn: {
    backgroundColor: ButtonColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    gap: 2,
    borderRadius: 50,
    marginTop: 20
  },
  textColor: {
    color: text.PrimaryColor
  },
});