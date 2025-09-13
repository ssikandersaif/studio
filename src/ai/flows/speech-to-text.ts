'use server';

/**
 * @fileOverview A flow that transcribes audio to text.
 *
 * - speechToText - A function that takes an audio data URI and returns the transcribed text.
 * - SpeechToTextInput - The input type for the speechToText function.
 * - SpeechToTextOutput - The return type for the speechToText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SpeechToTextInputSchema = z.object({
  audio: z
    .string()
    .describe(
      'The audio to transcribe, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type SpeechToTextInput = z.infer<typeof SpeechToTextInputSchema>;

const SpeechToTextOutputSchema = z.object({
  text: z.string().describe('The transcribed text.'),
});
export type SpeechToTextOutput = z.infer<typeof SpeechToTextOutputSchema>;

export async function speechToText(input: SpeechToTextInput): Promise<SpeechToTextOutput> {
  return speechToTextFlow(input);
}

const prompt = ai.definePrompt({
    name: 'speechToTextPrompt',
    input: { schema: SpeechToTextInputSchema },
    output: { schema: SpeechToTextOutputSchema },
    prompt: `Transcribe the following audio recording.

Audio: {{media url=audio}}`,
});

const speechToTextFlow = ai.defineFlow(
  {
    name: 'speechToTextFlow',
    inputSchema: SpeechToTextInputSchema,
    outputSchema: SpeechToTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
