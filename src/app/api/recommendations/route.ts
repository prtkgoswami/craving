import { NextResponse } from "next/server";
import OpenAI from "openai";
import { RecommendationRequest } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "Configuration error." }, { status: 500 });

    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    if (rateLimitMap.has(ip) && now - (rateLimitMap.get(ip) || 0) < 3000) {
      return NextResponse.json({ error: "Please wait a moment between requests." }, { status: 429 });
    }
    rateLimitMap.set(ip, now);

    const body: RecommendationRequest = await request.json();
    const { ingredients, mealType, cuisines, isVegetarian, targetCalories, skipCount } = body;

    const sanitized = ingredients.map(i => String(i).trim().replace(/[<>]/g, "")).filter(i => i.length > 0);
    if (sanitized.length === 0) return NextResponse.json({ error: "Invalid ingredients." }, { status: 400 });

    const targetCuisines = cuisines && cuisines.length > 0 ? cuisines.join(", ") : "Global/Any";

    const systemPrompt = `
      You are an elite, Michelin-star global Chef AI. Create premium, delicious recipe suggestions matching the requested constraints.
      CRITICAL INSTRUCTIONS:
      1. Respect the selected cuisine profiles strictly: ${targetCuisines}. Only suggest recipes from these cuisines.
      2. If Vegetarian Only is true, ALL suggested recipes MUST be strictly vegetarian (no meat, poultry, fish, or seafood).
      3. For each recipe, include appropriate tags in the "tags" array (e.g., "Veg", "Vegan", "Dairy-Free", "Gluten-Free").
      4. Provide exactly 8 distinct recipes matching the parameters.
      5. Explicitly flag missing non-pantry essentials in the "specialtyWarning" field.
    `;

    const userPrompt = `
      Suggest 8 global recipes matching these parameters:
      - Main Ingredients: ${sanitized.join(", ")}
      - Meal Category: ${mealType}
      - Target Cuisines: ${targetCuisines}
      - Vegetarian Only: ${isVegetarian ? "YES" : "NO"}
      ${targetCalories ? `- Target Calories: Around ${Number(targetCalories)} kcal` : ""}
      - Batch Offset: Request batch #${Number(skipCount) / 8 + 1}. Ensure they are entirely unique.
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
                properties: { protein: { type: "string" }, carbs: { type: "string" }, fats: { type: "string" } },
                required: ["protein", "carbs", "fats"],
                additionalProperties: false
              },
              specialtyWarning: { type: "string" },
              ingredientsUsed: { type: "array", items: { type: "string" } },
              instructions: { type: "array", items: { type: "string" } }
            },
            required: ["id", "name", "cookingTime", "calories", "cuisine", "tags", "macros", "specialtyWarning", "ingredientsUsed", "instructions"],
            additionalProperties: false
          }
        },
        hasMore: { type: "boolean" }
      },
      required: ["recipes", "hasMore"],
      additionalProperties: false
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      response_format: { type: "json_schema", json_schema: { name: "recipes", strict: true, schema: jsonSchema } },
      temperature: 0.7,
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content || "{}"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: "System failed to process request." }, { status: 500 });
  }
}