import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import icons from '@/constants/icons';
import images from '@/constants/images';
import { login } from '@/lib/appwrite';

const SignIn = () => {
  const handleLogin = async () => {
    const result = await login();

    if (result) {
      console.log('Login Success');
    } else {
      Alert.alert('Error', 'Failed to login');
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} className="h-4/6 w-full" resizeMode="contain" />
        <View className="px-10">
          <Text className="font-rubik text-black-200 text-center text-base uppercase">
            Welcome to Restate
          </Text>
          <Text className="font-rubik-bold text-black-300 mt-2 text-center text-2xl">
            Let's Get You Closer to {'\n'}
            <Text className="text-primary-300">Your Dream Home</Text>
          </Text>
          <Text className="font-rubik text-black-200 mt-10 text-center text-lg">
            Login to Restate with google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="mt-3 w-full rounded-full bg-white py-4 shadow-md shadow-zinc-300">
            <View className="flex flex-row items-center justify-center">
              <Image source={icons.google} className="h-5 w-5" resizeMode="contain" />
              <Text className="font-rubik-medium text-black-300 ml-2 text-lg">
                Continue with google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
