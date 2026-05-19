"use client";

import React, { useState } from "react";
import { MealType, CuisineType } from "@/types";
import { X, RotateCw } from "lucide-react";

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
  const mealTypes: { name: MealType; icon: string }[] = [
    { name: "Breakfast", icon: "☀️" }, { name: "Lunch", icon: "🍔" },
    { name: "Dinner", icon: "🍴" }, { name: "Snack", icon: "🍿" },
    { name: "Beverage", icon: "☕" }, { name: "Dessert", icon: "🍰" }
  ];

  return (
    <aside className="bg-[#F4EDE3]/40 rounded-2xl p-6 border border-brand-tertiary shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-serif text-brand-secondary font-bold">Recipe Filters</h2>
        <p className="text-xs text-slate-500 mt-0.5">Refine your culinary craving</p>
      </div>

      <div className="mb-5 flex items-center justify-between bg-white/60 p-3 rounded-xl border border-brand-tertiary">
        <span className="text-sm font-medium text-brand-secondary">Veg Only</span>
        <button
          type="button"
          onClick={() => onToggleVegetarian(!isVegetarian)}
          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isVegetarian ? "bg-green-600" : "bg-gray-300"}`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isVegetarian ? "translate-x-5" : "translate-x-0"}`} />
        </button>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-brand-secondary mb-2">Cuisines (Select Multiple)</label>
        <div className="flex flex-wrap gap-1.5">
          {cuisines.map((c) => {
            const isSelected = selectedCuisines.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => onToggleCuisine(c)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  isSelected ? "bg-brand-secondary border-brand-secondary text-white shadow-sm" : "bg-white border-brand-tertiary text-brand-secondary hover:bg-slate-50"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed Height Block for Ingredient Tokens */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-brand-secondary mb-1.5">Ingredients</label>
        <div className="bg-white border border-brand-tertiary rounded-xl p-3 shadow-inner h-[120px] overflow-y-auto flex flex-wrap content-start gap-1.5 scrollbar-thin">
          {ingredients.length === 0 ? (
            <span className="text-xs text-slate-400 self-center mx-auto">No ingredients added yet.</span>
          ) : (
            ingredients.map((ing, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-brand-primary text-white h-fit">
                {ing}
                <button type="button" onClick={() => onRemoveIngredient(idx)} className="hover:bg-black/20 rounded-full p-0.5 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (inputVal.trim()) { onAddIngredient(inputVal.trim()); setInputVal(""); } }} className="mt-2 flex gap-2">
          <input type="text" placeholder="Add ingredient..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} className="flex-1 bg-white border border-brand-tertiary rounded-lg px-3 py-1.5 text-sm focus:outline-none" />
          <button type="submit" className="bg-brand-secondary text-white px-3 rounded-lg flex items-center cursor-pointer">+</button>
        </form>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-brand-secondary mb-1.5">Meal Type</label>
        <div className="grid grid-cols-2 gap-1.5">
          {mealTypes.map((type) => (
            <button
              key={type.name}
              type="button"
              onClick={() => onSelectMealType(type.name)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer ${selectedMealType === type.name ? "bg-brand-primary border-brand-primary text-white" : "bg-white border-brand-tertiary text-brand-secondary hover:bg-slate-50"}`}
            >
              <span>{type.icon}</span>{type.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label className="flex items-center gap-2 text-sm font-medium text-brand-secondary cursor-pointer">
            <input type="checkbox" checked={isCalorieEnabled} onChange={(e) => onToggleCalorie(e.target.checked)} className="rounded border-brand-tertiary accent-brand-primary w-4 h-4 cursor-pointer" />
            Calories
          </label>
          {isCalorieEnabled && <span className="text-sm font-bold text-brand-primary">{targetCalories} kcal</span>}
        </div>
        {isCalorieEnabled && <input type="range" min="200" max="1500" step="50" value={targetCalories} onChange={(e) => onChangeCalories(Number(e.target.value))} className="w-full accent-brand-primary cursor-pointer bg-brand-tertiary rounded-lg h-1.5" />}
      </div>

      <button 
        type="button" 
        onClick={onSubmit} 
        disabled={isLoading || ingredients.length === 0 || selectedCuisines.length === 0} 
        className="w-full bg-brand-primary text-white font-medium py-2.5 rounded-xl hover:bg-[#c94928] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
      >
        {isLoading ? <RotateCw className="w-4 h-4 animate-spin" /> : "Generate Recipes"}
      </button>
    </aside>
  );
}