import React, { useRef } from "react";
import { Recipe } from "@/types";
import { X, Clock, Flame, Download } from "lucide-react";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
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
    link.href = url;
    link.setAttribute("download", `${recipe.name.toLowerCase().replace(/\s+/g, "-")}-recipe.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      ref={overlayRef}
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-brand-secondary/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-default"
    >
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col cursor-default">
        <div className="bg-brand-tertiary/40 p-4 flex justify-between items-center border-b border-brand-tertiary">
          <span className="font-serif italic text-xs text-brand-secondary/60">Bespoke Recipe Detail Matrix</span>
          <button onClick={onClose} className="bg-white hover:bg-slate-50 border border-brand-tertiary text-brand-secondary text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
            <X className="w-4 h-4" /> Back to Discover
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto space-y-5 flex-1">
          <div>
            <h3 className="text-3xl font-serif font-bold text-brand-secondary tracking-tight mb-2">{recipe.name}</h3>
            <div className="flex gap-4 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.cookingTime}</div>
              <div className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-brand-primary" /> {recipe.calories} kcal</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-brand-tertiary/20 p-2.5 rounded-xl border text-center text-xs font-semibold">
            <div><span className="text-slate-500 block">Protein</span>{recipe.macros.protein}</div>
            <div><span className="text-slate-500 block">Carbs</span>{recipe.macros.carbs}</div>
            <div><span className="text-slate-500 block">Fats</span>{recipe.macros.fats}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-5 space-y-2">
              <h4 className="text-sm font-serif font-bold text-brand-secondary border-b pb-1">Ingredients</h4>
              <ul className="space-y-2">
                {recipe.ingredientsUsed.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <input type="checkbox" className="mt-0.5 rounded accent-brand-primary cursor-pointer" id={`ing-${i}`} />
                    <label htmlFor={`ing-${i}`} className="cursor-pointer select-none">{item}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-7 space-y-2">
              <h4 className="text-sm font-serif font-bold text-brand-secondary border-b pb-1">Instructions</h4>
              <ol className="space-y-3">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="bg-brand-primary/10 text-brand-primary font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px]">{idx + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-brand-tertiary flex justify-end">
          <button onClick={handleExportText} className="bg-brand-primary text-white font-medium text-xs px-4 py-2 rounded-xl hover:bg-[#c94928] flex items-center gap-2 shadow-sm cursor-pointer">
            <Download className="w-4 h-4" /> Export Recipe (.txt)
          </button>
        </div>
      </div>
    </div>
  );
}