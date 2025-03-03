import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import EditProfile from "@/components/More/editProfileModal";
import EditCard from "@/components/More/editProfileCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/Colors";


/**
 * ProfileScreen Component
 * 
 * Renders the profile screen.
 * Features:
 * - Displays the user's name and email.
 * - Provides an option to edit the profile.
 * 
 * @returns {JSX.Element} Profile screen UI
 */
export default function ProfileScreen() {
    const [editProfile, setEditProfile] = useState<boolean>(false);
    const router = useRouter();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    
    
    useEffect(() => {
      /**
       * Fetches the user's name and email from AsyncStorage and updates the state.
       * 
       * Steps:
       * 1. Retrieves the name and email from AsyncStorage.
       * 2. Updates the fullname and email state with the retrieved values.
       * 
       * @returns {Promise<void>}
       */
      const getNameAndEmail = async () => {
        const name = await AsyncStorage.getItem('name');
        const email = await AsyncStorage.getItem('email');
        setFullname(name || '');
        setEmail(email || '');
      };

      getNameAndEmail();
    }, [editProfile]);

    /**
     * Closes the edit profile modal.
     * 
     * @returns {void}
     */
    const onClose = () => setEditProfile(false)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.text}>Name: {fullname}</Text>
            <Text style={styles.text}>Email: {email}</Text>

            <TouchableOpacity style={styles.button} onPress={() => setEditProfile(prevState => !prevState)}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <EditProfile isVisible={editProfile} onClose={onClose}>           
                <EditCard doneEditing={() => setEditProfile(false)}/>
            </EditProfile>
        </View>
  );
}

const { text, page, ButtonColor } = Colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: page.backgroundColor,
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
    color: text.PrimaryColor,
    marginBottom: 10,
  },
  button: {
    backgroundColor: ButtonColor,
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
