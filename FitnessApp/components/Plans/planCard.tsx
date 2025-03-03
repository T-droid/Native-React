import { Pressable, StyleSheet, Text, View } from "react-native";
import { FitnessPlan } from "@/types";
import { Image } from 'expo-image';
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";
import { StorageManager } from "@/engine/storage";
import Colors from "@/constants/Colors";

type Props = {
  plan: FitnessPlan;
  refresh: () => void;
}

/**
 * Handles the action of opting into a fitness plan.
 * 
 * Steps:
 * 1. Checks if the plan exists.
 * 2. Updates the plan's opt-in status to true using the StorageManager.
 * 3. If successful, calls the refresh function to update the UI.
 * 4. Logs any errors that occur during the process.
 * 
 * @returns {Promise<void>}
 */
const PlanCard = ({ plan, refresh}: Props) => {
  const chosePlan = async () => {
          if (plan) {
              try {
                  const success = await StorageManager.updatePlanOptIn(plan.id, true);
                  if (success) {
                      refresh();
                  }
              } catch (err) {
                  console.log(`error updating plan ${err}`);
              }
          }
      };
  return (
    <View style={styles.card}>
      <Image source={plan.image} style={styles.image} />
      <View style={styles.cardFooter}>
        <Text style={[styles.textColor, { fontSize: 15, fontWeight: 'bold' }]}>{plan.title}</Text>
        <View style={styles.cardFooterBody}>
          <Text style={styles.textColor}>{plan.duration}</Text>
          <Octicons name="dot-fill" size={10} color={'#bdbbbb'} />
          <Text style={styles.textColor}>{plan.frequency}</Text>
        </View>
      </View>
      {!plan.optIn ? (
        <Pressable
        style={styles.button}
        onPress={chosePlan}
        >
          <Text style={{ textAlign: 'center', color: 'white'}}>Opt In</Text>
        </Pressable>
      ) : (
        <Pressable
        style={styles.button}
        onPress={() => router.push({ pathname: '/planDetails', params: { plan: JSON.stringify(plan)}})}>
          <Text style={{ textAlign: 'center', color: 'white'}}>View Details</Text>
        </Pressable>
      )}      
    </View>
  );
};

export default PlanCard;

const { ButtonColor } = Colors
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#343845',
    marginVertical: 5,
    borderTopEndRadius: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopEndRadius: 10,
  },
  textColor: {
    color: '#bdbbbb'
  },
  cardFooter: {
    padding: 10
  },
  cardFooterBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  button: {
    padding: 10,
    backgroundColor: ButtonColor,
    borderBottomEndRadius: 10
  }
});