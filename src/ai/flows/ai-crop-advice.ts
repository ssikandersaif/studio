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
});
export type CropAdviceInput = z.infer<typeof CropAdviceInputSchema>;

const CropAdviceOutputSchema = z.object({
  advice: z.string().describe('The AI-driven advice to solve the farming problem.'),
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

{{question}}

Provide detailed advice to help the farmer solve their problem. Be specific and practical. Include steps that can be taken immediately.`,
});

const cropAdviceFlow = ai.defineFlow(
  {
    name: 'cropAdviceFlow',
    inputSchema: CropAdviceInputSchema,
    outputSchema: CropAdviceOutputSchema,
  },
  async input => {
    const {output} = await cropAdvicePrompt(input);
    return output!;
  }
);
