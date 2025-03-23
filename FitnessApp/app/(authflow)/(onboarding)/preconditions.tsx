import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Footer from '@/components/onboarding/footer';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

export default function PreExistingConditionForm() {
  const [hasCondition, setHasCondition] = useState<boolean | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string>('');

  const conditions = [
    'Diabetes',
    'Asthma',
    'Blood Pressure',
    'Cancer',
    'Arthritis',
    'Depression',
    'Heart Disease',
  ];

  const handleNext = () => {
    router.push('/(authflow)/(onboarding)/muscleGoal');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Health Information</Text>
            <Text style={styles.question}>Do you have any pre-existing condition?</Text>

            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setHasCondition(true)}
              >
                <View style={[styles.circle, hasCondition === true && styles.selectedCircle]} />
                <Text style={styles.radioText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  setHasCondition(false);
                  setSelectedCondition('');
                }}
              >
                <View style={[styles.circle, hasCondition === false && styles.selectedCircle]} />
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>

            {hasCondition === true && (
              <View style={styles.dropdownContainer}>
                <Text style={styles.instruction}>If yes, please select your condition:</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={selectedCondition}
                    onValueChange={(itemValue: string) => setSelectedCondition(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select condition..." value="" />
                    {conditions.map((condition, index) => (
                      <Picker.Item key={index} label={condition} value={condition} />
                    ))}
                  </Picker>
                </View>
                <Text style={styles.disclaimer}>
                  This information helps us customize your fitness plan for safety and effectiveness.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Footer handleSubmit={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');
const { text, page } = Colors
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: page.backgroundColor,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: text.PrimaryColor,
  },
  question: {
    fontSize: 20,
    marginBottom: 24,
    color: text.PrimaryColor,
    fontWeight: '500',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4A90E2',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#4A90E2',
  },
  radioText: {
    fontSize: 18,
    color: '#333',
  },
  dropdownContainer: {
    marginTop: 24,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  instruction: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
    fontWeight: '500',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  footerContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
});
