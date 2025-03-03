import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Checks the login status of the user.
     * 
     * Steps:
     * 1. Fetches the stored user data from AsyncStorage.
     * 2. If user data exists, updates the user state with the parsed user data.
     * 3. Logs any errors that occur during the fetch process.
     * 4. Sets the loading state to false after the check is complete.
     * 
     * @returns {Promise<void>}
     */
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error fetching token:", error);
      } finally{
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  /**
   * Logs in the user.
   * 
   * Steps:
   * 1. Saves the user data to AsyncStorage.
   * 2. Updates the user state with the provided user data.
   * 
   * @param {Object} userData - The user data to save and set.
   * @returns {Promise<void>}
   */
  const login = async (userData) => {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /**
   * Logs out the user.
   * 
   * Steps:
   * 1. Removes the user data from AsyncStorage.
   * 2. Sets the user state to null.
   * 
   * @returns {Promise<void>}
   */
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
