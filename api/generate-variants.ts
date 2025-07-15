import type { VercelRequest, VercelResponse } from '@vercel/node'; // Line 1
import { GoogleGenerativeAI } from '@google/generative-ai'; // Line 2

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const systemInstruction = `You are a creative writing assistant for a film director. Your task is to take a user's basic idea and enhance it into three more vivid, cinematic, and descriptive alternatives for an AI video prompt. Focus on strong verbs, evocative adjectives, and sensory details. Return the response ONLY as a valid JSON array of three strings.

Example:
User Input: "a man on a beach"
Your Output: ["A lone figure silhouetted against a fiery sunset on a windswept, desolate beach.", "A weathered fisherman mending his nets on a shore littered with driftwood and seaweed.", "A joyful tourist building a sandcastle with his laughing child on a sun-drenched beach."]`;

export default async function handler( // This is the export default for Vercel
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { inputText } = request.body;
    if (!inputText) {
      return response.status(400).json({ message: 'inputText is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest", systemInstruction });
    const result = await model.generateContent(inputText);
    const aiResponse = result.response;
    const variants = JSON.parse(aiResponse.text());
    
    response.status(200).json({ variants });

  } catch (error) {
    console.error("Error in generate-variants:", error);
    response.status(500).json({ message: 'An error occurred while generating suggestions.' });
  }
}