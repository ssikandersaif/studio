"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  Loader2
} from "lucide-react";
import { getWeatherData } from "@/services/weather-service";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { placeholderImages } from "@/lib/placeholder-images.json";

type IconMap = {
  [key: string]: React.ReactNode;
};

const largeIconMap: IconMap = {
  "01d": <Sun className="h-20 w-20 text-yellow-400" />,
  "01n": <Sun className="h-20 w-20 text-yellow-400" />,
  "02d": <CloudSun className="h-20 w-20" />,
  "02n": <CloudSun className="h-20 w-20" />,
  "03d": <Cloud className="h-20 w-20" />,
  "03n": <Cloud className="h-20 w-20" />,
  "04d": <Cloud className="h-20 w-20" />,
  "04n": <Cloud className="h-20 w-20" />,
  "09d": <CloudRain className="h-20 w-20 text-blue-400" />,
  "09n": <CloudRain className="h-20 w-20 text-blue-400" />,
  "10d": <CloudRain className="h-20 w-20 text-blue-400" />,
  "10n": <CloudRain className="h-20 w-20 text-blue-400" />,
  "11d": <CloudLightning className="h-20 w-20 text-purple-400" />,
  "11n": <CloudLightning className="h-20 w-20 text-purple-400" />,
  "50d": <Wind className="h-20 w-20" />,
  "50n": <Wind className="h-20 w-20" />,
};

const smallIconMap: IconMap = {
  "01d": <Sun className="h-8 w-8 text-yellow-400" />,
  "01n": <Sun className="h-8 w-8 text-yellow-400" />,
  "02d": <CloudSun className="h-8 w-8" />,
  "02n": <CloudSun className="h-8 w-8" />,
  "03d": <Cloud className="h-8 w-8" />,
  "03n": <Cloud className="h-8 w-8" />,
  "04d": <Cloud className="h-8 w-8" />,
  "04n": <Cloud className="h-8 w-8" />,
  "09d": <CloudRain className="h-8 w-8 text-blue-400" />,
  "09n": <CloudRain className="h-8 w-8 text-blue-400" />,
  "10d": <CloudRain className="h-8 w-8 text-blue-400" />,
  "10n": <CloudRain className="h-8 w-8 text-blue-400" />,
  "11d": <CloudLightning className="h-8 w-8 text-purple-400" />,
  "11n": <CloudLightning className="h-8 w-8 text-purple-400" />,
  "50d": <Wind className="h-8 w-8" />,
  "50n": <Wind className="h-8 w-8" />,
};

type LocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unsupported';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const { toast } = useToast();
  const { t } = useLanguage();
  const weatherImage = placeholderImages.find(img => img.id === "weather-card");

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
  
  const renderContent = () => {
      switch (locationStatus) {
        case 'loading':
            return (
               <Card className="min-h-[600px] flex items-center justify-center">
                    <Loader2 className="w-16 h-16 animate-spin text-primary"/>
               </Card>
            );
        case 'success':
            if (!weatherData) return null;
            return (
              <Card className="overflow-hidden relative shadow-lg border-none">
                {weatherImage && (
                  <Image
                    src={weatherImage.imageUrl}
                    alt={weatherImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={weatherImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative text-white p-6 sm:p-8 space-y-8">
                  {/* Current Conditions */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
                      <div className="flex-1">
                          <p className="font-semibold text-lg">{locationName}</p>
                          <p className="text-7xl sm:text-8xl font-bold tracking-tighter">{weatherData.current.temp}°C</p>
                          <p className="text-xl capitalize text-white/90">{weatherData.current.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {largeIconMap[weatherData.current.icon] || <CloudSun className="h-20 w-20" />}
                      </div>
                  </div>

                  {/* Additional current details */}
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex flex-col items-center justify-center">
                          <Droplets className="h-6 w-6 mb-1"/>
                          <p className="font-bold text-lg">{weatherData.current.humidity}%</p>
                          <p className="text-sm text-white/80">{t({ en: "Humidity", ml: "ഈർപ്പം", hi: "नमी" })}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                          <Wind className="h-6 w-6 mb-1"/>
                          <p className="font-bold text-lg">{weatherData.current.wind} km/h</p>
                          <p className="text-sm text-white/80">{t({ en: "Wind", ml: "കാറ്റ്", hi: "हवा" })}</p>
                      </div>
                       <div className="col-span-2 flex items-center gap-3 text-left p-3 rounded-md bg-black/20">
                            <Lightbulb className="h-6 w-6 shrink-0 text-yellow-300"/>
                            <div>
                                <p className="font-semibold text-sm">{t({ en: "Farming Tip", ml: "കാർഷിക ഉപദേശം", hi: "खेती की सलाह" })}:</p>
                                <p className="text-xs text-white/80">{weatherData.current.recommendation}</p>
                            </div>
                        </div>
                  </div>

                  {/* 5-Day Forecast */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 font-headline">{t({ en: "5-Day Forecast", ml: "5 ദിവസത്തെ പ്രവചനം", hi: "5-दिवसीय पूर्वानुमान" })}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                          <p className="font-bold text-base">{day.day}</p>
                          <div className="my-2">{smallIconMap[day.icon] || <CloudSun className="h-8 w-8" />}</div>
                          <p className="text-xl font-semibold">{day.temp}°</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          case 'denied':
          case 'unsupported':
          case 'idle':
          default:
            return (
              <Card className="flex flex-col items-center justify-center text-center p-12 text-muted-foreground min-h-[400px]">
                <MapPinOff className="w-16 h-16 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t({ en: "Location Access Needed", ml: "ലൊക്കേഷൻ ആക്സസ് ആവശ്യമാണ്", hi: "स्थान पहुंच की आवश्यकता है" })}</h3>
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
        description={t({ en: "Current conditions and 5-day forecast for your location.", ml: "നിങ്ങളുടെ സ്ഥലത്തെ നിലവിലെ അവസ്ഥയും 5 ദിവസത്തെ പ്രവചനവും.", hi: "आपके स्थान के लिए वर्तमान स्थितियाँ और 5-दिवसीय पूर्वानुमान।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        {renderContent()}
      </main>
    </>
  );
}
