// A Genkit Flow for providing AI-driven agricultural advice based on user questions.

'use server';

/**
 * @fileOverview A flow that answers user questions about farming problems.
 *
 * - getCropAdvice - A function that takes a user's question and returns AI-driven advice.
 * - CropAdviceInput - The input type for the getCropAdvice function.
 * - CropAdviceOutput - The return type for the getCropAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropAdviceInputSchema = z.object({
  question: z.string().describe('The farming problem question asked by the user.'),
  language: z.string().describe('The language for the translated advice (e.g., "en" for English, "ml" for Malayalam).'),
  location: z.string().optional().describe('The user\'s location (e.g., city, state) to provide region-specific advice.'),
  crop: z.string().optional().describe('The specific crop the user is asking about.'),
});
export type CropAdviceInput = z.infer<typeof CropAdviceInputSchema>;

const CropAdviceOutputSchema = z.object({
  englishAdvice: z.string().describe('The AI-driven advice in English.'),
  translatedAdvice: z.string().describe('The AI-driven advice translated into the specified language.'),
});
export type CropAdviceOutput = z.infer<typeof CropAdviceOutputSchema>;

export async function getCropAdvice(input: CropAdviceInput): Promise<CropAdviceOutput> {
  return cropAdviceFlow(input);
}

const cropAdvicePrompt = ai.definePrompt({
  name: 'cropAdvicePrompt',
  input: {schema: CropAdviceInputSchema},
  output: {schema: CropAdviceOutputSchema},
  prompt: `You are an expert agricultural advisor for Indian farmers. A farmer has asked the following question:

"{{question}}"

{{#if location}}The farmer is located in '{{location}}'.{{/if}}
{{#if crop}}The query is about their '{{crop}}' crop.{{/if}}

Provide detailed advice to help the farmer solve their problem. Your advice must be context-aware, considering the specified location and crop type if provided. Be specific and practical. Include steps that can be taken immediately.

Your primary response (englishAdvice) must be in English.
Then, translate your English advice into the language specified by the language code '{{language}}' and provide it in the translatedAdvice field.
`,
});

const cropAdviceFlow = ai.defineFlow(
  {
    name: 'cropAdviceFlow',
    inputSchema: CropAdviceInputSchema,
    outputSchema: CropAdviceOutputSchema,
  },
  async input => {
    try {
      const {output} = await cropAdvicePrompt(input);
      return output!;
    } catch (error) {
      console.error("Error in cropAdviceFlow:", error);
      // Re-throw the error so the client can handle it and show a message.
      throw error;
    }
  }
);
