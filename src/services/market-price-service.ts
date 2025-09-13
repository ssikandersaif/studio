'use server';

import { generateMarketPrices } from '@/ai/flows/market-price-flow';
import type { MarketPricesOutput } from '@/ai/flows/market-price-flow';

export async function getMarketPrices(): Promise<MarketPricesOutput> {
    // Directly call the Genkit flow and return its result.
    return await generateMarketPrices();
}
