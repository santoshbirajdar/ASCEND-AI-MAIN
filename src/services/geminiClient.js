import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- FEATURE 1: CHATBOT (AI Coach) ---
export const getAICoachResponse = async (userMessage) => {
  try {
    const prompt = `
      You are an expert Career Coach named "Ascend AI". 
      Your goal is to help students navigate tech careers.
      Keep answers concise, encouraging, and actionable.
      
      User asks: "${userMessage}"
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later!";
  }
};

// --- FEATURE 2: STUDY PLAN GENERATOR (Dashboard) ---
export const generateStructuredPlan = async (goal, hoursPerWeek, currentLevel) => {
  try {
    const prompt = `
      Act as a strict tech career mentor. Create a 4-week accelerated study plan for a student wanting to learn: "${goal}".
      They have ${hoursPerWeek} hours/week available. Their current level is: ${currentLevel}.

      Requirements:
      1. Break down the plan into Weeks.
      2. For each week, provide 3-5 specific, actionable tasks (e.g., "Build a To-Do list app", not "Learn React").
      3. OUTPUT FORMAT: strict JSON only. No markdown text. No intro.
      
      Structure:
      {
        "plan_title": "Title of plan",
        "weeks": [
          {
            "week_number": 1,
            "focus_topic": "Topic Name",
            "tasks": [
              { "day": 1, "task": "Specific task 1" },
              { "day": 2, "task": "Specific task 2" }
            ]
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown code blocks if Gemini adds them
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Plan Generation Error:", error);
    return null;
  }
};