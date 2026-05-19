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
          <div className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-1 rounded border border-red-200 flex items-center gap-1 w-fit">
            <ShieldAlert className="w-3 h-3" /> {recipe.specialtyWarning}
          </div>
        )}

        <h4 className="text-xl font-serif font-bold text-brand-secondary tracking-tight group-hover:text-brand-primary transition-colors leading-tight">
          {recipe.name}
        </h4>

        {/* Tags container repositioned directly beneath the title */}
        <div className="flex flex-wrap gap-1.5 items-center pt-0.5">
          {recipe.tags?.map((tag) => (
            <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded ${tag.toLowerCase() === 'veg' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-700'}`}>
              {tag}
            </span>
          ))}
          <span className="text-[10px] bg-brand-tertiary/60 text-brand-secondary font-medium px-2 py-0.5 rounded">
            {recipe.cuisine}
          </span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-brand-tertiary flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1 font-medium text-brand-secondary">
          <Clock className="w-3.5 h-3.5 text-slate-400" /> {recipe.cookingTime}
        </div>
        <div className="flex items-center gap-1 font-medium text-brand-secondary">
          <Flame className="w-3.5 h-3.5 text-brand-primary" /> {recipe.calories} kcal
        </div>
        <div className="flex gap-1.5 text-[10px] bg-brand-tertiary/40 px-2 py-1 rounded text-slate-500">
          <span>P: <strong>{recipe.macros.protein}</strong></span>
          <span>C: <strong>{recipe.macros.carbs}</strong></span>
          <span>F: <strong>{recipe.macros.fats}</strong></span>
        </div>
      </div>
    </article>
  );
}