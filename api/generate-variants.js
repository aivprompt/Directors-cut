const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { inputText } = req.body;
    if (!inputText) {
      return res.status(400).json({ error: 'Missing inputText in request body' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('Server Configuration Error: Missing GOOGLE_API_KEY environment variable.');
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    
    const prompt = `You are a creative writing assistant for a film director. Your task is to take a user's basic idea and enhance it into three more vivid, cinematic, and descriptive alternatives for an AI video prompt. Focus on strong verbs, evocative adjectives, and sensory details. Return the response ONLY as a valid JSON array of three strings.

    User Input: "${inputText}"
    Your Output:`;

    const result = await model.generateContent(prompt);
    const suggestions = JSON.parse(result.response.text());

    return res.status(200).json({ variants: suggestions });
  } catch (error) {
    console.error('API Error in generate-variants:', error);
    return res.status(500).json({ error: `Failed to get suggestions: ${error.message}` });
  }
};