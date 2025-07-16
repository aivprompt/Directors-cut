// /api/generate-variants.js

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Your system instruction prompt
const systemInstruction = `You are a creative writing assistant...`; // Make sure to put your full prompt back here

export default async function handler(request, response) {
  // Check for the correct method
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { text } = request.body; // Assuming you send a 'text' field in the body

    if (!text) {
      return response.status(400).json({ error: 'No text prompt provided.' });
    }
    
    // The model name has been updated to a current, valid model.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", systemInstruction });
    
    const result = await model.generateContent(text);
    const apiResponse = await result.response;
    const suggestions = apiResponse.text();

    // Send the successful response back to the client
    return response.status(200).json({ suggestions });

  } catch (error) {
    console.error('Error in generate-variants function:', error);
    return response.status(500).json({ error: 'Failed to get suggestions.' });
  }
}