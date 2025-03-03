import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Button, FlatList, Pressable, StatusBar, StyleSheet, Text, View, Image } from "react-native";
import Colors from "@/constants/Colors";

type Data = {
  id: string;
  image: string;
  text: string;
}
const data: Data[] = [
  {
    id: "1",
    image: require('@/assets/images/workoutImg1.jpg'),
    text: "Stay Fit & Healthy",
  },
  {
    id: "2",
    image: require('@/assets/images/workoutImg2.jpg'),
    text: "Workout Everyday",
  },
  {
    id: "3",
    image: require('@/assets/images/workoutImg3.jpg'),
    text: "Eat Clean & Train Hard",
  },
];


/**
 * Welcome Component
 * 
 * Renders the welcome screen.
 * Features:
 * - Displays a carousel of images with text.
 * - Pagination dots to indicate the current image.
 * - Navigation to the preferred name input screen and login screen.
 * 
 * @returns {JSX.Element} Welcome screen UI
 */
export default function Welcome() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  /**
   * WeightGoal Component
   * 
   * Renders the weight goal selection screen.
   * Features:
   * - Weight goal selection using checkboxes.
   * - Form submission with validation.
   * 
   * @returns {JSX.Element} Weight goal selection screen UI
   */
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.nameText}>Fitness App</Text>
      <View style={{ height: 450 }}>
        <FlatList
        style={{ marginHorizontal: 10 }}
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.imageText}>{item.text}</Text>
        </View>
        )}
        ItemSeparatorComponent={() =>  <View style={{ width: 20 }} />}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 40 }}
        />
      </View>
     <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? text.appThemeTextColor : "#ccc" },
            ]}
          />
        ))}
    </View>
    <Link push href={{ pathname: '/(authflow)/(onboarding)/preferredName' }} asChild>
        <Pressable style={styles.signUp}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Sign Up For Free</Text>
        </Pressable>
     </Link>
     <Link push href={{ pathname: '/(authflow)/(login)/login' }} asChild>
        <Pressable style={{ marginTop: 20 }}>
            <Text style={{ color: text.appThemeTextColor, fontWeight: 'bold', fontSize: 20 }}>Login</Text>
        </Pressable>
     </Link>
    </View>
  );
}

const { page, text, ButtonColor } = Colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: page.backgroundColor,
    paddingTop: StatusBar.currentHeight,
    gap: 10
  },
  welcomeText: {
    color: text.PrimaryColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
  nameText: {
    color: text.appThemeTextColor,
    fontSize: 40,
    fontWeight: 'bold'
  },
  image: {
    borderWidth: 2,
    height: 350,
    width: 300,
    backgroundColor: 'grey',
    borderRadius: 10
  },
  imageContainer: {
    alignItems: 'center'
  },
  imageText: {
    color: text.SecondaryColor,
    fontSize: 25,
    fontWeight: 'bold'
  },
  signUp: {
    marginTop: 20,
    backgroundColor: ButtonColor,
    borderRadius: 20,
    paddingVertical: 10,
    width: 300,
    alignItems: 'center'
  },
  pagination: {
    position: "absolute",
    bottom: 190,
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
})
