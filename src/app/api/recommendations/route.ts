/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import OpenAI from "openai";
import crypto from "crypto";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

// Initialize Upstash Redis connections out of the request execution path
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Configure sliding rate limit window: Max 3 generations per minute per client IP
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  prefix: "@ratelimit/craving-recipes",
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Configuration error." },
        { status: 500 },
      );
    }

    // Capture verified edge platform proxy IP headers over standard user strings
    const ip = request.headers.get("x-real-ip") || 
               request.headers.get("x-vercel-proxied-for") || 
               "anonymous";

    // Distributed rate limit invocation check
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before generating more recipes." },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": String(remaining),
            "X-RateLimit-Reset": String(reset),
          }
        },
      );
    }

    const body = await request.json();
    const {
      ingredients,
      mealType,
      cuisines,
      isVegetarian,
      targetCalories,
      existingNames = [],
    } = body;

    const sanitized = ingredients
      .map((i: any) => String(i).trim().replace(/[<>]/g, "").toLowerCase())
      .filter((i: any) => i.length > 0);

    if (sanitized.length < 4 || sanitized.length > 15) {
      return NextResponse.json(
        {
          error: `Ingredient selection out of bounds. Please select between 4 and 15 items (Current: ${sanitized.length}).`,
        },
        { status: 400 },
      );
    }

    const targetCuisines =
      cuisines && cuisines.length > 0 ? cuisines.join(", ") : "Global/Any";
    const dynamicExclusions =
      existingNames.length > 0
        ? `CRITICAL EXCLUSIONS: Do NOT suggest any of these recipes: ${existingNames.join(", ")}.`
        : "";

    let attempts = 0;
    const maxAttempts = 2;
    const finalPayload = { recipes: [], hasMore: false };
    let usage;

    while (attempts < maxAttempts) {
      const executionTemperature = attempts === 0 ? 0.5 : 0.8;

      const systemPrompt = `
        You are an elite, Michelin-star global Chef AI. Create premium recipe suggestions matching constraints.
        CRITICAL INSTRUCTIONS:
        1. Respect cuisine profiles strictly: ${targetCuisines}.
        2. If Vegetarian Only is true, recipes MUST be strictly vegetarian.
        3. Provide exactly 8 distinct recipes matching the parameters.
        4. ${dynamicExclusions}
        5. INGREDIENT DENSITY RULE: You MUST focus heavily on the user's provided list. Ensure that every recipe relies primarily on these items, supplemented only by standard pantry basics (oils, seasonings, water).
      `;

      const userPrompt = `
        Suggest 8 global recipes matching these parameters:
        - Main Ingredients Available: ${sanitized.join(", ")}
        - Meal Category: ${mealType}
        - Target Cuisines: ${targetCuisines}
        - Vegetarian Only: ${isVegetarian ? "YES" : "NO"}
        ${targetCalories ? `- Target Calories: Around ${Number(targetCalories)} kcal` : ""}
      `;

      const jsonSchema = {
        type: "object",
        properties: {
          recipes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                cookingTime: { type: "string" },
                calories: { type: "number" },
                cuisine: { type: "string" },
                tags: { type: "array", items: { type: "string" } },
                macros: {
                  type: "object",
                  properties: {
                    protein: { type: "string" },
                    carbs: { type: "string" },
                    fats: { type: "string" },
                  },
                  required: ["protein", "carbs", "fats"],
                  additionalProperties: false,
                },
                specialtyWarning: { type: "string" },
                ingredientsUsed: { type: "array", items: { type: "string" } },
                instructions: { type: "array", items: { type: "string" } },
              },
              required: [
                "id",
                "name",
                "cookingTime",
                "calories",
                "cuisine",
                "tags",
                "macros",
                "specialtyWarning",
                "ingredientsUsed",
                "instructions",
              ],
              additionalProperties: false,
            },
          },
          hasMore: { type: "boolean" },
        },
        required: ["recipes", "hasMore"],
        additionalProperties: false,
      };

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: "recipes", strict: true, schema: jsonSchema },
        },
        temperature: executionTemperature,
      });

      usage = response.usage || {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      };

      try {
        const parsedContent = JSON.parse(
          response.choices[0].message.content || "{}",
        );

        if (parsedContent.recipes && parsedContent.recipes.length > 0) {
          const validatedRecipes = parsedContent.recipes
            .filter((recipe: any) => {
              const isDuplicate = existingNames.some(
                (name: string) =>
                  name.toLowerCase() === recipe.name.toLowerCase(),
              );
              if (isDuplicate) return false;

              const recipeIngredients = recipe.ingredientsUsed.map(
                (i: string) => i.toLowerCase(),
              );

              const matchedCount = sanitized.reduce(
                (count: number, userIng: string) => {
                  const isUsed = recipeIngredients.some((recipeIng: string) =>
                    recipeIng.includes(userIng),
                  );
                  return isUsed ? count + 1 : count;
                },
                0,
              );

              const matchPercentage = matchedCount / sanitized.length;
              return matchPercentage >= 0.6;
            })
            .map((recipe: any) => ({
              ...recipe,
              id: crypto.randomUUID(),
            }));

          if (validatedRecipes.length > 0) {
            finalPayload.recipes = validatedRecipes;
            break;
          } else if (attempts === 0) {
            // PROMPT CIRCUIT BREAKER: If structural matching filters yield an empty set,
            // abort right away instead of running an extra billing cycle loop
            break;
          }
        }
      } catch (parseError) {
        console.error("JSON check breakdown:", parseError);
      }

      attempts++;
    }

    if (finalPayload.recipes && finalPayload.recipes.length > 0) {
      finalPayload.hasMore = finalPayload.recipes.length >= 4;
    } else {
      finalPayload.hasMore = false;
    }

    return NextResponse.json({
      ...finalPayload,
      usage: {
        inputTokens: usage?.prompt_tokens,
        outputTokens: usage?.completion_tokens,
        totalTokens: usage?.total_tokens,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "System failed to process request." },
      { status: 500 },
    );
  }
}