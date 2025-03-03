import { FitnessPlan } from "../types";
  

const plans: FitnessPlan[] = [
        {
            "id": 1,
            "title": "Full Body Strength Training",
            "image": require('@/assets/images/plans/fullbodyworkout.jpg'),
            "duration": "6 weeks",
            "frequency": "3 times per week",
            "overview": "A strength training program designed to build muscle and improve endurance. This plan focuses on compound movements like squats, deadlifts, and bench presses.",
            "steps": [
                "Warm up with 5–10 minutes of light cardio and dynamic stretching.",
                "Perform 3 sets of 10 reps of squats.",
                "Do 3 sets of 10 reps of bench presses.",
                "Complete 3 sets of 10 reps of deadlifts.",
                "Finish with core exercises like planks and Russian twists."
            ],
            "optIn": false,
            "nutrition_plan": {
                "goal": "Muscle Gain",
                "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Oatmeal with banana and peanut butter", "Scrambled eggs with whole wheat toast"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Grilled chicken breast with quinoa and broccoli"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Salmon with sweet potatoes and asparagus"]
                    }
                ]
            }
        },
        {
            "id": 2,
            "title": "Beginner Cardio Blast",
            "image": require('@/assets/images/plans/cardioBlast.jpg'),
            "duration": "4 weeks",
            "frequency": "5 times per week",
            "overview": "A beginner-friendly cardio plan to improve endurance and burn calories. It includes a mix of running, cycling, and high-intensity intervals.",
            "steps": [
                "Start with a 5-minute brisk walk or light jog.",
                "Perform 30 minutes of alternating jog and sprint intervals.",
                "Cool down with a 5-minute slow walk.",
                "Stretch to prevent muscle stiffness."
            ],
            "optIn": false,
            "nutrition_plan": {
                "goal": "Fat Loss",
                "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Greek yogurt with mixed berries and almonds"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Grilled turkey salad with olive oil dressing"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Baked tilapia with roasted vegetables"]
                    }
                ]
            }
        },
        {
            "id": 3,
            "title": "Yoga & Flexibility Routine",
            "image": require('@/assets/images/plans/yogaroutine.jpg'),
            "duration": "8 weeks",
            "frequency": "3 times per week",
            "overview": "A relaxing yoga and stretching routine aimed at improving flexibility, reducing stress, and enhancing body awareness.",
            "steps": [
                "Begin with deep breathing exercises (5 minutes).",
                "Move through sun salutations for a warm-up.",
                "Hold standing poses like Warrior I and II for 30 seconds each.",
                "Practice seated stretches and hip openers.",
                "Finish with a relaxation pose (Savasana) for 5 minutes."
            ],
            "optIn": false,
            "nutrition_plan": {
                "goal": "Healthy Lifestyle",
                "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Smoothie with spinach, banana, and almond milk"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Avocado toast with poached eggs"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Quinoa bowl with roasted chickpeas and vegetables"]
                    }
                ]
            }
        },
        {
            "id": 4,
            "title": "HIIT Fat Burn",
            "image": require('@/assets/images/plans/fatburn.jpg'),
            "duration": "5 weeks",
            "frequency": "4 times per week",
            "overview": "A high-intensity interval training (HIIT) workout designed to burn fat and improve cardiovascular fitness.",
            "steps": [
                "Warm-up with 5 minutes of jumping jacks and lunges.",
                "Perform 30 seconds of burpees, followed by 15 seconds rest.",
                "Complete 30 seconds of mountain climbers, then rest.",
                "Repeat for 20 minutes.",
                "Cool down with stretching."
            ],
            "optIn": false,
            "nutrition_plan": {
                "goal": "Fat Burn",
                "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Omelet with spinach and mushrooms"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Grilled shrimp with brown rice and vegetables"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Lean beef stir-fry with bell peppers"]
                    }
                ]
            }
        },
        {
            "id": 5,
            "title": "Endurance Running Plan",
            "image": require('@/assets/images/plans/enduranceRunning.jpg'),
            "duration": "10 weeks",
            "frequency": "4 times per week",
            "overview": "A structured running program designed to build endurance for long-distance running.",
            "steps": [
                "Start with a slow 10-minute warm-up jog.",
                "Increase pace gradually, maintaining steady breathing.",
                "Alternate between speed runs and slow jogs.",
                "Cool down with a slow 10-minute jog and stretching."
            ],
            "optIn": false,
            "nutrition_plan": {
                "goal": "Energy Boost",
                "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Whole wheat toast with honey and banana"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Grilled chicken sandwich with avocado"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Baked salmon with quinoa and steamed broccoli"]
                    }
                ]
            }
        },
        {
            "id": 6,
            "title": "Core Strength & Abs Workout",
            "image": require('@/assets/images/plans/absworkout.jpg'),
            "duration": "6 weeks",
            "frequency": "3 times per week",
            "overview": "A core-focused workout plan to strengthen abdominal muscles, improve posture, and enhance overall core stability.",
            "steps": [
            "Start with 5 minutes of light cardio to warm up.",
            "Perform 3 sets of 15 reps of crunches.",
            "Do 3 sets of 12 reps of leg raises.",
            "Hold a plank for 45 seconds, repeat 3 times.",
            "Finish with stretching exercises for recovery."
            ],
            "optIn": false,
            "nutrition_plan": {
            "goal": "Lean Muscle Definition",
            "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Protein smoothie with banana and Greek yogurt"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Grilled salmon with steamed asparagus and quinoa"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Chicken and avocado salad with lemon dressing"]
                    }
                ]
            }
        },
        {
            "id": 7,
            "title": "Powerlifting Strength Program",
            "image": require('@/assets/images/plans/powerlifting.jpg'),
            "duration": "12 weeks",
            "frequency": "4 times per week",
            "overview": "A strength-building plan focused on increasing maximum lifts in squats, bench press, and deadlifts.",
            "steps": [
            "Warm up with mobility exercises and light cardio.",
            "Perform 5 sets of 5 reps of heavy squats.",
            "Do 5 sets of 5 reps of bench press.",
            "Complete 5 sets of 5 reps of deadlifts.",
            "Cool down with stretching and foam rolling."
            ],
            "optIn": false,
            "nutrition_plan": {
            "goal": "Strength Gain",
            "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Omelet with cheese and turkey bacon"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Steak with mashed sweet potatoes and green beans"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Grilled chicken thighs with brown rice and broccoli"]
                    }
                ]
            }
        },
        {
            "id": 8,
            "title": "Fat Loss & Toning Plan",
            "image": require('@/assets/images/plans/fatloss.jpg'),
            "duration": "8 weeks",
            "frequency": "5 times per week",
            "overview": "A fat-burning plan that combines cardio and strength training for full-body toning.",
            "steps": [
            "Start with 10 minutes of jumping rope.",
            "Perform 3 sets of 12 reps of lunges.",
            "Do 3 sets of 12 reps of push-ups.",
            "Complete 20 minutes of HIIT circuits.",
            "Finish with stretching and cool-down exercises."
            ],
            "optIn": false,
            "nutrition_plan": {
            "goal": "Fat Loss & Muscle Toning",
            "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Green smoothie with spinach, apple, and almond milk"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Grilled chicken and quinoa salad"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Baked cod with roasted Brussels sprouts"]
                    }
                ]
            }
        },
        {
            "id": 9,
            "title": "Marathon Training Plan",
            "image": require('@/assets/images/plans/marathonpreparation.jpg'),
            "duration": "16 weeks",
            "frequency": "5 times per week",
            "overview": "A structured plan designed to prepare runners for a full marathon, increasing endurance and stamina gradually.",
            "steps": [
            "Start with 10 minutes of dynamic stretching.",
            "Run a mix of long-distance slow runs and interval speed training.",
            "Include weekly long runs, increasing distance gradually.",
            "Incorporate strength training and cross-training sessions.",
            "Finish each session with a cooldown and stretching routine."
            ],
            "optIn": false,
            "nutrition_plan": {
            "goal": "Endurance & Energy",
            "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Oatmeal with honey and fresh berries"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Grilled chicken wrap with whole wheat tortilla"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Pasta with lean ground turkey and marinara sauce"]
                    }
                ]
            }
        },
        {
            "id": 10,
            "title": "Bodyweight Home Workout",
            "image": require('@/assets/images/plans/bodyweighthomeworkout.jpg'),
            "duration": "4 weeks",
            "frequency": "4 times per week",
            "overview": "A simple yet effective home workout that requires no equipment, focusing on full-body strength and endurance.",
            "steps": [
            "Warm-up with jumping jacks and arm circles.",
            "Perform 3 sets of 15 reps of bodyweight squats.",
            "Do 3 sets of 12 reps of push-ups.",
            "Hold a plank for 30 seconds, repeat 3 times.",
            "Cool down with stretching."
            ],
            "optIn": false,
            "nutrition_plan": {
            "goal": "General Fitness",
            "meals": [
                    {
                        "meal": "Breakfast",
                        "items": ["Whole grain toast with peanut butter"]
                    },
                    {
                        "meal": "Lunch",
                        "items": ["Vegetable stir-fry with tofu"]
                    },
                    {
                        "meal": "Dinner",
                        "items": ["Grilled chicken with a side of mixed greens"]
                    }
                ]
            }
        }
    ]
    
    
export default plans;