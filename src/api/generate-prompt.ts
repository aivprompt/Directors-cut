// api/generate-prompt.ts

// api/generate-prompt.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// This is a placeholder for your real AI call.
// For now, it just combines the inputs based on the rules for each model.
const generateFinalPrompt = (targetModel: string, inputs: any): string => {
  let finalPrompt = '';

  switch (targetModel) {
    case 'Luma':
      const lumaParts = [ inputs.character, inputs.scene, inputs.lighting, inputs.cameraShot, inputs.cameraMotion, inputs.style ];
      finalPrompt = lumaParts.filter(Boolean).join(', ') + ` --gs ${inputs.guidance}`;
      break;

    case 'Midjourney':
      const mjKeywords = [inputs.shot, inputs.angle, inputs.lighting].filter(Boolean).join(', ');
      const mjMainPrompt = [inputs.prompt, mjKeywords].filter(Boolean).join(', ');
      const mjParams = [
        inputs.negativePrompt ? `--no ${inputs.negativePrompt}` : '',
        inputs.aspectRatio ? `--ar ${inputs.aspectRatio}` : '',
        inputs.version ? `--v ${inputs.version}` : '',
        inputs.chaos > 0 ? `--c ${inputs.chaos}` : '',
        inputs.stylize !== 100 ? `--s ${inputs.stylize}` : '',
        inputs.video ? '--video' : ''
      ].filter(Boolean).join(' ');
      finalPrompt = `${mjMainPrompt} ${mjParams}`.trim();
      break;
    
    case 'Veo3': // Note: In ActionButtons.tsx, the case is 'Veo 3+ Studio'. We'll need to align this.
    case 'Veo 3+ Studio':
      const veoVisual = [inputs.character, inputs.scene, inputs.shot, inputs.motion, inputs.lighting, inputs.style].filter(Boolean).join(', ');
      const veoAudio = [inputs.audioDesc && `Audio: ${inputs.audioDesc}`, inputs.dialogue && `Dialogue: "${inputs.dialogue}"`].filter(Boolean).join('. ');
      const veoParams = [inputs.negative && `--no ${inputs.negative}`, inputs.aspect && `--ar ${inputs.aspect}`, inputs.duration && `--duration ${inputs.duration}s`].filter(Boolean).join(' | ');
      finalPrompt = `${veoVisual}. ${veoAudio} ${veoParams}`.trim().replace(/\. /g, '. ').replace(/, \./g, '.');
      break;

    case 'Runway Gen4+ Studio':
      const runwayPrompt = [inputs.shotStyle !== "None" ? inputs.shotStyle : '', inputs.prompt].filter(Boolean).join(', ');
      const runwayCamera = [ inputs.pan !== "None" && `pan ${inputs.pan.toLowerCase()}`, inputs.tilt !== "None" && `tilt ${inputs.tilt.toLowerCase()}`, inputs.roll !== "None" && `roll ${inputs.roll.toLowerCase()}`, inputs.zoom !== "None" && `zoom ${inputs.zoom.toLowerCase()}` ].filter(Boolean).join(' ');
      const runwayParams = ` @camera{${runwayCamera}} --style ${inputs.style.toLowerCase()} --motion ${Math.round(inputs.motionAmount / 10)} --ar ${inputs.aspect} ${inputs.seed ? `--seed ${inputs.seed}` : ''} ${inputs.upscale ? '--upscale' : ''}`.trim();
      finalPrompt = `${runwayPrompt}${runwayParams}`;
      break;

    case 'Kling 2.0+ Studio':
      const klingKeywords = [inputs.style, inputs.angle, inputs.shot, inputs.motion].filter(Boolean).join(', ');
      const klingMain = `${inputs.character}, ${inputs.scene}, ${klingKeywords}`.trim();
      const klingParams = ` --ar ${inputs.aspectRatio} --realism ${inputs.realism}`;
      finalPrompt = klingMain + klingParams;
      break;

    case 'Pixverse Studio':
      const pixKeywords = [inputs.shot, inputs.lighting, inputs.style].filter(Boolean).join(', ');
      const pixPrompt = `${inputs.prompt}, ${pixKeywords}`.trim();
      const pixParams = [ inputs.negativePrompt ? `--no ${inputs.negativePrompt}` : '', inputs.seed ? `--seed ${inputs.seed}` : '', inputs.characterRef ? `--cref ${inputs.characterRef}` : '' ].filter(Boolean).join(' ');
      finalPrompt = `${pixPrompt} ${pixParams}`.trim();
      break;

    default:
      finalPrompt = "Model not configured in API.";
      break;
  }
  return finalPrompt;
};


export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { targetModel, inputs } = request.body;
    
    // In the future, you would replace this line with a real call to Google's Gemini AI,
    // sending the 'inputs' and a specific system prompt for the 'targetModel'.
    const finalPrompt = generateFinalPrompt(targetModel, inputs);

    response.status(200).json({ finalPrompt });

  } catch (error) {
    console.error("Error generating prompt:", error);
    response.status(500).json({ message: 'An error occurred while generating the prompt.' });
  }
}