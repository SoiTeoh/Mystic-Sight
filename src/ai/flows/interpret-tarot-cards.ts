'use server';
/**
 * @fileOverview This file defines a Genkit flow for interpreting the meaning of drawn tarot cards.
 *
 * - interpretTarotCards - A function that takes an array of drawn tarot cards and returns an AI-generated interpretation of their meaning.
 * - InterpretTarotCardsInput - The input type for the interpretTarotCards function.
 * - InterpretTarotCardsOutput - The return type for the interpretTarotCards function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const InterpretTarotCardsInputSchema = z.object({
  cards: z.array(
    z.object({
      name: z.string().describe('The name of the tarot card.'),
      meaning: z.string().describe('The general meaning of the card.'),
    })
  ).describe('An array of drawn tarot cards, with their names and meanings.'),
  userQuery: z.string().optional().describe('The user question that the Tarot spread is trying to answer. Specify the language for translation if needed (e.g., "Please respond in Chinese").'),
});
export type InterpretTarotCardsInput = z.infer<typeof InterpretTarotCardsInputSchema>;

const InterpretTarotCardsOutputSchema = z.object({
  interpretation: z.string().describe('The AI-powered interpretation of the drawn tarot cards.'),
});
export type InterpretTarotCardsOutput = z.infer<typeof InterpretTarotCardsOutputSchema>;

export async function interpretTarotCards(input: InterpretTarotCardsInput): Promise<InterpretTarotCardsOutput> {
  return interpretTarotCardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretTarotCardsPrompt',
  input: {
    schema: z.object({
      cards: z.array(
        z.object({
          name: z.string().describe('The name of the tarot card.'),
          meaning: z.string().describe('The general meaning of the card.'),
        })
      ).describe('An array of drawn tarot cards, with their names and meanings.'),
      userQuery: z.string().optional().describe('The user question that the Tarot spread is trying to answer. Specify the language for translation if needed (e.g., "Please respond in Chinese").'),
    }),
  },
  output: {
    schema: z.object({
      interpretation: z.string().describe('The AI-powered interpretation of the drawn tarot cards.'),
    }),
  },
  prompt: `You are an expert tarot card reader. You will provide an insightful interpretation of the drawn tarot cards based on their meanings.

Cards:
{{#each cards}}
  - Name: {{{name}}}, Meaning: {{{meaning}}}
{{/each}}

{{#if userQuery}}
  {{{userQuery}}}
{{/if}}

Interpretation: `,
});

const interpretTarotCardsFlow = ai.defineFlow<
  typeof InterpretTarotCardsInputSchema,
  typeof InterpretTarotCardsOutputSchema
>({
  name: 'interpretTarotCardsFlow',
  inputSchema: InterpretTarotCardsInputSchema,
  outputSchema: InterpretTarotCardsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
