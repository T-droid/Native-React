import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';

const Property = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Property {id}</Text>
    </View>
  )
}

export default Property