// api/generate-prompt.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Initialize the AI with your secret key from Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Our "Instruction Manuals" for each model
const systemPrompts = {
  Midjourney: `You are 'MJ-Director', an expert prompt engineer for Midjourney video. Convert the user's JSON input into a single, powerful prompt string. Rules: 1. Begin with the main prompt text. 2. Append all descriptive keywords (shot, angle, lighting) after the main prompt, separated by commas. 3. Append all technical parameters (--ar, --v, --s, etc.) at the very end. 4. Always include the --video parameter.`,
  Luma: `You are 'Luma-Maestro', an AI director specializing in creating fluid, dream-like video prompts for Luma Dream Machine. Convert the user's structured input into a single, highly descriptive narrative paragraph. Weave all elements into one cohesive sentence. Append the --gs [value] parameter at the end.`,
  // Add the other 4 system prompts here...
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { targetModel, inputs } = request.body;
    
    // Select the correct instruction manual
    const systemInstruction = systemPrompts[targetModel] || "Combine the user's inputs into a descriptive prompt.";

    // Configure the AI model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      systemInstruction,
    });
    
    // Convert user's inputs into a simple string for the AI
    const userInputString = JSON.stringify(inputs);

    // Call the AI
    const result = await model.generateContent(userInputString);
    const aiResponse = result.response;
    const finalPrompt = aiResponse.text();

    // Send the AI-generated prompt back to the browser
    response.status(200).json({ finalPrompt });

  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Error communicating with the AI model.' });
  }
}