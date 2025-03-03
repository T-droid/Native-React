import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StorageManager } from "@/engine/storage";
import { FitnessPlan } from "@/types";


/**
 * PlanDetails Component
 * 
 * Renders the plan details screen.
 * Features:
 * - Displays the plan's image, title, duration, frequency, overview, workout steps, and nutrition plan.
 * - Allows the user to opt in or opt out of the plan.
 * 
 * @returns {JSX.Element} Plan details screen UI
 */
export default function PlanDetails() {
    const params = useLocalSearchParams();
    const planString = params.plan as string;
    let plan: FitnessPlan = {
        id: 0,
        title: '',
        image: '',
        duration: '',
        frequency: '',
        overview: '',
        steps: [],
        nutrition_plan: {
            goal: '',
            meals: []
        },
        optIn: false
    };
    if (planString) {
        try {
            plan = JSON.parse(planString);
        } catch (err) {
            console.log(`error parsing plans ${err}`);
        }
    }

    const [isSubscribed, setIsSubscribed] = useState<boolean>(plan.optIn);

    /**
     * PlansLayout Component
     * 
     * Defines the layout for the "plans" screens.
     * Features:
     * - Uses the Stack component from expo-router to manage the navigation stack.
     * - Configures the header visibility for the planDetails screen.
     * 
     * @returns {JSX.Element} The layout for the "plans" screens.
     */
    const chosePlan = async () => {
        if (plan) {
            try {
                const success = await StorageManager.updatePlanOptIn(plan.id, true);
                if (success) {
                    setIsSubscribed(true);
                }
            } catch (err) {
                console.log(`error updating plan ${err}`);
            }
        }
    };

    /**
     * Handles the action of opting out of a fitness plan.
     * 
     * Steps:
     * 1. Checks if the plan exists.
     * 2. Updates the plan's opt-in status to false using the StorageManager.
     * 3. If successful, updates the isSubscribed state to false.
     * 4. Logs any errors that occur during the process.
     * 
     * @returns {Promise<void>}
     */
    const removePlan = async () => {
        if (plan) {
            try {
                const success = await StorageManager.updatePlanOptIn(plan.id, false);
                if (success) {
                    setIsSubscribed(false);
                }
            } catch (err) {
                console.log(`error updating plan ${err}`);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={plan.image} style={styles.image} />

            <Text style={[styles.title, styles.textColor]}>{plan.title}</Text>

            <Text style={[styles.subtitle, styles.textColor]}>
                {plan.duration} | {plan.frequency}
            </Text>

            <Text style={[styles.overview, styles.textColor]}>{plan.overview}</Text>

            <Text style={[styles.sectionTitle, styles.textColor]}>Workout Steps</Text>
            <FlatList
                data={plan.steps}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Text style={[styles.step, styles.textColor]}>{index + 1}. {item}</Text>
                )}
            />

            <Text style={[styles.sectionTitle, styles.textColor]}>Nutrition Plan</Text>
            <Text style={styles.goal}>Goal: {plan.nutrition_plan.goal}</Text>
            <FlatList
                data={plan.nutrition_plan.meals}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 10 }}
                renderItem={({ item }) => (
                    <View style={styles.mealContainer}>
                        <Text style={[styles.mealTitle, styles.textColor]}>{item.meal}</Text>
                        <FlatList
                            data={item.items}
                            keyExtractor={(food, index) => index.toString()}
                            renderItem={({ item: food }) => (
                                <Text style={[styles.mealItem, styles.textColor]}>- {food}</Text>
                            )}
                        />
                    </View>
                )}
            />

            {isSubscribed ? (
                <Button title="Opt Out" onPress={removePlan} />
            ) : (
                <Button title="Opt In" onPress={chosePlan} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#181636',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    overview: {
        fontSize: 14,
        color: '#444',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#333',
    },
    step: {
        fontSize: 14,
        color: '#555',
        paddingVertical: 3,
    },
    goal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 10,
    },
    mealContainer: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#343845',
        borderRadius: 8,
    },
    mealTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
    },
    mealItem: {
        fontSize: 14,
        color: '#666',
        paddingLeft: 10,
    },
    textColor: {
        color: '#bdbbbb'
    }
});