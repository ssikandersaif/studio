'use server';
/**
 * @fileOverview A general purpose chat flow that connects to the Gemini model.
 *
 * - generalChat - A function that takes a user's prompt and returns an AI response.
 * - GeneralChatInput - The input type for the generalChat function.
 * - GeneralChatOutput - The return type for the generalChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneralChatInputSchema = z.object({
  prompt: z.string().describe("The user's message."),
});
export type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const GeneralChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type GeneralChatOutput = z.infer<typeof GeneralChatOutputSchema>;

export async function generalChat(input: GeneralChatInput): Promise<GeneralChatOutput> {
  return generalChatFlow(input);
}

const generalChatFlow = ai.defineFlow(
  {
    name: 'generalChatFlow',
    inputSchema: GeneralChatInputSchema,
    outputSchema: GeneralChatOutputSchema,
  },
  async (input) => {
    try {
      const llmResponse = await ai.generate({
        prompt: input.prompt,
        model: 'googleai/gemini-pro',
      });

      return { response: llmResponse.text };

    } catch (error) {
      console.error("Error in generalChatFlow:", error);
      // Let the user know there was an issue
      return { response: `Error connecting to the AI model: ${(error as Error).message}` };
    }
  }
);
