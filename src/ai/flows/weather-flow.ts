'use server';
/**
 * @fileOverview A flow that fetches weather data and provides a farming recommendation.
 *
 * - getWeather - Fetches weather data for given coordinates.
 * - WeatherInput - Input schema for getWeather.
 * - WeatherOutput - Output schema for getWeather.
 */

import { ai } from '@/ai/genkit';
import { WeatherData } from '@/lib/types';
import { z } from 'zod';
import { format } from 'date-fns';

const WeatherInputSchema = z.object({
  lat: z.number().describe('Latitude for the weather forecast.'),
  lon: z.number().describe('Longitude for the weather forecast.'),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

const CurrentWeatherSchema = z.object({
  temp: z.number(),
  description: z.string(),
  icon: z.string(),
  humidity: z.number(),
  wind: z.number(),
  recommendation: z.string(),
});

const ForecastDaySchema = z.object({
  day: z.string(),
  temp: z.number(),
  description: z.string(),
  icon: z.string(),
});

const WeatherOutputSchema = z.object({
  weather: z.object({
    current: CurrentWeatherSchema,
    forecast: z.array(ForecastDaySchema),
  }),
  locationName: z.string(),
});
export type WeatherOutput = z.infer<typeof WeatherOutputSchema>;

async function fetchWeatherDataFromApi(lat: number, lon: number): Promise<any> {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error("OpenWeather API key is not configured.");
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    return await response.json();
}

const recommendationPrompt = ai.definePrompt({
    name: 'weatherRecommendationPrompt',
    input: { schema: z.any() },
    output: { schema: z.object({ recommendation: z.string() }) },
    prompt: `Based on the following current weather data, provide a concise and practical farming recommendation for an Indian farmer.
    
    Weather:
    - Description: {{description}}
    - Temperature: {{temp}}°C
    - Humidity: {{humidity}}%
    - Wind Speed: {{wind}} km/h

    Recommendation:`,
});


export const getWeather = ai.defineFlow(
  {
    name: 'getWeather',
    inputSchema: WeatherInputSchema,
    outputSchema: WeatherOutputSchema,
  },
  async ({ lat, lon }) => {
    const rawData = await fetchWeatherDataFromApi(lat, lon);
    
    const current = rawData.list[0];
    const { output: recommendationOutput } = await recommendationPrompt({
      description: current.weather[0].description,
      temp: current.main.temp,
      humidity: current.main.humidity,
      wind: current.wind.speed * 3.6, // m/s to km/h
    });

    // Process forecast for the next 5 days, one entry per day
    const dailyForecasts: { [key: string]: any } = {};
    rawData.list.forEach((item: any) => {
        const day = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
        // Use midday forecast for the day's representation
        if (!dailyForecasts[day] && item.dt_txt.includes("12:00:00")) {
            dailyForecasts[day] = item;
        }
    });

    const forecast = Object.values(dailyForecasts).slice(0, 5).map((day: any) => ({
      day: format(new Date(day.dt * 1000), 'EEE'),
      temp: Math.round(day.main.temp),
      description: day.weather[0].description,
      icon: day.weather[0].icon,
    }));


    const weatherData: WeatherData = {
      current: {
        temp: Math.round(current.main.temp),
        description: current.weather[0].description,
        icon: current.weather[0].icon,
        humidity: current.main.humidity,
        wind: Math.round(current.wind.speed * 3.6),
        recommendation: recommendationOutput!.recommendation,
      },
      forecast,
    };

    return {
      weather: weatherData,
      locationName: rawData.city.name,
    };
  }
);
