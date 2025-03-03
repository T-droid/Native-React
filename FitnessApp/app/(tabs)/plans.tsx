import PlanCard from "@/components/Plans/planCard";
import Colors from "@/constants/Colors";
import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { StorageManager } from "@/engine/storage";
import { FitnessPlan } from "@/types";
import { useFocusEffect } from "expo-router";


/**
 * Plans Component
 * 
 * Renders the plans screen.
 * Features:
 * - Displays a list of available fitness plans.
 * - Allows the user to refresh the list of plans.
 * 
 * @returns {JSX.Element} Plans screen UI
 */
export default function Plans() {
    const [availablePlans, setAvailablePlans] = useState<FitnessPlan[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadPlans();
    }, []);

    /**
     * Loads the user's fitness plans from storage and updates the state.
     * 
     * Steps:
     * 1. Sets the refreshing state to true.
     * 2. Loads the user's plans using the StorageManager.
     * 3. Updates the availablePlans state with the loaded plans.
     * 4. Sets the refreshing state to false.
     * 
     * @returns {Promise<void>}
     */
    const loadPlans = async () => {
        setRefreshing(true);
        const userPlans = await StorageManager.loadUserPlans();
        setAvailablePlans(userPlans);
        setRefreshing(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadPlans();
        }, [])
    )

    return (
        <View style={styles.container}>            
            {availablePlans && availablePlans.length > 0 && (
                <FlatList
                    style={{ padding: 10 }}
                    data={availablePlans}
                    ListHeaderComponent={() => <Text style={styles.listheaderTextStyle}>Available Plans</Text>}
                    ItemSeparatorComponent={() => <View style={{ padding: 20 }}/>}
                    keyExtractor={(item) => item.id.toString()}
                    removeClippedSubviews={true}
                    renderItem={({ item }) => (
                        <PlanCard plan={item} refresh={loadPlans} />
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={loadPlans} />
                    }
                />
            )}
        </View>
    )
}

const { page, text } = Colors;

const styles = StyleSheet.create({
    container: {
        backgroundColor: page.backgroundColor
    },
    listheaderTextStyle: {
        color: text.PrimaryColor,
        fontSize: 20
    },
    planCard: {
        backgroundColor: '#2c3e50',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    planTitle: {
        color: '#ecf0f1',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    planDetail: {
        color: '#bdc3c7',
        fontSize: 14,
        marginBottom: 5,
    },
});