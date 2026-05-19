export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Beverage' | 'Dessert';
export type CuisineType = 'American' | 'English' | 'Mexican' | 'Indian' | 'Chinese' | 'Thai' | 'Japanese' | 'Italian';

export interface MicroNutrients {
  protein: string;
  carbs: string;
  fats: string;
}

export interface Recipe {
  id: string;
  name: string;
  cookingTime: string;
  calories: number;
  macros: MicroNutrients;
  specialtyWarning?: string;
  ingredientsUsed: string[];
  instructions: string[];
  cuisine: string;
  tags: string[];
}

export interface RecommendationRequest {
  ingredients: string[];
  mealType: MealType;
  cuisines: CuisineType[]; // Now accepts multiple cuisine variations
  isVegetarian: boolean;
  targetCalories?: number;
  skipCount: number;
}