import ChooseHabit from "@/components/Dashboard/chooseHabit";
import DiscoverCard from "@/components/Dashboard/discover";
import ExerciseStepCard from "@/components/Dashboard/ExerciseStepCard";
import DashboardHeader from "@/components/Dashboard/header";
import StatisticsView from "@/components/Dashboard/statisticsView";
import { View, StyleSheet, Text, FlatList } from "react-native";

import discoverData from "@/constants/DiscoverData";
import React from "react";
import Colors from "@/constants/Colors";


/**
 * Index Component
 * 
 * Renders the home screen.
 * Features:
 * - Displays the header section using the HeaderComponent.
 * - Shows a list of discover cards.
 * 
 * @returns {JSX.Element} Home screen UI.
 */
const Index = () => {
  /**
   * HeaderComponent
   * 
   * Renders the header section of the dashboard.
   * Features:
   * - Displays the dashboard header.
   * - Shows today's statistics.
   * - Allows the user to choose a habit.
   * - Displays exercise and step cards.
   * - Shows the discover section title.
   * 
   * @returns {JSX.Element} The header section UI.
   */
  const HeaderComponent = () => (
    <View style={styles.listHeaderContainer}>
      <DashboardHeader />
      <Text style={styles.textStyle}>Today</Text>
      <StatisticsView />
      <ChooseHabit />
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <ExerciseStepCard type="Steps" />
        <ExerciseStepCard type="Exercise" />
      </View>
      <Text style={styles.textStyle}>Discover</Text>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={discoverData}
        numColumns={2}
        ListHeaderComponent={HeaderComponent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscoverCard iconName={item.iconName} title={item.title} text={item.text} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Index;

const { page, text, InputBorderColor, placeHolderColor, Card } = Colors;

const styles = StyleSheet.create({
  listHeaderContainer: {
    flex: 1,
    gap: 10,
    paddingBottom: 20
  },
  listContainer: {
    backgroundColor: page.backgroundColor,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  contentContainer: {
    gap: 10,
    paddingHorizontal: 15,
    paddingBottom: 20
  },
  textStyle: {
    color: text.PrimaryColor,
    fontSize: 30,
    fontWeight: 'bold'
  }
});