import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

type Data = {
    id: string;
    iconName: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof FontAwesome.glyphMap,
    title: string;
    text: string;
    description: string;
}

const discoverData: Data[] = [
    { id: "1", iconName: "moon-o", title: "Sleep", text: "Eat right, sleep tight", description: "" },
    { id: "2", iconName: "silverware-fork-knife", title: "Recipes", text: "Cook, eat, log, repeat", description: "" },
    { id: "3", iconName: "dumbbell", title: "Workouts", text: "Sweating is selfcare", description: "" },
    { id: "4", iconName: "vector-link", title: "Sync up", text: "Link apps & devices", description: "" },
    { id: "5", iconName: "users", title: "Friends", text: "Your support squad", description: "" },
    { id: "6", iconName: "wechat", title: "Community", text: "Food & fitness inspo", description: "" },    
];

export default discoverData;