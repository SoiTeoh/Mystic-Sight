// Add one short, one-sentence summary of what you have generated to the 'progress' field in the output.
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a personalized tarot reading interpretation based on a user-provided prompt or question.
 *
 * - generateReadingPrompt - A function that takes a card spread and a user prompt and returns a personalized tarot reading interpretation.
 * - GenerateReadingPromptInput - The input type for the generateReadingPrompt function.
 * - GenerateReadingPromptOutput - The return type for the generateReadingPrompt function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateReadingPromptInputSchema = z.object({
  spread: z.string().describe('The tarot card spread (e.g., three-card spread, Celtic cross).'),
  prompt: z.string().describe('The user-provided prompt or question for a personalized reading.'),
  cards: z.array(z.string()).describe('The cards drawn for the reading.'),
  userQuery: z.string().optional().describe('The user question that the Tarot spread is trying to answer. Specify the language for translation if needed (e.g., "Please respond in Chinese").'),
});
export type GenerateReadingPromptInput = z.infer<typeof GenerateReadingPromptInputSchema>;

const GenerateReadingPromptOutputSchema = z.object({
  interpretation: z.string().describe('The personalized tarot reading interpretation.'),
});
export type GenerateReadingPromptOutput = z.infer<typeof GenerateReadingPromptOutputSchema>;

export async function generateReadingPrompt(input: GenerateReadingPromptInput): Promise<GenerateReadingPromptOutput> {
  return generateReadingPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReadingPromptPrompt',
  input: {
    schema: z.object({
      spread: z.string().describe('The tarot card spread (e.g., three-card spread, Celtic cross).'),
      prompt: z.string().describe('The user-provided prompt or question for a personalized reading.'),
      cards: z.array(z.string()).describe('The cards drawn for the reading.'),
      userQuery: z.string().optional().describe('The user question that the Tarot spread is trying to answer. Specify the language for translation if needed (e.g., "Please respond in Chinese").'),
    }),
  },
  output: {
    schema: z.object({
      interpretation: z.string().describe('The personalized tarot reading interpretation.'),
    }),
  },
  prompt: `You are an expert tarot card reader. Based on the card spread, the cards drawn, and the user\'s specific prompt or question, provide a personalized tarot reading interpretation.

Card Spread: {{{spread}}}
User Prompt: {{{prompt}}}
Cards Drawn: {{#each cards}}{{{this}}} {{/each}}

{{#if userQuery}}
  {{{userQuery}}}
{{/if}}

Interpretation: `,
});

const generateReadingPromptFlow = ai.defineFlow<
  typeof GenerateReadingPromptInputSchema,
  typeof GenerateReadingPromptOutputSchema
>({
  name: 'generateReadingPromptFlow',
  inputSchema: GenerateReadingPromptInputSchema,
  outputSchema: GenerateReadingPromptOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
