"use client";

import React from "react";
import { Sparkles, Sliders, Shield, Utensils } from "lucide-react";

export default function SaaSMitrixFAQ() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
      {/* Product Positioning & Brand Intro */}
      <div className="lg:col-span-4 space-y-3">
        <h2 className="text-2xl font-serif font-bold text-brand-secondary tracking-tight">
          Smart Meal Ideas Built for Your Kitchen
        </h2>
        {/* Contrast fix: text-slate-600 -> text-slate-700 / font-medium */}
        <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
          Craving is an intelligent kitchen tool designed to take the guesswork out of meal planning. By matching your available ingredients with your personal calorie goals, it helps you discover tailored recipes in seconds.
        </p>
        <div className="flex flex-wrap gap-2 pt-2 text-xs md:text-sm font-bold">
          <span className="px-2.5 py-1 rounded-md bg-brand-secondary text-white">Smart Matcher</span>
          <span className="px-2.5 py-1 rounded-md bg-brand-secondary text-white">Custom Calories</span>
          <span className="px-2.5 py-1 rounded-md bg-brand-secondary text-white">Pantry Planner</span>
        </div>
      </div>

      {/* User-Centric Q&A Grid */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-brand-tertiary rounded-xl p-5 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-brand-primary font-bold text-sm md:text-base">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <h3>How does the ingredient search work?</h3>
          </div>
          {/* Accessibility layout: text-xs updated to text-sm on desktop frameworks */}
          <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
            Simply add what you have in your fridge or pantry. The app prioritizes recipes centered around your main ingredients and clearly flags any basic extras you might need, like specific herbs or condiments.
          </p>
        </div>

        <div className="bg-white border border-brand-tertiary rounded-xl p-5 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-brand-primary font-bold text-sm md:text-base">
            <Sliders className="w-4 h-4 flex-shrink-0" />
            <h3>Can I filter by multiple global cuisines at once?</h3>
          </div>
          <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
            Absolutely. You can select multiple cuisine styles simultaneously—such as pairing Italian and Indian options—to see a diverse set of flavors that match your ingredients.
          </p>
        </div>

        <div className="bg-white border border-brand-tertiary rounded-xl p-5 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-brand-primary font-bold text-sm md:text-base">
            <Shield className="w-4 h-4 flex-shrink-0" />
            <h3>How accurate are the calorie and macro estimates?</h3>
          </div>
          <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
            All nutritional breakdowns are calculated based on standard serving sizes and regional meal types to give you reliable estimates for tracking your daily protein, carbs, and fats.
          </p>
        </div>

        <div className="bg-white border border-brand-tertiary rounded-xl p-5 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-brand-primary font-bold text-sm md:text-base">
            <Utensils className="w-4 h-4 flex-shrink-0" />
            <h3>Is this tool free to use for daily meal planning?</h3>
          </div>
          <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
            Yes! Craving is built as an open, accessible web app to help home cooks reduce food waste and hit their fitness goals without dealing with paywalls or cluttered food blogs.
          </p>
        </div>
      </div>
    </section>
  );
}