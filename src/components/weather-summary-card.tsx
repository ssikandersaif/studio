"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { WeatherData } from "@/lib/types";
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Sun,
  Wind,
  Loader2,
  ArrowRight,
  MapPinOff,
} from "lucide-react";
import { getWeatherData } from "@/services/weather-service";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./ui/button";

const iconMap: { [key: string]: React.ReactNode } = {
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

type LocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unsupported' | 'error';

export function WeatherSummaryCard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const { toast } = useToast();
  const { t } = useLanguage();

  const fetchWeather = async (lat: number, lon: number) => {
    setLocationStatus('loading');
    try {
      const data = await getWeatherData({ lat, lon });
      setWeatherData(data.weather);
      setLocationName(data.locationName);
      setLocationStatus('success');
    } catch (error) {
      console.error(error);
      setLocationStatus('error');
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      return;
    }
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setLocationStatus('denied');
      }
    );
  };
  
  useEffect(() => {
    handleGetLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIcon = (iconCode: string) => iconMap[iconCode] || <CloudSun className="h-10 w-10 text-gray-500" />;

  const renderContent = () => {
    switch (locationStatus) {
      case 'loading':
      case 'idle':
        return <Skeleton className="h-full w-full" />;
      case 'success':
        if (!weatherData) return null;
        return (
          <>
             <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">{getIcon(weatherData.current.icon)}</div>
                    <div>
                        <CardTitle className="font-headline">{t({ en: "Weather", ml: "കാലാവസ്ഥ", hi: "मौसम" })}</CardTitle>
                        <CardDescription>{locationName || 'Current Location'}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end gap-4">
                    <p className="text-6xl font-bold">{weatherData.current.temp}°</p>
                    <div className="flex-1 space-y-1">
                        <p className="text-lg text-muted-foreground capitalize">{weatherData.current.description}</p>
                        <div className="flex gap-4 text-muted-foreground">
                            <div className="flex items-center gap-1 text-sm">
                                <Droplets className="h-4 w-4" />
                                <span>{weatherData.current.humidity}%</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <Wind className="h-4 w-4" />
                                <span>{weatherData.current.wind} km/h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
             <CardFooter>
                 <Button variant="link" className="p-0 h-auto">{t({en: "View Full Forecast", hi: "पूरा पूर्वानुमान देखें"})}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </>
        );
       case 'denied':
       case 'unsupported':
       case 'error':
       default:
        return (
           <>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary"><MapPinOff size={24} /></div>
                    <CardTitle className="font-headline">{t({ en: "Weather", ml: "കാലാവസ്ഥ", hi: "मौसम" })}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{t({en: "Enable location to see local weather.", hi: "स्थानीय मौसम देखने के लिए स्थान सक्षम करें।"})}</p>
            </CardContent>
            <CardFooter>
                <Button variant="link" className="p-0 h-auto" onClick={handleGetLocation}>
                    {locationStatus === 'loading' ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <MapPin className="mr-2 h-4 w-4"/>}
                    {t({en: "Enable Location", hi: "स्थान सक्षम करें"})}
                </Button>
            </CardFooter>
           </>
        );
    }
  };

  return (
    <Link href="/weather" className="block group">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
            {renderContent()}
        </Card>
    </Link>
  );
}
