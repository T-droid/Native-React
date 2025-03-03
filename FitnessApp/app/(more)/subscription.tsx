import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


/**
 * SubscriptionScreen Component
 * 
 * Renders the subscription screen.
 * Features:
 * - Displays the user's subscription status.
 * - Provides a button to subscribe if the user has no active subscription.
 * 
 * @returns {JSX.Element} Subscription screen UI
 */
export default function SubscriptionScreen() {
  const router = useRouter();
  const isSubscribed = true; // Replace with real subscription check

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
      <Text style={styles.text}>
        {isSubscribed ? "You are subscribed to the Pro Plan." : "You have no active subscription."}
      </Text>

      {!isSubscribed && (
        <TouchableOpacity style={styles.button} onPress={() => router.push("/plans")}>
          <Text style={styles.buttonText}>Subscribe Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181636",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#bdbbbb",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
