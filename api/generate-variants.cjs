const { VercelRequest, VercelResponse } = require('@vercel/node');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const systemInstruction = `You are a creative writing assistant...`; // Your detailed instruction

module.exports = async (request, response) => {
  // Your existing async function logic here...
};