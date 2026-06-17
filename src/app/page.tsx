"use client";

import React, { useState } from "react";
import { MealType, CuisineType, Recipe } from "@/types";
import FilterSidebar from "@/components/FilterSidebar";
import RecipeCard from "@/components/RecipeCard";
import RecipeModal from "@/components/RecipeModal";
import SaaSMitrixFAQ from "@/components/SaaSMitrixFAQ";
import { Utensils, RotateCw, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import Link from "next/link";
import FeedbackButton from "@/components/FeedbackButton";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<MealType>(
    "" as MealType,
  );
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>([]);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isCalorieEnabled, setIsCalorieEnabled] = useState(true);
  const [targetCalories, setTargetCalories] = useState<number>(650);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Track continuous stream termination states
  const [hasMore, setHasMore] = useState<boolean>(true);

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
      setHasMore(true); // Reset flag context on a fresh generation query pass
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
          targetCalories,
          skipCount: isAccumulating ? recipes.length : 0,
          existingNames: isAccumulating ? recipes.map((r) => r.name) : [],
        }),
      });
      const data = await response.json();

      if (data.usage) {
        posthog.capture("recipe_generation_token_consumed", {
          input_tokens: data.usage.inputTokens,
          output_tokens: data.usage.outputTokens,
          total_tokens: data.usage.totalTokens,
          ingredient_count: ingredients.length,
          is_pagination: isAccumulating,
        });
      }

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

      // Update state tracking directly from API payload feedback
      setHasMore(data.hasMore ?? false);

      setRecipes((prevRecipes) => {
        if (!isAccumulating) return data.recipes || [];

        const seenNames = new Set(prevRecipes.map((r) => r.name.toLowerCase()));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uniqueIncoming = (data.recipes || []).filter((r: any) => {
          if (seenNames.has(r.name.toLowerCase())) {
            return false;
          }
          seenNames.add(r.name.toLowerCase());
          return true;
        });

        return [...prevRecipes, ...uniqueIncoming];
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to communicate with engine.");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-8 md:px-12 lg:px-16 max-w-[1536px] mx-auto space-y-16 md:text-[15px] lg:text-[16px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-serif tracking-tight text-brand-primary font-bold flex items-center">
            <Image
              src="/logo.png"
              alt="Craving Logo"
              width={45}
              height={45}
              priority
              className="object-contain"
            />
            <span className="-ml-2">raving</span>
          </h1>
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
              onSelectMealType={(type) => setSelectedMealType(type)}
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
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl text-sm md:text-base text-red-800 font-medium">
                {errorMsg}
              </div>
            )}
            {recipes.length > 0 && (
              <h3 className="text-base md:text-lg font-serif font-bold text-brand-secondary mb-6 tracking-tight">
                {recipes.length} Recipes found
              </h3>
            )}

            {!isLoading && recipes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-400 rounded-2xl bg-[#F4EDE3]/25 my-20 p-6 shadow-sm">
                <Utensils className="w-12 h-12 text-slate-600 mb-4" />
                <p className="font-serif text-xl md:text-2xl text-slate-800 font-bold tracking-tight text-center">
                  Your presentation plate is clean
                </p>
                <p className="text-sm md:text-base text-slate-600 mt-2 max-w-md text-center leading-relaxed">
                  Select your ingredients, cuisine, and meal type above to build
                  your custom recipe dashboard.
                </p>
              </div>
            )}

            {isLoading && recipes.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-slate-300 bg-white rounded-2xl h-[185px] w-full p-5 space-y-4 shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="h-5 bg-zinc-300 rounded-md w-3/4 animate-pulse" />
                      <div className="h-4 bg-zinc-200 rounded-md w-1/2 animate-pulse" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <div className="h-7 bg-zinc-200/80 rounded-lg w-20 animate-pulse" />
                      <div className="h-7 bg-zinc-200/80 rounded-lg w-20 animate-pulse" />
                    </div>
                  </div>
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

            {/* Managed Stream Pagination Layer Block */}
            {recipes.length > 0 && (
              <div className="mt-12 flex justify-center w-full">
                {hasMore ? (
                  <button
                    type="button"
                    onClick={() => fetchRecipes(true)}
                    disabled={isLoadingMore || isLoading}
                    className="text-brand-primary font-medium tracking-wide text-xs md:text-sm font-semibold uppercase hover:text-[#c94928] border border-brand-tertiary bg-white rounded-full px-8 py-4 shadow-sm transition-all flex items-center justify-center gap-2 min-w-[240px] cursor-pointer"
                  >
                    {isLoadingMore ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin text-brand-primary" />
                        <span>Generating recipes...</span>
                      </>
                    ) : (
                      <span>Generate More Recipes</span>
                    )}
                  </button>
                ) : (
                  // Clean termination notice when hasMore evaluates to false
                  <div className="flex flex-col items-center gap-1 py-3 text-slate-500 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs md:text-sm font-medium tracking-wide">
                      You&apos;ve reached the end of our current culinary
                      profile combinations.
                    </span>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      <hr className="border-brand-tertiary" />
      <SaaSMitrixFAQ />

      <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-brand-tertiary/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Craving App. Built by{" "}
          <a
            href="https://pratikgoswami.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary underline transition-colors"
          >
            Pratik Goswami
          </a>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="hover:text-brand-primary transition-colors underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          <a
            href="mailto:pratiksapps+craving@gmail.com"
            className="hover:text-brand-primary transition-colors underline underline-offset-2"
          >
            Support
          </a>
        </div>
      </footer>

      <RecipeModal
        recipe={selectedRecipe}
        userIngredients={ingredients}
        onClose={() => setSelectedRecipe(null)}
      />
      <FeedbackButton currentIngredients={ingredients} />
    </main>
  );
}
