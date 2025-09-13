// src/ai/flows/voice-query.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for processing voice queries in local languages related to farming.
 *
 * It uses the Gemini API to understand the voice query and provide relevant information to the farmer.
 *
 * - voiceQueryForFarming - A function that accepts voice input and returns farming advice.
 * - VoiceQueryForFarmingInput - The input type for the voiceQueryForFarming function.
 * - VoiceQueryForFarmingOutput - The return type for the voiceQueryForFarming function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const VoiceQueryForFarmingInputSchema = z.object({
  voiceQuery: z
    .string()
    .describe(
      'The voice query from the farmer, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
  language: z.string().describe('The language of the voice query.'),
});
export type VoiceQueryForFarmingInput = z.infer<typeof VoiceQueryForFarmingInputSchema>;

const VoiceQueryForFarmingOutputSchema = z.object({
  answer: z.string().describe('The answer to the farming question.'),
});
export type VoiceQueryForFarmingOutput = z.infer<typeof VoiceQueryForFarmingOutputSchema>;

export async function voiceQueryForFarming(input: VoiceQueryForFarmingInput): Promise<VoiceQueryForFarmingOutput> {
  return voiceQueryForFarmingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceQueryForFarmingPrompt',
  input: {schema: VoiceQueryForFarmingInputSchema},
  output: {schema: VoiceQueryForFarmingOutputSchema},
  prompt: `You are an agricultural expert specializing in providing advice to farmers in India.

You will be provided with a voice query from a farmer in their local language, and your task is to provide a helpful and informative answer in the same language.

Voice Query: {{{voiceQuery}}}
Language: {{{language}}}

Answer: `,
});

const voiceQueryForFarmingFlow = ai.defineFlow(
  {
    name: 'voiceQueryForFarmingFlow',
    inputSchema: VoiceQueryForFarmingInputSchema,
    outputSchema: VoiceQueryForFarmingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
