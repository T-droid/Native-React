import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, PropsWithChildren, useEffect } from 'react';

export type Food = {
  Breakfast: number;
  Lunch: number;
  Dinner: number;
  Snacks: number;
  Water: number;
};

type DiaryEntry = {
  food: Food;
  Exercise: number;
  goal: number;
  isReadOnly: boolean;
};

type Diary = Record<string, DiaryEntry>;

type DiaryContextType = {
  diary: Diary;
  updateDiary: (date: string, type: keyof DiaryEntry, subType: keyof Food | null, value: number) => void;
  saveDiaryEntry: (date: string) => Promise<void>;
};

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

/**
 * DiaryProvider Component
 * 
 * Provides the diary context to its children.
 * Features:
 * - Manages the diary state and goal state.
 * - Provides functions to update and save diary entries.
 * - Fetches the user's calorie goal on initial load.
 * 
 * @param {PropsWithChildren} props - The properties for the DiaryProvider component.
 * @param {React.ReactNode} props.children - The children components to provide the context to.
 * @returns {JSX.Element} The diary context provider.
 */
export const DiaryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [diary, setDiary] = useState<Diary>({});
  const [goal, setGoal] = useState<number | null>(2830);

  useEffect(() => {
    /**
     * Fetches the user's calorie goal from AsyncStorage and updates the state.
     * 
     * Steps:
     * 1. Fetches the goal from AsyncStorage.
     * 2. If the goal exists, updates the goal state with the parsed goal value.
     * 
     * @returns {Promise<void>}
     */
    const getGoal = async () => {
      const goal = await AsyncStorage.getItem("goal");
      if (goal) {
        setGoal(parseInt(goal));
      }
    };
    getGoal();
  }, [])

    /**
     * Updates the diary entry for a specific date.
     * 
     * Steps:
     * 1. Retrieves the current values for the specified date from the diary state.
     * 2. Updates the food or exercise value based on the provided type and subType.
     * 3. Updates the diary state with the new values.
     * 
     * @param {string} date - The date of the diary entry to update.
     * @param {keyof DiaryEntry} type - The type of entry to update (food or exercise).
     * @param {keyof Food | null} subType - The subType of food to update (if applicable).
     * @param {number} value - The value to add to the current entry.
     * @returns {void}
     */
  const updateDiary = (date: string, type: keyof DiaryEntry, subType: keyof Food | null, value: number) => {
    setDiary((prevDiary) => {
      const currentValues = prevDiary[date] || { food: { Breakfast: 0, Lunch: 0, Dinner: 0, Snacks: 0, Water: 0 }, goal: goal, isReadOnly: false, Exercise: 0 };
      if (type === 'food' && subType) {
        return {
          ...prevDiary,
          [date]: {
            ...currentValues,
            food: {
              ...currentValues.food,
              [subType]: currentValues.food[subType] + value,
            },
          },
        };
      } else {
        return {
          ...prevDiary,
          [date]: {
            ...currentValues,
            Exercise: currentValues.Exercise + value,
          },
        };
      }
    });
  };

  /**
   * Saves the diary entry for a specific date to AsyncStorage.
   * 
   * Steps:
   * 1. Updates the isReadOnly state for the specified date.
   * 2. Retrieves the diary entry for the specified date from the diary state.
   * 3. Saves the diary entry to AsyncStorage.
   * 4. Displays a success message if the entry is saved successfully.
   * 5. Logs any errors that occur during the save process.
   * 
   * @param {string} date - The date of the diary entry to save.
   * @returns {Promise<void>}
   */
  const saveDiaryEntry = async (date: string) => {
    try {
      setDiary((prevDiary) => {
        const currentValues = prevDiary[date];
        if (currentValues) {
          return {
            ...prevDiary,
            [date]: {
              ...currentValues,
              isReadOnly: true,
            },
          };
        }
        return prevDiary;
      });
      const entry = diary[date];

      if (entry) {
        await AsyncStorage.setItem(`diary_${date}`, JSON.stringify(entry));
        alert('Diary entry saved successfully');
      } else {
        alert('No diary entry to save');
      }
    } catch (error) {
      console.error('Error saving diary entry:', error);
    }
  };

  return (
    <DiaryContext.Provider value={{ diary, updateDiary, saveDiaryEntry }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};