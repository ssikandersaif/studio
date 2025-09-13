import { config } from 'dotenv';
config();

import '@/ai/flows/voice-query.ts';
import '@/ai/flows/ai-crop-advice.ts';
import '@/ai/flows/image-based-disease-id.ts';
import '@/ai/flows/speech-to-text.ts';
import '@/ai/flows/weather-flow.ts';
