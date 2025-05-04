import { Link } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';


export default function Home() {
  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <Text className='font-bold text-lg my-10'>Welcome to Restate</Text>
     <Link href='/sign-in'>sign in</Link>
     <Link href='/explore'>Explore</Link>
     <Link href='/profile'>Profile</Link>
     <Link href='/properties/1'>Property</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
