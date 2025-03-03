import * as FileSystem from 'expo-file-system';
import { FitnessPlan, HabitData } from '../types';

const PLANS_FILE_PATH = FileSystem.documentDirectory + 'userPlans.json';
const HABITS_FILE_PATH = FileSystem.documentDirectory + 'userHabits.json';

export const StorageManager = {
  /**
   * Saves all user plans to the file system.
   * 
   * Steps:
   * 1. Loads the existing user plans.
   * 2. Converts the plans to a JSON string.
   * 3. Writes the JSON string to the file system.
   * 4. Logs any errors that occur during the save process.
   * 
   * @param {FitnessPlan[]} plans - The plans to save.
   * @returns {Promise<boolean>} True if the plans were saved successfully, false otherwise.
   */
  saveAllUserPlans: async (plans: FitnessPlan[]) => {
    try {
      const availablePlans = await StorageManager.loadUserPlans();
      const jsonPlans = JSON.stringify(plans);
      await FileSystem.writeAsStringAsync(PLANS_FILE_PATH, jsonPlans);
      return true;
    } catch (error) {
      console.error('Error saving all plans:', error);
      return false;
    }
  },

  /**
   * Updates the opt-in status of a fitness plan.
   * 
   * Steps:
   * 1. Loads the existing user plans.
   * 2. Updates the opt-in status of the specified plan.
   * 3. Saves the updated plans to the file system.
   * 4. Logs any errors that occur during the update process.
   * 
   * @param {number} planId - The ID of the plan to update.
   * @param {boolean} optIn - The new opt-in status.
   * @returns {Promise<boolean>} True if the plan was updated successfully, false otherwise.
   */
  updatePlanOptIn: async (planId: number, optIn: boolean) => {
    try {
      const existingPlans = await StorageManager.loadUserPlans();
      const updatedPlans = existingPlans.map(plan => 
        plan.id === planId ? { ...plan, optIn: optIn } : plan
      );
      const success = await StorageManager.saveAllUserPlans(updatedPlans);
      return success;
    } catch (error) {
      console.error('Error updating plan OptIn:', error);
      return false;
    }
  },

  /**
 * Loads the user plans from the file system.
 * 
 * Steps:
 * 1. Reads the plans file from the file system.
 * 2. Parses the JSON content of the file.
 * 3. Returns the parsed plans.
 * 4. Logs any errors that occur during the load process.
 * 
 * @returns {Promise<FitnessPlan[]>} The loaded user plans.
 */
  loadUserPlans: async (): Promise<FitnessPlan[]> => {
    try {
      const planArray: any = [];
      const content = await FileSystem.readAsStringAsync(PLANS_FILE_PATH);
      return planArray.concat(JSON.parse(content));
    } catch (error) {
      return [];
    }
  },

  /**
   * Saves a user habit to the file system.
   * 
   * Steps:
   * 1. Loads the existing user habits.
   * 2. Adds the new habit to the existing habits.
   * 3. Converts the updated habits to a JSON string.
   * 4. Writes the JSON string to the file system.
   * 5. Logs any errors that occur during the save process.
   * 
   * @param {HabitData} habit - The habit to save.
   * @returns {Promise<boolean>} True if the habit was saved successfully, false otherwise.
   */
  saveUserHabit: async (habit: HabitData) => {
    try {
      const existingHabits = await StorageManager.loadUserHabits();
      const updatedHabits = [...existingHabits, habit];
      const jsonHabits = JSON.stringify(updatedHabits);
      await FileSystem.writeAsStringAsync(HABITS_FILE_PATH, jsonHabits);
      return true;
    } catch (error) {
      console.error('Error saving habit:', error);
      return false;
    }
  },

  /**
   * Loads the user habits from the file system.
   * 
   * Steps:
   * 1. Reads the habits file from the file system.
   * 2. Parses the JSON content of the file.
   * 3. Returns the parsed habits.
   * 4. Logs any errors that occur during the load process.
   * 
   * @returns {Promise<HabitData[]>} The loaded user habits.
   */
  loadUserHabits: async (): Promise<HabitData[]> => {
    try {
      const content = await FileSystem.readAsStringAsync(HABITS_FILE_PATH);
      return JSON.parse(content) || [];
    } catch (error) {
      return [];
    }
  },

  /**
   * Deletes a fitness plan from the file system.
   * 
   * Steps:
   * 1. Loads the existing user plans.
   * 2. Filters out the plan with the specified ID.
   * 3. Converts the updated plans to a JSON string.
   * 4. Writes the JSON string to the file system.
   * 5. Logs any errors that occur during the delete process.
   * 
   * @param {number} planId - The ID of the plan to delete.
   * @returns {Promise<boolean>} True if the plan was deleted successfully, false otherwise.
   */
  deletePlan: async (planId: number) => {
    try {
      const existingPlans = await StorageManager.loadUserPlans();
      const updatedPlans = existingPlans.filter(plan => plan.id !== planId);
      const jsonPlans = JSON.stringify(updatedPlans);
      console.log('jsonPlans:', jsonPlans);
      await FileSystem.writeAsStringAsync(PLANS_FILE_PATH, jsonPlans);
      return true;
    } catch (error) {
      console.error('Error deleting plan:', error);
      return false;
    }
  },

  /**
   * Deletes a user habit from the file system.
   * 
   * Steps:
   * 1. Loads the existing user habits.
   * 2. Filters out the habit with the specified ID.
   * 3. Converts the updated habits to a JSON string.
   * 4. Writes the JSON string to the file system.
   * 5. Logs any errors that occur during the delete process.
   * 
   * @param {string} habitId - The ID of the habit to delete.
   * @returns {Promise<boolean>} True if the habit was deleted successfully, false otherwise.
   */
  deleteHabit: async (habitId: string) => {
    try {
      const existingHabits = await StorageManager.loadUserHabits();
      const updatedHabits = existingHabits.filter(habit => habit.id !== habitId);
      const jsonHabits = JSON.stringify(updatedHabits);
      await FileSystem.writeAsStringAsync(HABITS_FILE_PATH, jsonHabits);
      return true;
    } catch (error) {
      console.error('Error deleting habit:', error);
      return false;
    }
  }
};