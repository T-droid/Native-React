/**
 * CongratulationsScreen Component
 * Displays the completion screen of the onboarding process showing personalized calorie targets
 * @returns React component displaying congratulations message and calorie goal
 */
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * finishOnboarding Function
 * Handles the completion of the onboarding process by:
 * 1. Generating a random calorie goal between 2000-3000(represents and api call for calory determiner)
 * 2. Storing onboarding completion status in AsyncStorage
 * 3. Storing the generated calorie goal in AsyncStorage
 * 4. Navigating to the signup screen
 * @returns {Promise<void>}
 */
export default function CongratulationsScreen() {
  let caloriesToCut = 2830;

  const finishOnboarding = async () => {
    caloriesToCut = Math.random() * 1000 + 2000;
    await AsyncStorage.setItem("onboardingComplete", "true");
    await AsyncStorage.setItem("goal", caloriesToCut.toString());
    router.push('/(authflow)/(onboarding)/signup')
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: false 
      }} />
      
      <View style={styles.content}>
        <FontAwesome name="star" size={80} color="#FFD700" />
        
        <Text style={styles.title}>Congratulations!</Text>
        
        <Text style={styles.subtitle}>
          Your personalized plan is ready
        </Text>
        
        <View style={styles.calorieCard}>
          <Text style={styles.calorieTitle}>Calorie Target</Text>
          <Text style={styles.calorieValue}>
            {caloriesToCut} calories to cut
          </Text>
        </View>
        
        <Text style={styles.message}>
          Follow your personalized plan to achieve your goals!
        </Text>
      </View>

      <Pressable
        style={styles.nextBtn}
        onPress={() => finishOnboarding()}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#bd6333' }}>Next</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bd6333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  calorieCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
  },
  calorieTitle: {
    fontSize: 16,
    color: '#666',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  nextBtn: {
    backgroundColor: '#0c2eed',
    borderRadius: 20,
    paddingVertical: 10,
    width: 250,
    alignItems: 'center',
    left: 50,
    bottom: 50
  }
});
