import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View className={styles.container}>
      <Text className={styles.text}>Hello, world!</Text>
      <Link href={'/sign-in'}>Sign in</Link>
      <Link href={'/explore'}>Explore</Link>
      <Link href={'/profile'}>Profile</Link>
      <Link href={'/properties/1'}>Property</Link>
    </View>
  );
}

const styles = {
  container: `bg-gray-100 flex-1 justify-center items-center`,
  text: `text-2xl text-center text-gray-800`,
};
