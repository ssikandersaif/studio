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

const SolutionSchema = z.object({
  name: z.string().describe('The name of the recommended product or method.'),
  instructions: z.string().describe('Step-by-step application instructions.'),
});

const DiseaseOrPestIssueSchema = z.object({
  issue: z.string().describe('The name of the identified disease or pest.'),
  recommendation: z.string().describe('A general description of the issue and why it occurs.'),
  organic_solutions: z.array(SolutionSchema).describe('A list of organic solutions or medicines.'),
  chemical_solutions: z.array(SolutionSchema).describe('A list of chemical solutions or medicines.'),
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
  prompt: `You are an expert agronomist for Indian farmers.

  Analyze the image provided and identify potential diseases or pests affecting the crop.

  For each potential issue you identify:
  1.  Provide a general 'recommendation' that explains what the issue is and why it might be happening.
  2.  List at least one 'organic_solutions'. For each, provide a 'name' (e.g., "Neem Oil Spray") and 'instructions' for application.
  3.  List at least one 'chemical_solutions'. For each, provide a 'name' (e.g., a common brand name like "Tata M-45" and its chemical name "Mancozeb 75% WP") and detailed 'instructions' for application, including dosage per liter of water and when to apply it.

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
    try {
      const {output} = await identifyDiseaseOrPestPrompt(input);
      // Ensure output is not null, and if it is, return a default value
      return output || { possibleIssues: [] };
    } catch (error) {
      console.error("Error in identifyDiseaseOrPestFlow:", error);
      // Return an empty array on error to prevent the app from crashing
      return { possibleIssues: [] };
    }
  }
);
