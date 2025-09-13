'use server';
/**
 * @fileOverview This file defines a Genkit flow for identifying crop diseases and pests from an image.
 *
 * - identifyDiseaseOrPest - An async function that takes an image of a crop and returns potential diseases or pests.
 * - IdentifyDiseaseOrPestInput - The input type for the identifyDiseaseOrPest function, expects a data URI.
 * - IdentifyDiseaseOrPestOutput - The return type for the identifyDiseaseOrPest function, includes a list of possible issues.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyDiseaseOrPestInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyDiseaseOrPestInput = z.infer<typeof IdentifyDiseaseOrPestInputSchema>;

const IdentifyDiseaseOrPestOutputSchema = z.object({
  possibleIssues: z
    .array(z.string())
    .describe('A list of possible diseases or pests affecting the crop.'),
});
export type IdentifyDiseaseOrPestOutput = z.infer<typeof IdentifyDiseaseOrPestOutputSchema>;

export async function identifyDiseaseOrPest(
  input: IdentifyDiseaseOrPestInput
): Promise<IdentifyDiseaseOrPestOutput> {
  return identifyDiseaseOrPestFlow(input);
}

const identifyDiseaseOrPestPrompt = ai.definePrompt({
  name: 'identifyDiseaseOrPestPrompt',
  input: {schema: IdentifyDiseaseOrPestInputSchema},
  output: {schema: IdentifyDiseaseOrPestOutputSchema},
  prompt: `You are an expert in identifying crop diseases and pests.

  Analyze the image provided and identify potential diseases or pests affecting the crop.

  Provide a list of possible issues that the crop might be facing.

  Image: {{media url=photoDataUri}}`,
});

const identifyDiseaseOrPestFlow = ai.defineFlow(
  {
    name: 'identifyDiseaseOrPestFlow',
    inputSchema: IdentifyDiseaseOrPestInputSchema,
    outputSchema: IdentifyDiseaseOrPestOutputSchema,
  },
  async input => {
    const {output} = await identifyDiseaseOrPestPrompt(input);
    return output!;
  }
);
