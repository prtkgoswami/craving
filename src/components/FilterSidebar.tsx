"use client";

import React, { useState } from "react";
import { MealType, CuisineType } from "@/types";
import { 
  X, 
  RotateCw, 
  Sun,      
  Utensils, 
  Cookie,   
  Coffee,   
  IceCream  
} from "lucide-react";

interface FilterSidebarProps {
  ingredients: string[];
  onAddIngredient: (ing: string) => void;
  onRemoveIngredient: (idx: number) => void;
  selectedMealType: MealType;
  onSelectMealType: (type: MealType) => void;
  selectedCuisines: CuisineType[];
  onToggleCuisine: (cuisine: CuisineType) => void;
  isVegetarian: boolean;
  onToggleVegetarian: (checked: boolean) => void;
  isCalorieEnabled: boolean;
  onToggleCalorie: (enabled: boolean) => void;
  targetCalories: number;
  onChangeCalories: (calories: number) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function FilterSidebar({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  selectedMealType,
  onSelectMealType,
  selectedCuisines,
  onToggleCuisine,
  isVegetarian,
  onToggleVegetarian,
  isCalorieEnabled,
  onToggleCalorie,
  targetCalories,
  onChangeCalories,
  onSubmit,
  isLoading,
}: FilterSidebarProps) {
  const [inputVal, setInputVal] = useState("");
  const cuisines: CuisineType[] = ["American", "English", "Mexican", "Indian", "Chinese", "Thai", "Japanese", "Italian"];
  
  const mealTypes: { name: MealType; icon: React.ComponentType<{ className?: string }> }[] = [
    { name: "Breakfast", icon: Sun }, 
    { name: "Lunch", icon: Utensils },
    { name: "Dinner", icon: Utensils }, 
    { name: "Snack", icon: Cookie },
    { name: "Beverage", icon: Coffee }, 
    { name: "Dessert", icon: IceCream }
  ];

  // 1. Validate based on the new density scope constraints (4 to 15 items)
  const isIngredientCountValid = ingredients.length >= 4 && ingredients.length <= 15;
  const isFormInvalid = !isIngredientCountValid || selectedCuisines.length === 0 || !selectedMealType;

  // 2. Determine if we should show an error outline around the token container
  const showRangeError = ingredients.length > 0 && !isIngredientCountValid;

  return (
    <aside className="bg-[#F4EDE3]/50 rounded-2xl p-6 border border-slate-300 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-serif text-brand-secondary font-bold">Recipe Filters</h2>
        <p className="text-sm text-slate-700 mt-0.5 font-medium">Refine your culinary craving</p>
      </div>

      <div className="mb-5 flex items-center justify-between bg-white p-3 rounded-xl border border-slate-300 shadow-sm">
        <span className="text-sm font-semibold text-brand-secondary">Veg Only</span>
        <button
          type="button"
          aria-label="Toggle Vegetarian Only"
          onClick={() => onToggleVegetarian(!isVegetarian)}
          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isVegetarian ? "bg-brand-primary" : "bg-gray-400"}`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isVegetarian ? "translate-x-5" : "translate-x-0"}`} />
        </button>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-brand-secondary mb-2">Cuisines (Select Multiple)</label>
        <div className="flex flex-wrap gap-1.5">
          {cuisines.map((c) => {
            const isSelected = selectedCuisines.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => onToggleCuisine(c)}
                className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-brand-secondary border-brand-secondary text-white shadow-sm" 
                    : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ingredients Token Box */}
      <div className="mb-5">
        <div className="flex justify-between items-baseline mb-1.5">
          <label className="block text-sm font-semibold text-brand-secondary">Ingredients</label>
          {/* Requirement Guideline text added */}
          <span className={`text-[11px] font-bold tracking-wide transition-colors ${showRangeError ? "text-red-600 animate-pulse" : "text-slate-500"}`}>
            Min 4 and Max 15 ({ingredients.length} added)
          </span>
        </div>

        <div className={`bg-white border rounded-xl p-3 shadow-inner h-[130px] overflow-y-auto flex flex-wrap content-start gap-1.5 scrollbar-thin transition-all ${
          showRangeError ? "border-red-500 ring-1 ring-red-500/30" : "border-slate-300"
        }`}>
          {ingredients.length === 0 ? (
            <span className="text-sm text-slate-600 font-medium self-center mx-auto">No ingredients added yet.</span>
          ) : (
            ingredients.map((ing, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-semibold bg-brand-primary text-white h-fit">
                {ing}
                <button type="button" onClick={() => onRemoveIngredient(idx)} className="hover:bg-black/20 rounded-full p-0.5 cursor-pointer" aria-label={`Remove ${ing}`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Error contextual message feedback directly below input field */}
        {showRangeError && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">
            {ingredients.length < 4 
              ? `Add ${4 - ingredients.length} more ingredient${4 - ingredients.length > 1 ? "s" : ""} to unlock generation.`
              : `Remove ${ingredients.length - 15} ingredient${ingredients.length - 15 > 1 ? "s" : ""} to meet density caps.`}
          </p>
        )}

        <form onSubmit={(e) => { e.preventDefault(); if (inputVal.trim()) { onAddIngredient(inputVal.trim()); setInputVal(""); } }} className="mt-2 flex gap-2">
          <input 
            type="text" 
            placeholder="Add ingredient..." 
            value={inputVal} 
            onChange={(e) => setInputVal(e.target.value)} 
            className="flex-1 bg-white border border-slate-400 placeholder-slate-500 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary text-slate-900" 
          />
          <button type="submit" className="bg-brand-secondary hover:bg-slate-800 text-white px-4 rounded-lg flex items-center font-bold text-lg cursor-pointer">+</button>
        </form>
      </div>

      {/* Meal Types Grid */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-brand-secondary mb-1.5">Meal Type</label>
        <div className="grid grid-cols-2 gap-1.5">
          {mealTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedMealType === type.name;
            return (
              <button
                key={type.name}
                type="button"
                onClick={() => onSelectMealType(type.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold cursor-pointer transition-all ${
                  isSelected 
                    ? "bg-brand-primary border-brand-primary text-white shadow-sm" 
                    : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-white" : "text-slate-600"}`} />
                {type.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-brand-secondary cursor-pointer">
            <input type="checkbox" checked={isCalorieEnabled} onChange={(e) => onToggleCalorie(e.target.checked)} className="rounded border-slate-400 accent-brand-primary w-4 h-4 cursor-pointer" />
            Calories
          </label>
          {isCalorieEnabled && <span className="text-sm font-bold text-brand-primary">{targetCalories} kcal</span>}
        </div>
        {isCalorieEnabled && <input type="range" min="200" max="1500" step="50" value={targetCalories} onChange={(e) => onChangeCalories(Number(e.target.value))} className="w-full accent-brand-primary cursor-pointer bg-slate-300 rounded-lg h-1.5" />}
      </div>

      <button 
        type="button" 
        onClick={onSubmit} 
        disabled={isLoading || isFormInvalid} 
        className="w-full bg-brand-primary text-white py-2.5 rounded-xl hover:bg-[#c94928] transition-all disabled:opacity-40 flex items-center justify-center gap-2 text-sm font-bold cursor-pointer shadow-sm"
      >
        {isLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : "Generate Recipes"}
      </button>
    </aside>
  );
}