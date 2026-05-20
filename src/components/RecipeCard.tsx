import React from "react";
import { Recipe } from "@/types";
import { Clock, Flame, ShieldAlert } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  return (
    <article 
      onClick={onSelect}
      className="bg-white border border-brand-tertiary rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all flex flex-col justify-between h-full cursor-pointer group animate-in fade-in duration-200"
    >
      <div className="space-y-3">
        {/* Critical Top Bar alerts only */}
        {recipe.specialtyWarning && recipe.specialtyWarning.trim() !== "" && (
          <div className="bg-red-50 text-red-800 text-xs md:text-sm font-bold px-2 py-1 rounded border border-red-200 flex items-center gap-1.5 w-fit">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 flex-shrink-0" /> {recipe.specialtyWarning}
          </div>
        )}

        <h4 className="text-xl font-serif font-bold text-brand-secondary tracking-tight group-hover:text-brand-primary transition-colors leading-tight">
          {recipe.name}
        </h4>

        {/* Accessibility Update: Shifted labels to text-xs on mobile scaling cleanly to text-sm layout metrics on desktop */}
        <div className="flex flex-wrap gap-1.5 items-center pt-0.5 text-xs md:text-sm font-bold">
          {recipe.tags?.map((tag) => (
            <span key={tag} className={`px-2 py-0.5 rounded ${tag.toLowerCase() === 'veg' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-700'}`}>
              {tag}
            </span>
          ))}
          <span className="bg-brand-tertiary/60 text-brand-secondary font-semibold px-2 py-0.5 rounded">
            {recipe.cuisine}
          </span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-brand-tertiary flex items-center justify-between text-sm text-slate-700">
        <div className="flex items-center gap-1 font-semibold text-brand-secondary">
          <Clock className="w-4 h-4 text-slate-500" /> {recipe.cookingTime}
        </div>
        <div className="flex items-center gap-1 font-semibold text-brand-secondary">
          <Flame className="w-4 h-4 text-brand-primary" /> {recipe.calories} kcal
        </div>
        <div className="flex gap-1.5 text-xs md:text-sm bg-brand-tertiary/40 px-2 py-1 rounded text-slate-800 font-medium">
          <span>P: <strong className="font-bold text-slate-900">{recipe.macros.protein}</strong></span>
          <span>C: <strong className="font-bold text-slate-900">{recipe.macros.carbs}</strong></span>
          <span>F: <strong className="font-bold text-slate-900">{recipe.macros.fats}</strong></span>
        </div>
      </div>
    </article>
  );
}