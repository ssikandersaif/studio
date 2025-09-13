// This file is meant to be run on the server, not the client.
'use server';
import { getWeather } from '@/ai/flows/weather-flow';
import { WeatherServiceInput, WeatherServiceOutput } from '@/lib/types';


export async function getWeatherData(
  input: WeatherServiceInput
): Promise<WeatherServiceOutput> {
  // Directly call the Genkit flow and return its result.
  return await getWeather(input);
}
