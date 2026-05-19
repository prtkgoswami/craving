"use client";

import React from "react";
import { Sparkles, Sliders, Shield, Utensils } from "lucide-react";

export default function SaaSMitrixFAQ() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
      {/* Editorial/Positioning Context Anchor */}
      <div className="lg:col-span-4 space-y-3">
        <h2 className="text-2xl font-serif font-bold text-brand-secondary tracking-tight">
          The AI Engine for Intelligent Meal Assembly
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Craving replaces traditional static recipe searching with a precision macro-balancing matrix, parsing specific culinary parameters with instant, dynamically optimized custom configurations.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-brand-secondary text-white">Macro Calculator</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-brand-secondary text-white">Dynamic Generation</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-brand-secondary text-white">Pantry Mapping</span>
        </div>
      </div>

      {/* Semantic Key-Value Information Blocks for Crawlers */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-brand-tertiary rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <h3>How does the ingredient pantry router operate?</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The algorithm parses string-based arrays of target ingredients, isolating essential protein and macro assets while simultaneously listing missing non-pantry items automatically inside dynamic warning tags.
          </p>
        </div>

        <div className="bg-white border border-brand-tertiary rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
            <Sliders className="w-4 h-4 flex-shrink-0" />
            <h3>Can I cross-reference multi-cuisine filters simultaneously?</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Yes. The core state-handling architecture accepts a vectorized array of multiple selected global cuisines, allowing users to combine diverse regional flavor profiles into a single unified generated layout.
          </p>
        </div>

        <div className="bg-white border border-brand-tertiary rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
            <Shield className="w-4 h-4 flex-shrink-0" />
            <h3>Are nutritional micro-values calculated deterministically?</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our system applies weight-mapping metrics against targeted meal types (Breakfast, Dinner, etc.) to calculate precise, reliable estimations across protein, carbohydrate, and dietary fat limits.
          </p>
        </div>

        <div className="bg-white border border-brand-tertiary rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
            <Utensils className="w-4 h-4 flex-shrink-0" />
            <h3>Can I build custom tools using this programmatic schema?</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Craving operates natively using clean JSON-structured endpoints, positioning the platform perfectly as an intuitive, API-ready single-page application tool optimized for direct discovery.
          </p>
        </div>
      </div>
    </section>
  );
}