// /api/generate-prompt.js

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// This helper function builds a detailed prompt from all the user's inputs
const createDetailedPrompt = (inputs) => {
  let prompt = `Create a detailed, high-quality video prompt based on the following elements:\n`;
  if (inputs.character) prompt += `- Character & Action: ${inputs.character}\n`;
  if (inputs.scene) prompt += `- Scene & Environment: ${inputs.scene}\n`;
  if (inputs.style) prompt += `- Artistic Style: ${inputs.style}\n`;
  if (inputs.shot) prompt += `- Camera Shot: ${inputs.shot}\n`;
  if (inputs.motion) prompt += `- Camera Motion: ${inputs.motion}\n`;
  if (inputs.lighting) prompt += `- Lighting Style: ${inputs.lighting}\n`;
  if (inputs.audioDesc) prompt += `- Audio Description: ${inputs.audioDesc}\n`;
  if (inputs.dialogue) prompt += `- Dialogue: "${inputs.dialogue}"\n`;
  if (inputs.negative) prompt += `- Negative Prompt (what to avoid): ${inputs.negative}\n`;
  prompt += `The final video should be ${inputs.duration} seconds long with a ${inputs.aspect} aspect ratio.`;
  return prompt;
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // *** THIS IS THE FIX: We now correctly get the 'inputs' directly from the request body. ***
    const { inputs } = request.body;
    if (!inputs) {
      return response.status(400).json({ error: 'Invalid payload provided. Missing inputs.' });
    }

    // 1. Create the detailed prompt for the AI
    const detailedPrompt = createDetailedPrompt(inputs);

    // 2. Set up the AI model with the corrected model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    // 3. Call the AI to generate the final prompt
    const result = await model.generateContent(detailedPrompt);
    const apiResponse = await result.response;
    const finalPrompt = apiResponse.text();

    // 4. Send the successful response back
    return response.status(200).json({ finalPrompt });

  } catch (error) {
    console.error('Error in generate-prompt function:', error);
    return response.status(500).json({ error: 'Failed to generate final prompt.' });
  }
}