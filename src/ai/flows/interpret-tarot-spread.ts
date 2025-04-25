'use server';
/**
 * @fileOverview A tarot card spread interpretation AI agent.
 *
 * - interpretTarotSpread - A function that handles the tarot card spread interpretation process.
 * - InterpretTarotSpreadInput - The input type for the interpretTarotSpread function.
 * - InterpretTarotSpreadOutput - The return type for the interpretTarotSpread function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const InterpretTarotSpreadInputSchema = z.object({
  spreadType: z.string().describe('The type of tarot card spread (e.g., three-card spread, Celtic cross).'),
  cards: z.array(
    z.object({
      name: z.string().describe('The name of the tarot card.'),
      meaning: z.string().describe('The general meaning of the card.'),
    })
  ).describe('An array of tarot cards in the spread, with their names and meanings.'),
  userQuery: z.string().optional().describe('The user question that the Tarot spread is trying to answer. Specify the language for translation if needed (e.g., "Please respond in Chinese").'),
});
export type InterpretTarotSpreadInput = z.infer<typeof InterpretTarotSpreadInputSchema>;

const InterpretTarotSpreadOutputSchema = z.object({
  interpretation: z.string().describe('The AI-powered interpretation of the tarot card spread.'),
});
export type InterpretTarotSpreadOutput = z.infer<typeof InterpretTarotSpreadOutputSchema>;

export async function interpretTarotSpread(input: InterpretTarotSpreadInput): Promise<InterpretTarotSpreadOutput> {
  return interpretTarotSpreadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretTarotSpreadPrompt',
  input: {
    schema: z.object({
      spreadType: z.string().describe('The type of tarot card spread (e.g., three-card spread, Celtic cross).'),
      cards: z.array(
        z.object({
          name: z.string().describe('The name of the tarot card.'),
          meaning: z.string().describe('The general meaning of the card.'),
        })
      ).describe('An array of tarot cards in the spread, with their names and meanings.'),
      userQuery: z.string().optional().describe('The user question that the Tarot spread is trying to answer. Specify the language for translation if needed (e.g., "Please respond in Chinese").'),
    }),
  },
  output: {
    schema: z.object({
      interpretation: z.string().describe('The AI-powered interpretation of the tarot card spread.'),
    }),
  },
  prompt: `You are an expert tarot card reader. You will provide an insightful interpretation of the tarot card spread based on the card meanings and spread type.

Spread Type: {{{spreadType}}}

Cards:
{{#each cards}}
  - Name: {{{name}}}, Meaning: {{{meaning}}}
{{/each}}

{{#if userQuery}}
  {{{userQuery}}}
{{/if}}

Interpretation: `,
});

const interpretTarotSpreadFlow = ai.defineFlow<
  typeof InterpretTarotSpreadInputSchema,
  typeof InterpretTarotSpreadOutputSchema
>(
  {
    name: 'interpretTarotSpreadFlow',
    inputSchema: InterpretTarotSpreadInputSchema,
    outputSchema: InterpretTarotSpreadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
