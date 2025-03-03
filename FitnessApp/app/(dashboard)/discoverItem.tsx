import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';


/**
 * DiscoverDetail Component
 * 
 * Renders the discover item detail screen.
 * Features:
 * - Displays the title and description of the discover item.
 * - Shows a "Feature Coming Soon" message.
 * - Provides a button to navigate back to the previous screen.
 * 
 * @returns {JSX.Element} Discover item detail screen UI
 */
const DiscoverDetail = () => {
  const router = useRouter();
  const { title, description } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Feature Coming Soon</Text>
      <Text style={styles.description}>{description}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

export default DiscoverDetail;

const { page, text } = Colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: page.backgroundColor,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: text.PrimaryColor,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: text.SecondaryColor,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: text.PrimaryColor,
    textAlign: 'center',
    marginBottom: 20,
  },
});