"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { getFeedbackLink } from "@/utils/feedback";

interface FeedbackButtonProps {
  currentIngredients?: string[];
}

export default function FeedbackButton({ currentIngredients = [] }: FeedbackButtonProps) {
  const [isWiggling, setIsWiggling] = useState(false);

  useEffect(() => {
    // Fire a quick wiggle loop interval every 18 seconds
    const interval = setInterval(() => {
      setIsWiggling(true);

      // Remove the class after the 600ms keyframe finishes so it can re-animate later
      const timer = setTimeout(() => {
        setIsWiggling(false);
      }, 600);

      return () => {
        clearTimeout(timer);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleFeedbackClick = () => {
    const url = getFeedbackLink({
      type: "General Feedback",
      details: "Hi! I am exploring Craving and wanted to share that...",
      ingredients: currentIngredients,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleFeedbackClick}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-brand-primary text-white px-4 py-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm font-semibold cursor-pointer border border-brand-primary/10 ${
        isWiggling ? "animate-wiggle" : ""
      }`}
      aria-label="Give feedback (opens in a new tab)"
    >
      <MessageSquare className="w-4 h-4" />
      <span>Feedback</span>
    </button>
  );
}