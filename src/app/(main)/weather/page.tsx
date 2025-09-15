"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { WeatherData } from "@/lib/types";
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  Lightbulb,
  MapPin,
  MapPinOff,
  Sun,
  Wind,
} from "lucide-react";
import { getWeatherData } from "@/services/weather-service";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";

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

type LocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unsupported';

export default function WeatherPage() {
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
      const errorMessage = (error as Error).message || t({ en: "Could not fetch weather data.", ml: "കാലാവസ്ഥാ ഡാറ്റ ലഭ്യമാക്കാൻ കഴിഞ്ഞില്ല.", hi: "मौसम डेटा प्राप्त नहीं किया जा सका।" });
      
      toast({
        variant: "destructive",
        title: t({ en: "Weather API Error", ml: "കാലാവസ്ഥാ API പിശക്", hi: "मौसम एपीआई त्रुटि" }),
        description: errorMessage,
      });
      setLocationStatus('idle'); // Reset on error
    }
  };

 const handleGetLocation = () => {
    if (!navigator.geolocation) {
        setLocationStatus('unsupported');
        toast({
            variant: "destructive",
            title: t({ en: "Geolocation not supported", ml: "ജിയോലൊക്കേഷൻ പിന്തുണയ്ക്കുന്നില്ല", hi: "जियोलोकेशन समर्थित नहीं है" }),
            description: t({ en: "Your browser doesn't support geolocation.", ml: "നിങ്ങളുടെ ബ്രൗസർ ജിയോലൊക്കേഷൻ പിന്തുണയ്ക്കുന്നില്ല.", hi: "आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है।" }),
        });
        return;
    }

    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
        (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            console.warn(`Geolocation error (${error.code}): ${error.message}`);
            setLocationStatus('denied');
            toast({
                variant: "destructive",
                title: t({ en: "Location Access Denied", ml: "ലൊക്കേഷൻ ആക്സസ് നിഷേധിച്ചു", hi: "स्थान पहुंच से इनकार कर दिया" }),
                description: t({ en: "Please enable location services in your browser settings to see local weather.", ml: "പ്രാദേശിക കാലാവസ്ഥ കാണുന്നതിന് നിങ്ങളുടെ ബ്രൗസർ ക്രമീകരണങ്ങളിൽ ലൊക്കേഷൻ സേവനങ്ങൾ പ്രവർത്തനക്ഷമമാക്കുക.", hi: "स्थानीय मौसम देखने के लिए कृपया अपनी ब्राउज़र सेटिंग्स में स्थान सेवाओं को सक्षम करें।" }),
            });
        }
    );
};

  useEffect(() => {
    // Automatically try to get location on initial load.
    handleGetLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const getIcon = (iconCode: string) => {
      return iconMap[iconCode] || <CloudSun className="h-10 w-10 text-gray-500" />;
  }

  const renderContent = () => {
      switch (locationStatus) {
        case 'loading':
            return (
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
            );
        case 'success':
            if (!weatherData) return null;
            return (
                <div className="grid gap-6">
                    <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="font-headline">{t({ en: "Current Conditions", ml: "നിലവിലെ അവസ്ഥ", hi: "वर्तमान स्थितियाँ" })}</CardTitle>
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
                                <p className="text-sm text-muted-foreground">{t({ en: "Humidity", ml: "ഈർപ്പം", hi: "नमी" })}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50">
                                <Wind className="h-6 w-6 text-primary mb-2"/>
                                <p className="font-bold text-lg">{weatherData.current.wind} km/h</p>
                                <p className="text-sm text-muted-foreground">{t({ en: "Wind", ml: "കാറ്റ്", hi: "हवा" })}</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 p-4 bg-primary text-primary-foreground rounded-lg flex gap-4 items-start">
                            <Lightbulb className="h-5 w-5 mt-1 shrink-0"/>
                            <div>
                                <p className="font-semibold font-headline">{t({ en: "Farming Recommendation:", ml: "കാർഷിക ശുപാർശ:", hi: "खेती की सिफारिश:" })}</p>
                                <p className="text-sm">{weatherData.current.recommendation}</p>
                            </div>
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{t({ en: "5-Day Forecast", ml: "5 ദിവസത്തെ പ്രവചനം", hi: "5-दिवसीय पूर्वानुमान" })}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                        {weatherData.forecast.map((day, index) => (
                        <div key={index} className="flex flex-col items-center p-2 rounded-lg bg-secondary/60">
                            <p className="font-bold">{day.day}</p>
                            <div className="my-2">{getIcon(day.icon)}</div>
                            <p className="text-xl font-semibold">{day.temp}°C</p>
                            <p className="text-xs text-muted-foreground capitalize">{day.description}</p>
                        </div>
                        ))}
                    </CardContent>
                    </Card>
                </div>
            );
          case 'denied':
          case 'unsupported':
          case 'idle':
          default:
            return (
              <Card className="flex flex-col items-center justify-center text-center p-12 text-muted-foreground">
                <MapPinOff className="w-16 h-16 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{t({ en: "Location Access Needed", ml: "ലൊക്കേഷൻ ആക്സസ് ആവശ്യമാണ്", hi: "स्थान पहुंच की आवश्यकता है" })}</h3>
                <p className="max-w-md mb-6">
                    {t({ 
                        en: "Your browser has blocked location access. Please enable it in your browser's settings or click the button below to retry.",
                        ml: "നിങ്ങളുടെ ബ്രൗസർ ലൊക്കേഷൻ ആക്സസ് ബ്ലോക്ക് ചെയ്തിരിക്കുന്നു. ദയവായി നിങ്ങളുടെ ബ്രൗസർ ക്രമീകരണങ്ങളിൽ ഇത് പ്രവർത്തനക്ഷമമാക്കുക അല്ലെങ്കിൽ വീണ്ടും ശ്രമിക്കാൻ താഴെയുള്ള ബട്ടൺ ക്ലിക്കുചെയ്യുക.",
                        hi: "आपके ब्राउज़र ने स्थान पहुंच को अवरुद्ध कर दिया है। कृपया इसे अपनी ब्राउज़र सेटिंग्स में सक्षम करें या पुनः प्रयास करने के लिए नीचे दिए गए बटन पर क्लिक करें।"
                    })}
                </p>
                <Button onClick={handleGetLocation}>
                    <MapPin className="mr-2 h-4 w-4" />
                    {t({ en: "Use My Location", ml: "എൻ്റെ സ്ഥാനം ഉപയോഗിക്കുക", hi: "मेरे स्थान का उपयोग करें" })}
                </Button>
              </Card>
            );
      }
  };


  return (
    <>
      <Header
        title={t({ en: "Weather Forecast", ml: "കാലാവസ്ഥാ പ്രവചനം", hi: "मौसम पूर्वानुमान" })}
        description={t({ en: "Current conditions and 5-day forecast with farming impact analysis.", ml: "നിലവിലെ അവസ്ഥയും 5 ദിവസത്തെ പ്രവചനവും കാർഷിക ആഘാത വിശകലനവും.", hi: "कृषि प्रभाव विश्लेषण के साथ वर्तमान स्थितियाँ और 5-दिवसीय पूर्वानुमान।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold capitalize font-headline">
              {locationStatus === 'success' && locationName 
                ? `${t({ en: "Weather for", ml: "ഇവിടെ കാലാവസ്ഥ", hi: "के लिए मौसम" })} ${locationName}` 
                : t({ en: "Weather", ml: "കാലാവസ്ഥ", hi: "मौसम" })}
            </h2>
        </div>
        {renderContent()}
      </main>
    </>
  );
}
