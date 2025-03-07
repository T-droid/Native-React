import { Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '@/constants/images';

const SignIn = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="h-full">
        <Image source={images.onboarding} className="h-4/6 w-full" resizeMode="contain" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
