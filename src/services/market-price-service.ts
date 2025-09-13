'use server';

import { generateMarketPrices } from '@/ai/flows/market-price-flow';
import { MarketPricesOutput } from '@/ai/flows/market-price-flow';

export async function getMarketPrices(): Promise<MarketPricesOutput> {
    return await generateMarketPrices();
}
