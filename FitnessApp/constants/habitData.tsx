import { HabitData } from "@/FitnessApp/types";

const preplannedHabits: HabitData[] = [
    { id: "1", emoji: "🍳", title: "Eat more proteins", content: { header: "Hit my protein gaol at least 3 days this week", body: "Feed your muscles, skin, and bone health" } },
    { id: "2", emoji: "💧", title: "Drink more water", content: { header: "Drink at least 5 glasses of water for 7 days this week", body: "Drink up to boost your energy and focus" } },
    { id: "3", emoji: "🍑", title: "Eat more fruit", content: { header: "Eat at 2 fruits a day for at least 5 days this week", body: "Choose these sweet snacks for fiber and longer-lasting energy" } },
    { id: "4", emoji: "🥦", title: "Eat more vegetable", content: { header: "Eat a vegetable at least 5 days this week", body: "Get more vitamins, minerals, phytonutrients and crunch" } },
    { id: "5", emoji: "✅", title: "Log more meals", content: { header: "Log 2 meals for at least 4 days this week", body: "A kickstarter to logging: Aim for progress, not diary perfection" } },
    { id: "6", emoji: "🍿", title: "Eat more fibre", content: { header: "Have a meal with at lleast 5g of fiber for at least 5 days this week", body: "Feed your gut and feel fuller longer" } }
];

export default preplannedHabits;