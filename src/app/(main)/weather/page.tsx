"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { mockWeatherData } from "@/lib/data";
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
} from "lucide-react";

type IconMap = {
  [key: string]: React.ReactNode;
};

const iconMap: IconMap = {
  Sun: <Sun className="h-10 w-10 text-yellow-500" />,
  CloudSun: <CloudSun className="h-10 w-10 text-gray-500" />,
  Cloud: <Cloud className="h-10 w-10 text-gray-400" />,
  CloudRain: <CloudRain className="h-10 w-10 text-blue-500" />,
  CloudLightning: <CloudLightning className="h-10 w-10 text-purple-500" />,
};

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>("your location");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate initial data loading
    setWeatherData(mockWeatherData);
    setLoading(false);
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

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would use position.coords.latitude and position.coords.longitude
        // to fetch data from a weather API. Here, we just update the location name.
        setLocation("current location");
        setWeatherData(mockWeatherData); // Reload mock data
        setLoading(false);
        toast({
          title: "Location updated!",
          description: "Displaying weather for your current location.",
        });
      },
      () => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Unable to retrieve location",
          description: "Please allow location access in your browser settings.",
        });
      }
    );
  };
  
  const getIcon = (iconName: string) => {
      return iconMap[iconName] || <CloudSun className="h-10 w-10 text-gray-500" />;
  }


  return (
    <>
      <Header
        title="Weather Forecast"
        description="Current conditions and 7-day forecast with farming impact analysis."
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold capitalize">Weather for {location}</h2>
          <Button onClick={handleGetLocation} disabled={loading}>
            <LocateFixed className="mr-2 h-4 w-4" />
            {loading ? "Getting location..." : "Use My Location"}
          </Button>
        </div>

        {weatherData ? (
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
                    <p className="text-lg text-muted-foreground">
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
                <CardTitle>7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center p-2 rounded-lg bg-secondary">
                    <p className="font-bold">{day.day}</p>
                    <div className="my-2">{getIcon(day.icon)}</div>
                    <p className="text-xl font-semibold">{day.temp}°C</p>
                    <p className="text-xs text-muted-foreground">{day.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </main>
    </>
  );
}
