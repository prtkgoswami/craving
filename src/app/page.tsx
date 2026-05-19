"use client";

import React, { useState } from "react";
import { MealType, CuisineType, Recipe } from "@/types";
import FilterSidebar from "@/components/FilterSidebar";
import RecipeCard from "@/components/RecipeCard";
import RecipeModal from "@/components/RecipeModal";
import SaaSMitrixFAQ from "@/components/SaaSMitrixFAQ";
import { Utensils, RotateCw } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([
    "Wild Salmon",
    "Organic Kale",
    "Lemon",
  ]);
  const [selectedMealType, setSelectedMealType] = useState<MealType>("Dinner");
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>([
    "Indian",
    "Italian",
  ]);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isCalorieEnabled, setIsCalorieEnabled] = useState(true);
  const [targetCalories, setTargetCalories] = useState<number>(650);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Craving",
    operatingSystem: "All",
    applicationCategory: "MultimediaApplication/KitchenTool",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description:
      "An interactive AI-powered recipe generator that crafts personalized meal configurations matching active user macro goals and available pantry inputs.",
  };

  const handleToggleCuisine = (cuisine: CuisineType) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine],
    );
  };

  const fetchRecipes = async (isAccumulating: boolean = false) => {
    setErrorMsg(null);
    if (isAccumulating) setIsLoadingMore(true);
    else {
      setIsLoading(true);
      setRecipes([]);
    }
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          mealType: selectedMealType,
          cuisines: selectedCuisines,
          isVegetarian,
          targetCalories: isCalorieEnabled ? targetCalories : undefined,
          skipCount: isAccumulating ? recipes.length : 0,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        posthog.capture("recipe_generation_failed", {
          error: data.error || "Unknown API Error",
        });
        throw new Error(data.error || "Failed to curate suggestions.");
      }

      posthog.capture("recipe_generated", {
        ingredient_count: ingredients.length,
        selected_meal_type: selectedMealType,
        cuisines_count: selectedCuisines.length,
        cuisines_list: selectedCuisines,
        is_vegetarian: isVegetarian,
        is_calorie_bounded: isCalorieEnabled,
      });

      setRecipes((prev) =>
        isAccumulating ? [...prev, ...data.recipes] : data.recipes,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to communicate with engine.");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-8 md:px-12 lg:px-16 max-w-[1536px] mx-auto space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-8">
        <header>
          <header>
            <h1 className="text-3xl font-serif tracking-tight text-brand-primary font-bold flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Craving Logo"
                width={36}
                height={36}
                priority
                className="object-contain"
              />
              <span>Craving</span>
            </h1>
          </header>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <FilterSidebar
              ingredients={ingredients}
              onAddIngredient={(ing) =>
                !ingredients.includes(ing) &&
                setIngredients([...ingredients, ing])
              }
              onRemoveIngredient={(idx) =>
                setIngredients(ingredients.filter((_, i) => i !== idx))
              }
              selectedMealType={selectedMealType}
              onSelectMealType={setSelectedMealType}
              selectedCuisines={selectedCuisines}
              onToggleCuisine={handleToggleCuisine}
              isVegetarian={isVegetarian}
              onToggleVegetarian={setIsVegetarian}
              isCalorieEnabled={isCalorieEnabled}
              onToggleCalorie={setIsCalorieEnabled}
              targetCalories={targetCalories}
              onChangeCalories={setTargetCalories}
              onSubmit={() => fetchRecipes(false)}
              isLoading={isLoading || isLoadingMore}
            />
          </div>

          <section className="lg:col-span-8 flex flex-col justify-between h-full min-h-[400px]">
            {errorMsg && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl text-sm text-red-800">
                {errorMsg}
              </div>
            )}
            {recipes.length > 0 && (
              <h3 className="text-2xl font-serif font-bold text-brand-secondary mb-6 tracking-tight">
                {recipes.length} Global Matches found
              </h3>
            )}

            {!isLoading && recipes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-brand-tertiary rounded-2xl bg-[#F4EDE3]/10 my-auto">
                <Utensils className="w-12 h-12 text-brand-tertiary mb-3" />
                <p className="font-serif text-lg text-brand-secondary font-medium">
                  Your presentation plate is clean
                </p>
              </div>
            )}

            {isLoading && recipes.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-100 border border-brand-tertiary rounded-2xl h-[168px] w-full"
                  />
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>

            {recipes.length > 0 && (
              <div className="mt-12 flex justify-center w-full">
                <button
                  type="button"
                  onClick={() => fetchRecipes(true)}
                  disabled={isLoadingMore || isLoading}
                  className="text-brand-primary font-medium tracking-wide text-xs uppercase hover:text-[#c94928] border border-brand-tertiary bg-white rounded-full px-8 py-4 shadow-sm transition-all flex items-center justify-center gap-2 min-w-[220px] cursor-pointer"
                >
                  {isLoadingMore ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin text-brand-primary" />
                      <span>Fetching matches...</span>
                    </>
                  ) : (
                    <span>Load More Matches</span>
                  )}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      <hr className="border-brand-tertiary" />

      {/* Extracted Modular SaaS Feature Matrix Block */}
      <SaaSMitrixFAQ />

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </main>
  );
}
