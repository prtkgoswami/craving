import React, { useRef } from "react";
import { Recipe } from "@/types";
import { X, Clock, Flame, Download, ShieldAlert } from "lucide-react";

interface RecipeModalProps {
  recipe: Recipe | null;
  userIngredients: string[];
  onClose: () => void;
}

export default function RecipeModal({ recipe, userIngredients, onClose }: RecipeModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  if (!recipe) return null;

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleExportText = () => {
    const content = `RECIPE: ${recipe.name}\nCuisine: ${recipe.cuisine}\nTime: ${recipe.cookingTime} | Calories: ${recipe.calories} kcal\nMacros: Protein ${recipe.macros.protein}, Carbs ${recipe.macros.carbs}, Fats ${recipe.macros.fats}\n\nINGREDIENTS:\n${recipe.ingredientsUsed.map(i => `- ${i}`).join("\n")}\n\nINSTRUCTIONS:\n${recipe.instructions.map((step, idx) => `${idx + 1}. ${step}`).join("\n")}\n\nGenerated via Craving.`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = recipe.name.toLowerCase().replace(/\s+/g, "-");
    link.href = url;
    link.setAttribute("download", `${filename}-recipe.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      ref={overlayRef}
      onClick={handleOutsideClick}
      className="fixed h-screen inset-0 bg-brand-secondary/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-default"
    >
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col cursor-default">
        {/* Preserved: Original brand-tertiary headers */}
        <div className="bg-brand-tertiary/40 p-4 flex justify-between items-center border-b border-brand-tertiary">
          <span className="font-serif italic text-sm text-slate-700 font-medium">Bespoke Recipe Detail Matrix</span>
          <button onClick={onClose} className="bg-white hover:bg-slate-50 border border-brand-tertiary text-brand-secondary text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
            <X className="w-4 h-4" /> Back to Discover
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto space-y-5 flex-1">
          <div className="space-y-2.5">
            {/* Added: High-contrast Specialty Warning block matching RecipeCard structure */}
            {recipe.specialtyWarning && recipe.specialtyWarning.trim() !== "" && (
              <div className="bg-red-50 text-red-800 text-sm font-bold px-3 py-1.5 rounded-lg border border-red-200 flex items-center gap-2 w-fit">
                <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" /> 
                <span>{recipe.specialtyWarning}</span>
              </div>
            )}

            <h3 className="text-3xl font-serif font-bold text-brand-secondary tracking-tight">{recipe.name}</h3>
            
            {/* Accessibility: Upped font metrics to clear slate-700 configurations */}
            <div className="flex gap-4 text-sm text-slate-700 font-semibold">
              <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-slate-500" /> {recipe.cookingTime}</div>
              <div className="flex items-center gap-1"><Flame className="w-4 h-4 text-brand-primary" /> {recipe.calories} kcal</div>
            </div>
          </div>

          {/* Preserved layout: Adjusted text variables to target clearer accessibility text limits */}
          <div className="grid grid-cols-3 gap-2 bg-brand-tertiary/20 p-2.5 rounded-xl border border-brand-tertiary/60 text-center text-sm font-bold text-slate-800">
            <div><span className="text-slate-600 font-medium block text-xs uppercase tracking-wider mb-0.5">Protein</span>{recipe.macros.protein}</div>
            <div><span className="text-slate-600 font-medium block text-xs uppercase tracking-wider mb-0.5">Carbs</span>{recipe.macros.carbs}</div>
            <div><span className="text-slate-600 font-medium block text-xs uppercase tracking-wider mb-0.5">Fats</span>{recipe.macros.fats}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-5 space-y-2">
              <h4 className="text-base font-serif font-bold text-brand-secondary border-b pb-1">Ingredients</h4>
              <ul className="space-y-2">
                {recipe.ingredientsUsed.map((item, i) => {
                  const normalizedItem = item.toLowerCase();
                  const isProvided = userIngredients.some(userIng => 
                    normalizedItem.includes(userIng.toLowerCase().trim())
                  );

                  return (
                    <li 
                      key={i} 
                      className={`flex flex-col gap-1 p-1.5 rounded-lg transition-colors ${
                        !isProvided ? "bg-amber-50 border border-amber-200" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                        <input type="checkbox" className="mt-1 rounded accent-brand-primary w-4 h-4 cursor-pointer" id={`ing-${i}`} />
                        <label htmlFor={`ing-${i}`} className="cursor-pointer select-none flex-1 leading-tight">{item}</label>
                      </div>
                      
                      {!isProvided && (
                        /* Accessibility Fix: Lifted to high-visibility text-amber-900 (12px on mobile, 14px on desktop) */
                        <span className="text-xs md:text-sm text-amber-900 font-bold pl-6">
                          * Shopping item (not in your selection)
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="md:col-span-7 space-y-2">
              <h4 className="text-base font-serif font-bold text-brand-secondary border-b pb-1">Instructions</h4>
              <ol className="space-y-3">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-slate-800 font-medium leading-relaxed">
                    <span className="bg-brand-primary/10 text-brand-primary font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">{idx + 1}</span>
                    <p className="flex-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-brand-tertiary flex justify-end">
          <button onClick={handleExportText} className="bg-brand-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-[#c94928] flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <Download className="w-4 h-4" /> Export Recipe (.txt)
          </button>
        </div>
      </div>
    </div>
  );
}