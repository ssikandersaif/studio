"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
import { placeholderImages } from "@/lib/placeholder-images.json";

const iconMap: { [key: string]: React.ReactNode } = {
  "01d": <Sun className="h-6 w-6 text-yellow-400" />,
  "01n": <Sun className="h-6 w-6 text-yellow-400" />,
  "02d": <CloudSun className="h-6 w-6" />,
  "02n": <CloudSun className="h-6 w-6" />,
  "03d": <Cloud className="h-6 w-6" />,
  "03n": <Cloud className="h-6 w-6" />,
  "04d": <Cloud className="h-6 w-6" />,
  "04n": <Cloud className="h-6 w-6" />,
  "09d": <CloudRain className="h-6 w-6 text-blue-400" />,
  "09n": <CloudRain className="h-6 w-6 text-blue-400" />,
  "10d": <CloudRain className="h-6 w-6 text-blue-400" />,
  "10n": <CloudRain className="h-6 w-6 text-blue-400" />,
  "11d": <CloudLightning className="h-6 w-6 text-purple-400" />,
  "11n": <CloudLightning className="h-6 w-6 text-purple-400" />,
  "50d": <Wind className="h-6 w-6" />,
  "50n": <Wind className="h-6 w-6" />,
};

type LocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unsupported' | 'error';

export function WeatherSummaryCard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const { t } = useLanguage();
  const weatherImage = placeholderImages.find(img => img.id === 'weather-card');

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

  const getIcon = (iconCode: string) => iconMap[iconCode] || <CloudSun className="h-6 w-6" />;

  const renderContent = () => {
    switch (locationStatus) {
      case 'loading':
      case 'idle':
        return <Skeleton className="absolute inset-0" />;
      case 'success':
        if (!weatherData) return null;
        return (
          <>
            <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                             <CardTitle className="font-headline">{t({ en: "Weather", ml: "കാലാവസ്ഥ", hi: "मौसम", ta: "வானிலை", te: "వాతావరణం", kn: "ಹವಾಮಾನ", bn: "আবহাওয়া", mr: "हवामान", gu: "હવામાન", pa: "ਮੌਸਮ" })}</CardTitle>
                             <CardDescription className="text-white/80">{locationName || 'Current Location'}</CardDescription>
                        </div>
                        {getIcon(weatherData.current.icon)}
                    </div>
                    <div className="mt-4">
                        <p className="text-5xl font-bold">{weatherData.current.temp}°</p>
                        <p className="text-lg capitalize -mt-1">{weatherData.current.description}</p>
                    </div>
                </div>
                 <Button variant="link" className="p-0 h-auto text-white justify-start">{t({en: "View Full Forecast", hi: "पूरा पूर्वानुमान देखें", ml: "പൂർണ്ണമായ പ്രവചനം കാണുക", ta: "முழு முன்னறிவிப்பைக் காண்க", te: "పూర్తి అంచనాను చూడండి", kn: "ಪೂರ್ಣ ಮುನ್ಸೂಚನೆಯನ್ನು ವೀಕ್ಷಿಸಿ", bn: "সম্পূর্ণ পূর্বাভাস দেখুন", mr: "पूर्ण अंदाज पहा", gu: "સંપૂર્ણ આગાહી જુઓ", pa: "ਪੂਰਾ ਪੂਰਵ-ਅਨੁਮਾਨ ਦੇਖੋ"})}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </>
        );
       case 'denied':
       case 'unsupported':
       case 'error':
       default:
        return (
            <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
                <div>
                    <div className="p-3 rounded-full bg-white/20 w-fit mb-2"><MapPinOff size={24} /></div>
                    <CardTitle className="font-headline">{t({ en: "Weather", ml: "കാലാവസ്ഥ", hi: "मौसम", ta: "வானிலை", te: "వాతావరణం", kn: "ಹವಾಮಾನ", bn: "আবহাওয়া", mr: "हवामान", gu: "હવામાન", pa: "ਮੌਸਮ" })}</CardTitle>
                    <p className="text-white/80 mt-1">{t({en: "Enable location to see local weather.", hi: "स्थानीय मौसम देखने के लिए स्थान सक्षम करें।", ml: "പ്രാദേശിക കാലാവസ്ഥ കാണാൻ ലൊക്കേഷൻ പ്രവർത്തനക്ഷമമാക്കുക.", ta: "உள்ளூர் வானிலை பார்க்க இருப்பிடத்தை இயக்கவும்.", te: "స్థానిక వాతావరణాన్ని చూడటానికి లొకేషన్‌ను ప్రారంభించండి.", kn: "ಸ್ಥಳೀಯ ಹವಾಮಾನವನ್ನು ನೋಡಲು ಸ್ಥಳವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.", bn: "স্থানীয় আবহাওয়া দেখতে অবস্থান সক্ষম করুন।", mr: "स्थानिक हवामान पाहण्यासाठी स्थान सक्षम करा.", gu: "સ્થાનિક હવામાન જોવા માટે સ્થાન સક્ષમ કરો.", pa: "ਸਥਾਨਕ ਮੌਸਮ ਦੇਖਣ ਲਈ ਸਥਾਨ ਨੂੰ ਸਮਰੱਥ ਕਰੋ।"})}</p>
                </div>
                <Button variant="link" className="p-0 h-auto text-white justify-start" onClick={(e) => { e.preventDefault(); handleGetLocation(); }}>
                    {locationStatus === 'loading' ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <MapPin className="mr-2 h-4 w-4"/>}
                    {t({en: "Enable Location", hi: "स्थान सक्षम करें", ml: "ലൊക്കേഷൻ പ്രവർത്തനക്ഷമമാക്കുക", ta: "இருப்பிடத்தை இயக்கு", te: "స్థానాన్ని ప్రారంభించు", kn: "ಸ್ಥಳವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ", bn: "অবস্থান সক্ষম করুন", mr: "स्थान सक्षम करा", gu: "સ્થાન સક્ષમ કરો", pa: "ਸਥਾਨ ਸਮਰੱਥ ਕਰੋ"})}
                </Button>
            </div>
        );
    }
  };

  return (
    <Link href="/weather" className="block group">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative">
            {weatherImage && (
                 <Image
                    src={weatherImage.imageUrl}
                    alt={weatherImage.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 z-0"
                    data-ai-hint={weatherImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50 z-10" />
            {renderContent()}
        </Card>
    </Link>
  );
}
