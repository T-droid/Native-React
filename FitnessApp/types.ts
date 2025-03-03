export type HabitData = {
    id: string;
    emoji: string;
    title: string;
    content: { header: string; body: string; };
}

export interface NutritionMeal {
    meal: string;
    items: string[];
}
  
export interface NutritionPlan {
    goal: string;
    meals: NutritionMeal[];
}
  
export interface FitnessPlan {
    id: number;
    title: string;
    image: string;
    duration: string;
    frequency: string;
    overview: string;
    steps: string[];
    nutrition_plan: NutritionPlan;
    optIn: boolean;
}