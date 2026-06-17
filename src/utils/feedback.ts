interface PreFilledFeedbackOptions {
  type?: "Bug Report" | "Feature Request" | "General Feedback";
  details?: string;
  ingredients?: string[];
}

export function getFeedbackLink({ type = "General Feedback", details = "", ingredients = [] }: PreFilledFeedbackOptions = {}) {
  const BASE_URL = "https://docs.google.com/forms/d/e/1FAIpQLScAfOJ1_JVBhtRWC5dQQdhCsmgBz1gBMafQEcjVA81tOX42jQ/viewform";
  
  const params = new URLSearchParams();
  params.append("usp", "pp_url");
  
  // Map these exact string keys to match the entry numbers from Step 1
  params.append("entry.535866987", type === "Bug Report" ? "Bug Report" : type === "Feature Request" ? "Feature Request" : "General Question / Feedback");
  params.append("entry.1275233867", details);
  params.append("entry.327882558", ingredients.length > 0 ? ingredients.join(", ") : "");

  return `${BASE_URL}?${params.toString()}`;
}