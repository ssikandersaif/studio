'use server';

/**
 * @fileOverview A Genkit flow to generate mock real-time market price data for crops.
 * 
 * - generateMarketPrices - A function that returns a list of AI-generated crop prices.
 * - MarketPricesOutput - The return type for the generateMarketPrices function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { format } from 'date-fns';

const CropPriceSchema = z.object({
    id: z.string().describe("A unique identifier for the crop price entry, like a number as a string."),
    name: z.string().describe("The common name of the commodity (e.g., 'Paddy', 'Wheat')."),
    variety: z.string().describe("The specific variety of the commodity (e.g., 'Basmati', 'Lokwan')."),
    mandi: z.string().describe("The name of the agricultural market (mandi) and its state (e.g., 'Karnal, Haryana')."),
    minPrice: z.number().describe("The minimum price for the commodity in Rupees per Quintal."),
    maxPrice: z.number().describe("The maximum price for the commodity in Rupees per Quintal."),
    modalPrice: z.number().describe("The most frequent price for the commodity in Rupees per Quintal."),
    date: z.string().describe("The date of the price data in 'yyyy-MM-dd' format."),
});

const MarketPricesOutputSchema = z.object({
  prices: z.array(CropPriceSchema).describe("A list of crop price objects."),
});
export type MarketPricesOutput = z.infer<typeof MarketPricesOutputSchema>;

export async function generateMarketPrices(): Promise<MarketPricesOutput> {
    return marketPriceFlow();
}

const marketPricePrompt = ai.definePrompt({
    name: 'marketPricePrompt',
    output: { schema: MarketPricesOutputSchema },
    prompt: `You are an expert agricultural market data provider in India. Your task is to generate a realistic, diverse, and comprehensive list of at least 100 commodity prices from various mandis (agricultural markets) across different states in India.

    Ensure the list includes a wide variety of commodities, including:
    - Grains (Paddy, Wheat, Maize)
    - Pulses (Gram, Lentil, Pigeon Pea)
    - Oilseeds (Soybean, Mustard, Groundnut)
    - Spices (Turmeric, Chilli, Cumin)
    - Vegetables (Tomato, Onion, Potato, Brinjal, etc.)
    - Fruits (Apple, Banana, Mango, Grapes, Pomegranate)
    - Cash crops (Cotton, Sugarcane)

    For each entry, provide:
    - A unique ID (string).
    - Commodity name.
    - Commodity variety.
    - Mandi name and state.
    - Minimum, Maximum, and Modal prices in Rupees per Quintal. The prices should be realistic for the commodity.
    - The date should be today's date: ${format(new Date(), 'yyyy-MM-dd')}.

    Generate at least 100 unique entries. The response must be a valid JSON object matching the provided schema.
    `,
});

const marketPriceFlow = ai.defineFlow(
    {
        name: 'marketPriceFlow',
        outputSchema: MarketPricesOutputSchema,
    },
    async () => {
        const { output } = await marketPricePrompt();
        return output!;
    }
);
