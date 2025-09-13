'use server';
/**
 * @fileOverview This file defines a Genkit flow for identifying crop diseases and pests from an image
 * and providing treatment recommendations.
 *
 * - identifyDiseaseOrPest - An async function that takes an image of a crop and returns potential diseases or pests and their solutions.
 * - IdentifyDiseaseOrPestInput - The input type for the identifyDiseaseOrPest function, expects a data URI and language.
 * - IdentifyDiseaseOrPestOutput - The return type for the identifyDiseaseOrPest function, includes a list of possible issues with recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyDiseaseOrPestInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language for the output (e.g., "en" for English, "ml" for Malayalam).'),
});
export type IdentifyDiseaseOrPestInput = z.infer<typeof IdentifyDiseaseOrPestInputSchema>;

const DiseaseOrPestIssueSchema = z.object({
  issue: z.string().describe('The name of the identified disease or pest.'),
  recommendation: z.string().describe('The recommended treatment or solution for the identified issue.'),
});

const IdentifyDiseaseOrPestOutputSchema = z.object({
  possibleIssues: z
    .array(DiseaseOrPestIssueSchema)
    .describe('A list of possible diseases or pests affecting the crop, along with recommendations.'),
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
  prompt: `You are an expert in identifying crop diseases and pests for Indian farmers.

  Analyze the image provided and identify potential diseases or pests affecting the crop.

  For each potential issue you identify, provide a practical, actionable recommendation for how to solve it.

  Provide the response in the following language: {{{language}}}.

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
