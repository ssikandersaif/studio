"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { WeatherData } from "@/lib/types";
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  LocateFixed,
  Sun,
  Wind,
  Loader2
} from "lucide-react";
import { getWeatherData } from "@/services/weather-service";
import { Skeleton } from "@/components/ui/skeleton";

type IconMap = {
  [key: string]: React.ReactNode;
};

const iconMap: IconMap = {
  "01d": <Sun className="h-10 w-10 text-yellow-500" />,
  "01n": <Sun className="h-10 w-10 text-yellow-500" />,
  "02d": <CloudSun className="h-10 w-10 text-gray-500" />,
  "02n": <CloudSun className="h-10 w-10 text-gray-500" />,
  "03d": <Cloud className="h-10 w-10 text-gray-400" />,
  "03n": <Cloud className="h-10 w-10 text-gray-400" />,
  "04d": <Cloud className="h-10 w-10 text-gray-400" />,
  "04n": <Cloud className="h-10 w-10 text-gray-400" />,
  "09d": <CloudRain className="h-10 w-10 text-blue-500" />,
  "09n": <CloudRain className="h-10 w-10 text-blue-500" />,
  "10d": <CloudRain className="h-10 w-10 text-blue-500" />,
  "10n": <CloudRain className="h-10 w-10 text-blue-500" />,
  "11d": <CloudLightning className="h-10 w-10 text-purple-500" />,
  "11n": <CloudLightning className="h-10 w-10 text-purple-500" />,
  "50d": <Wind className="h-10 w-10 text-gray-500" />,
  "50n": <Wind className="h-10 w-10 text-gray-500" />,
};

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string>("your location");
  const [loading, setLoading] = useState(true);
  const [gettingLocation, setGettingLocation] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const data = await getWeatherData({ lat, lon });
      setWeatherData(data.weather);
      setLocationName(data.locationName);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error fetching weather",
        description: (error as Error).message || "Could not fetch weather data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Default location (e.g., Delhi)
    fetchWeather(28.6139, 77.2090);
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
      });
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
        setGettingLocation(false);
        toast({
          title: "Location updated!",
          description: "Displaying weather for your current location.",
        });
      },
      (error) => {
        setGettingLocation(false);
        let description = "Please allow location access in your browser settings.";
        if (error.code === error.PERMISSION_DENIED) {
            description = "You denied the request for Geolocation."
        } else if (error.code === error.POSITION_UNAVAILABLE) {
            description = "Location information is unavailable."
        } else if (error.code === error.TIMEOUT) {
            description = "The request to get user location timed out."
        }
        toast({
          variant: "destructive",
          title: "Unable to retrieve location",
          description: description,
        });
      }
    );
  };
  
  const getIcon = (iconCode: string) => {
      return iconMap[iconCode] || <CloudSun className="h-10 w-10 text-gray-500" />;
  }


  return (
    <>
      <Header
        title="Weather Forecast"
        description="Current conditions and 5-day forecast with farming impact analysis."
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold capitalize">Weather for {locationName}</h2>
          <Button onClick={handleGetLocation} disabled={gettingLocation}>
            {gettingLocation ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LocateFixed className="mr-2 h-4 w-4" />
            )}
            {gettingLocation ? "Getting location..." : "Use My Location"}
          </Button>
        </div>

        {loading ? (
           <div className="grid gap-6">
              <Card>
                  <CardHeader>
                      <Skeleton className="h-6 w-1/3"/>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <Skeleton className="h-16 w-full"/>
                      <Skeleton className="h-10 w-full"/>
                  </CardContent>
              </Card>
               <Card>
                  <CardHeader>
                      <Skeleton className="h-6 w-1/4"/>
                  </CardHeader>
                  <CardContent>
                      <Skeleton className="h-32 w-full"/>
                  </CardContent>
              </Card>
           </div>
        ) : weatherData ? (
          <div className="grid gap-6">
            <Card className="bg-primary/10">
              <CardHeader>
                <CardTitle>Current Conditions</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-6">
                  {getIcon(weatherData.current.icon)}
                  <div>
                    <p className="text-6xl font-bold">
                      {weatherData.current.temp}°C
                    </p>
                    <p className="text-lg text-muted-foreground capitalize">
                      {weatherData.current.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50">
                        <Droplets className="h-6 w-6 text-primary mb-2"/>
                        <p className="font-bold text-lg">{weatherData.current.humidity}%</p>
                        <p className="text-sm text-muted-foreground">Humidity</p>
                    </div>
                     <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50">
                        <Wind className="h-6 w-6 text-primary mb-2"/>
                        <p className="font-bold text-lg">{weatherData.current.wind} km/h</p>
                        <p className="text-sm text-muted-foreground">Wind</p>
                    </div>
                </div>
                <div className="md:col-span-2 p-4 bg-accent/20 text-accent-foreground/80 rounded-lg">
                    <p className="font-semibold">Farming Recommendation:</p>
                    <p>{weatherData.current.recommendation}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center p-2 rounded-lg bg-secondary">
                    <p className="font-bold">{day.day}</p>
                    <div className="my-2">{getIcon(day.icon)}</div>
                    <p className="text-xl font-semibold">{day.temp}°C</p>
                    <p className="text-xs text-muted-foreground capitalize">{day.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <p>Could not load weather data.</p>
        )}
      </main>
    </>
  );
}
