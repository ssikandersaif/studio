'use server';
/**
 * @fileOverview A general purpose chat flow that connects to a local LLM.
 *
 * - generalChat - A function that takes a user's prompt and returns an AI response from a local model.
 * - GeneralChatInput - The input type for the generalChat function.
 * - GeneralChatOutput - The return type for the generalChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneralChatInputSchema = z.object({
  prompt: z.string().describe('The user\'s message.'),
});
export type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const GeneralChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response.'),
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
      const localUrl = 'http://localhost:5000/predict';
      
      const response = await fetch(localUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: input.prompt }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Request to local model failed with status ${response.status}: ${errorBody}`);
      }

      const data = await response.json();
      
      // Assuming the local model's response is in a 'response' field.
      // If the field name is different, this needs to be adjusted.
      return { response: data.response || "No response field found in local model output." };

    } catch (error) {
      console.error("Error in generalChatFlow connecting to local model:", error);
      // Let the user know the connection failed
      return { response: `Error connecting to your local model: ${(error as Error).message}` };
    }
  }
);
