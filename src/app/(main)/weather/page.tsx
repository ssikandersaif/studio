
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
import { useLanguage } from "@/contexts/language-context";

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
  const { toast } = useToast();
  const { t } = useLanguage();

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
        title: t({ en: "Error fetching weather", ml: "കാലാവസ്ഥ ലഭിക്കുന്നതിൽ പിശക്", hi: "मौसम लाने में त्रुटि", ta: "வானிலை பெறுவதில் பிழை", te: "వాతావరణాన్ని పొందడంలో లోపం", kn: "ಹವಾಮಾನವನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ", bn: "আবহাওয়া আনতে ত্রুটি", mr: " हवामान आणण्यात त्रुटी", gu: "હવામાન લાવવામાં ભૂલ", pa: "ਮੌਸਮ ਲਿਆਉਣ ਵਿੱਚ ਗਲਤੀ" }),
        description: (error as Error).message || t({ en: "Could not fetch weather data.", ml: "കാലാവസ്ഥാ ഡാറ്റ ലഭ്യമാക്കാൻ കഴിഞ്ഞില്ല.", hi: "मौसम डेटा प्राप्त नहीं किया जा सका।", ta: "வானிலை தரவைப் பெற முடியவில்லை.", te: "వాతావరణ డేటాను పొందలేకపోయింది.", kn: "ಹವಾಮಾನ ಡೇಟಾವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.", bn: "আবহাওয়ার ডেটা আনা যায়নি।", mr: "हवाમાન डेटा मिळू शकला नाही.", gu: "હવામાન ડેટા મેળવી શકાયો નથી.", pa: "ਮੌਸਮ ਡਾਟਾ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਿਆ।" }),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: t({ en: "Geolocation not supported", ml: "ജിയോലൊക്കേഷൻ പിന്തുണയ്ക്കുന്നില്ല", hi: "जियोलोकेशन समर्थित नहीं है", ta: "Geolocation समर्थित নয়", te: "జియోलोకేషన్ समर्थित नहीं है", kn: "Geolocation समर्थितವಾಗಿಲ್ಲ", bn: "Geolocation সমর্থিত নয়", mr: "जिओलोकेशन समर्थित नाही", gu: "જીઓલોકેશન समर्थित નથી", pa: "Geolocation ਸਮର୍ਥित ਨਹੀਂ ਹੈ" }),
        description: t({ en: "Your browser doesn't support geolocation. Showing default location.", ml: "നിങ്ങളുടെ ബ്രൗസർ ജിയോലൊക്കേഷൻ പിന്തുണയ്ക്കുന്നില്ല. സ്ഥിരസ്ഥിതി ലൊക്കേഷൻ കാണിക്കുന്നു.", hi: "आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है। डिफ़ॉल्ट स्थान दिखा रहा है।", ta: "உங்கள் உலாவி புவிஇருப்பிடத்தை ஆதரிக்கவில்லை. இயல்புநிலை இருப்பிடத்தைக் காட்டுகிறது.", te: "మీ బ్రౌజర్ జియోలోకేషన్‌కు మద్దతు ఇవ్వదు. డిఫాల్ట్ లొకేషన్‌ను చూపుతోంది.", kn: "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಜಿಯೋಲೋಕೇಶನ್ ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ. ಡಿಫಾಲ್ಟ್ ಸ್ಥಳವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.", bn: "আপনার ব্রাউজার জিওলোকেশন সমর্থন করে না। ডিফল্ট অবস্থান দেখানো হচ্ছে।", mr: "तुमचा ब्राउझर भौगोलिक स्थानास समर्थन देत नाही. डीफॉल्ट स्थान दर्शवित आहे.", gu: "તમારું બ્રાઉઝર જીઓલોકેશનને સમર્થન કરતું નથી. ડિફોલ્ટ સ્થાન બતાવી રહ્યું છે.", pa: "ਤੁਹਾਡਾ ਬਰਾਊਜ਼ਰ ਜਿਓਲੋਕੇਸ਼ਨ ਦਾ ਸਮਰਥਨ ਨਹੀਂ ਕਰਦਾ। ਡਿਫੌਲਟ ਸਥਾਨ ਦਿਖਾ ਰਿਹਾ ਹੈ।" }),
      });
       // Default location (e.g., Delhi)
      fetchWeather(28.6139, 77.2090);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
        toast({
          title: t({ en: "Location detected!", ml: "ലൊക്കേഷൻ കണ്ടെത്തി!", hi: "स्थान का पता चला!", ta: "இடம் கண்டறியப்பட்டது!", te: "స్థానం కనుగొనబడింది!", kn: "ಸ್ಥಳವನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ!", bn: "অবস্থান সনাক্ত করা হয়েছে!", mr: "स्थान आढळले!", gu: "સ્થાન શોધી કાઢ્યું!", pa: "ਸਥਾਨ ਦਾ ਪਤਾ ਲੱਗਾ!" }),
          description: t({ en: "Displaying weather for your current location.", ml: "നിങ്ങളുടെ ప్రస్తుത ലൊക്കേഷനിലെ കാലാവസ്ഥ പ്രദർശിപ്പിക്കുന്നു.", hi: "आपके वर्तमान स्थान के लिए मौसम प्रदर्शित कर रहा है।", ta: "உங்கள் தற்போதைய இருப்பிடத்திற்கான வானிலை காட்டுகிறது.", te: "మీ ప్రస్తుత స్థానం కోసం వాతావరణాన్ని ప్రదర్శిస్తోంది.", kn: "ನಿಮ್ಮ ప్రస్తుత સ્થાનಕ್ಕಾಗಿ ಹವಾಮಾನವನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ.", bn: "আপনার বর্তমান অবস্থানের জন্য আবহাওয়া প্রদর্শন করা হচ্ছে।", mr: "तुमच्या सध्याच्या स्थानासाठी हवामान प्रदर्शित करत आहे.", gu: "તમારા વર્તમાન સ્થાન માટે હવામાન ప్రદર્શિત કરી રહ્યું છે.", pa: "ਤੁਹਾਡੇ ਮੌਜੂਦਾ ਸਥਾਨ ਲਈ ਮੌਸਮ ప్రదర్శਿਤ ਕਰ ਰਿਹਾ ਹੈ।" }),
        });
      },
      (error) => {
        let descriptionKey: 'permission_denied' | 'position_unavailable' | 'timeout' | 'default' = 'default';

        if (error.code === error.PERMISSION_DENIED) {
            descriptionKey = 'permission_denied'
        } else if (error.code === error.POSITION_UNAVAILABLE) {
            descriptionKey = 'position_unavailable'
        } else if (error.code === error.TIMEOUT) {
            descriptionKey = 'timeout'
        }
        
        const descriptions = {
            permission_denied: { en: "You denied location access. Showing weather for default location.", ml: "നിങ്ങൾ ലൊക്കേഷൻ ആക്‌സസ്സ് നിഷേധിച്ചു. സ്ഥിരസ്ഥിതി ലൊക്കേഷനിലെ കാലാവസ്ഥ കാണിക്കുന്നു.", hi: "आपने स्थान पहुंच से इनकार कर दिया। डिफ़ॉल्ट स्थान के लिए मौसम दिखा रहा है।", ta: "நீங்கள் இருப்பிட அணுகலை மறுத்துவிட்டீர்கள். இயல்புநிலை இருப்பிடத்திற்கான வானிலையைக் காட்டுகிறது.", te: "మీరు లొకేషన్ యాక్సెస్‌ను నిరాకరించారు. డిఫాల్ట్ లొకేషన్ కోసం వాతావరణాన్ని చూపుతోంది.", kn: "ನೀವು ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು ನಿರಾಕರಿಸಿದ್ದೀರಿ. ಡೀಫಾಲ್ಟ್ ಸ್ಥಳಕ್ಕಾಗಿ ಹವಾಮಾನವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.", bn: "আপনি অবস্থানের অ্যাক্সেস অস্বীকার করেছেন। ডিফল্ট অবস্থানের জন্য আবহাওয়া দেখানো হচ্ছে।", mr: "तुम्ही स्थान प्रवेशास नकार दिला. डीफॉल्ट स्थानासाठी हवामान दर्शवित आहे.", gu: "તમે સ્થાન ઍક્સેસને નકારી દીધી છે. ડિફોલ્ટ સ્થાન માટે હવામાન બતાવી રહ્યું છે.", pa: "ਤੁਸੀਂ ਸਥਾਨ ਪਹੁੰਚ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ ਹੈ। ਪੂਰਵ-ਨਿਰਧਾਰਤ ਸਥਾਨ ਲਈ ਮੌਸਮ ਦਿਖਾ ਰਿਹਾ ਹੈ।" },
            position_unavailable: { en: "Location information is unavailable. Showing weather for default location.", ml: "ലൊക്കേഷൻ വിവരങ്ങൾ ലഭ്യമല്ല. സ്ഥിരസ്ഥിതി ലൊക്കേഷനിലെ കാലാവസ്ഥ കാണിക്കുന്നു.", hi: "स्थान की जानकारी अनुपलब्ध है। डिफ़ॉल्ट स्थान के लिए मौसम दिखा रहा है।", ta: "இருப்பிடத் தகவல் கிடைக்கவில்லை. இயல்புநிலை இருப்பிடத்திற்கான வானிலையைக் காட்டுகிறது.", te: "స్థాన సమాచారం అందుబాటులో లేదు. డిఫాల్ట్ లొకేషన్ కోసం వాతావరణాన్ని చూపుతోంది.", kn: "ಸ್ಥಳ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ. ಡೀಫಾಲ್ಟ್ ಸ್ಥಳಕ್ಕಾಗಿ ಹವಾಮಾನವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.", bn: "অবস্থানের তথ্য অনুপলব্ধ। ডিফল্ট অবস্থানের জন্য আবহাওয়া দেখানো হচ্ছে।", mr: "स्थान माहिती अनुपलब्ध आहे. डीफॉल्ट स्थानासाठी हवामान दर्शवित आहे.", gu: "સ્થાન માહિતી અનુપલબ્ધ છે. ડિફોલ્ટ સ્થાન માટે હવામાન બતાવી રહ્યું છે.", pa: "ਸਥਾਨ ਦੀ ਜਾਣਕਾਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਪੂਰਵ-ਨਿਰਧਾਰਤ ਸਥਾਨ ਲਈ ਮੌਸਮ ਦਿਖਾ ਰਿਹਾ ਹੈ।" },
            timeout: { en: "The request to get user location timed out. Showing weather for default location.", ml: "ഉപയോക്തൃ ലൊക്കേഷൻ നേടാനുള്ള അഭ്യർത്ഥന കാലഹരണപ്പെട്ടു. സ്ഥിരസ്ഥിതി ലൊക്കേഷനിലെ കാലാവസ്ഥ കാണിക്കുന്നു.", hi: "उपयोगकर्ता स्थान प्राप्त करने का अनुरोध समय समाप्त हो गया। डिफ़ॉल्ट स्थान के लिए मौसम दिखा रहा है।", ta: "பயனர் இருப்பிடத்தைப் பெறுவதற்கான கோரிக்கை காலாவதியானது. இயல்புநிலை இருப்பிடத்திற்கான வானிலையைக் காட்டுகிறது.", te: "వినియోగదారు స్థానాన్ని పొందడానికి అభ్యర్థన సమయం ముగిసింది. డిఫాల్ట్ లొకేషన్ కోసం వాతావరణాన్ని చూపుతోంది.", kn: "ಬಳಕೆದಾರರ ಸ್ಥಳವನ್ನು ಪಡೆಯುವ ವಿನಂತಿಯು ಸಮಯ ಮುಗಿದಿದೆ. ಡೀಫಾಲ್ಟ್ ಸ್ಥಳಕ್ಕಾಗಿ ಹವಾಮಾನವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.", bn: "ব্যবহারকারীর অবস্থান পাওয়ার অনুরোধের সময় শেষ। ডিফল্ট অবস্থানের জন্য আবহাওয়া দেখানো হচ্ছে।", mr: "वापरकर्ता स्थान मिळवण्याची विनंती कालबाह्य झाली. डीफॉल्ट स्थानासाठी हवामान दर्शवित आहे.", gu: "વપરાશકર્તા સ્થાન મેળવવાની વિનંતી સમયસમાપ્ત થઈ ગઈ. ડિફોલ્ટ સ્થાન માટે હવામાન બતાવી રહ્યું છે.", pa: "ਉਪਭੋਗਤਾ ਸਥਾਨ ਪ੍ਰਾਪਤ ਕਰਨ ਦੀ ਬੇਨਤੀ ਦਾ ਸਮਾਂ ਸਮਾਪਤ ਹੋ ਗਿਆ ਹੈ। ਪੂਰਵ-ਨਿਰਧਾਰਤ ਸਥਾਨ ਲਈ ਮੌਸਮ ਦਿਖਾ ਰਿਹਾ ਹੈ।" },
            default: { en: "Could not get your location. Please allow location access in your browser settings. Showing weather for default location.", ml: "നിങ്ങളുടെ ലൊക്കേഷൻ ലഭിച്ചില്ല. നിങ്ങളുടെ ബ്രൗസർ ക്രമീകരണങ്ങളിൽ ലൊക്കേഷൻ ആക്‌സസ്സ് അനുവദിക്കുക. സ്ഥിരസ്ഥിതി ലൊക്കേഷനിലെ കാലാവസ്ഥ കാണിക്കുന്നു.", hi: "आपका स्थान प्राप्त नहीं हो सका। कृपया अपनी ब्राउज़र सेटिंग्स में स्थान पहुंच की अनुमति दें। डिफ़ॉल्ट स्थान के लिए मौसम दिखा रहा है।", ta: "உங்கள் இருப்பிடத்தைப் பெற முடியவில்லை. உங்கள் உலாவி அமைப்புகளில் இருப்பிட அணுகலை அனுமதிக்கவும். இயல்புநிலை இருப்பிடத்திற்கான வானிலையைக் காட்டுகிறது.", te: "మీ స్థానాన్ని పొందలేకపోయింది. దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో స్థాన ప్రాప్యతను అనుమతించండి. డిఫాల్ట్ లొకేషన్ కోసం వాతావరణాన్ని చూపుతోంది.", kn: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಿ. ಡೀಫಾಲ್ಟ್ ಸ್ಥಳಕ್ಕಾಗಿ ಹವಾಮಾನವನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.", bn: "আপনার অবস্থান পাওয়া যায়নি। অনুগ্রহ করে আপনার ব্রাউজার সেটিংসে অবস্থান অ্যাক্সেসের অনুমতি দিন। ডিফল্ট অবস্থানের জন্য আবহাওয়া দেখানো হচ্ছে।", mr: "तुमचे स्थान मिळू शकले नाही. कृपया तुमच्या ब्राउझर सेटिंग्जमध्ये स्थान प्रवेशास परवानगी द्या. डीफॉल्ट स्थानासाठी हवामान दर्शवित आहे.", gu: "તમારું સ્થાન મેળવી શકાયું નથી. કૃપા કરીને તમારા બ્રાઉઝર સેટિંગ્સમાં સ્થાન ઍક્સેસને મંજૂરી આપો. ડિફોલ્ટ સ્થાન માટે હવામાન બતાવી રહ્યું છે.", pa: "ਤੁਹਾਡਾ ਸਥਾਨ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀਆਂ ਬ੍ਰਾਊਜ਼ਰ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਸਥਾਨ ਪਹੁੰਚ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ। ਪੂਰਵ-ਨਿਰਧਾਰਤ ਸਥਾਨ ਲਈ ਮੌਸਮ ਦਿਖਾ ਰਿਹਾ ਹੈ।" },
        };
        
        toast({
          variant: "destructive",
          title: t({ en: "Unable to retrieve location", ml: "ലൊക്കേഷൻ വീണ്ടെടുക്കാൻ കഴിഞ്ഞില്ല", hi: "स्थान पुनर्प्राप्त करने में असमर्थ", ta: "இருப்பிடத்தை மீட்டெடுக்க முடியவில்லை", te: "స్థానాన్ని తిరిగి పొందలేకపోయింది", kn: "ಸ್ಥಳವನ್ನು ಹಿಂಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ", bn: "অবস্থান পুনরুদ্ধার করা যায়নি", mr: "स्थान पुनर्प्राप्त करू शकत नाही", gu: "સ્થान પુનઃપ્રાप्त કરવામાં અસમર્થ", pa: "ਸਥਾਨ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ" }),
          description: t(descriptions[descriptionKey]),
        });

        // Fallback to default location
        fetchWeather(28.6139, 77.2090);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const getIcon = (iconCode: string) => {
      return iconMap[iconCode] || <CloudSun className="h-10 w-10 text-gray-500" />;
  }


  return (
    <>
      <Header
        title={t({ en: "Weather Forecast", ml: "കാലാവസ്ഥാ പ്രവചനം", hi: "मौसम पूर्वानुमान", ta: "வானிலை முன்னறிவிப்பு", te: "వాతావరణ முன்னறிవిப்பு", kn: "ಹವಾಮಾನ وړاندوینه", bn: "আবহাওয়ার পূর্বাভাস", mr: " हवामान अंदाज", gu: "હવામાન આગાહી", pa: "ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ" })}
        description={t({ en: "Current conditions and 5-day forecast with farming impact analysis.", ml: "നിലവിലെ അവസ്ഥയും 5 ദിവസത്തെ പ്രവചനവും കാർഷിക ആഘാത വിശകലനവും.", hi: "कृषि प्रभाव विश्लेषण के साथ वर्तमान स्थितियाँ और 5-दिवसीय पूर्वानुमान।", ta: "தற்போதைய நிலைமைகள் மற்றும் விவசாய प्रभाव பகுப்பாய்வுடன் 5-நாள் முன்னறிவிப்பு.", te: "ప్రస్తుత పరిస్థితులు మరియు వ్యవసాయ ప్రభావ ਵਿਸ਼ਲੇషణతో 5-రోజుల முன்னறிవిப்பு.", kn: "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳು మరియు ಕೃಷಿ ప్రభావ ವಿಶ್ಲೇಷಣೆಯೊಂದಿಗೆ 5-ದಿನಗಳ وړاندوینه.", bn: "বর্তমান পরিস্থিতি এবং কৃষি প্রভাব বিশ্লেষণের সাথে 5-দিনের পূর্বাভাস।", mr: "सध्याची परिस्थिती आणि शेती प्रभाव विश्लेषणासह 5-दिवसांचा अंदाज.", gu: "વર્તમાન પરિસ્થિતિઓ మరియు કૃષિ પ્રભਾਵ વિશ્લેષણ સાથે 5-દિવસની આગાહી.", pa: "ਮੌਜੂਦਾ ਹਾਲਾਤ ਅਤੇ ਖੇਤੀ ਪ੍ਰਭਾਵ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਾਲ 5-ਦਿਨ ਦੀ ਭਵਿੱਖਬਾਣੀ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold capitalize">{t({ en: "Weather for", ml: "ഇവിടെ കാലാവസ്ഥ", hi: "के लिए मौसम", ta: "க்கான வானிலை", te: "కోసం వాతావరణం", kn: "ಗಾಗಿ ಹವಾಮಾನ", bn: "জন্য আবহাওয়া", mr: "साठी हवामान", gu: "માટે હવામાન", pa: "ਲਈ ਮੌਸਮ" })} {locationName}</h2>
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
                <CardTitle>{t({ en: "Current Conditions", ml: "നിലവിലെ അവസ്ഥ", hi: "वर्तमान स्थितियाँ", ta: "தற்போதைய நிலைமைகள்", te: "ప్రస్తుత పరిస్థితులు", kn: "ಪ್ರಸ್ತುತ ಪರಿಸ್ਥಿತಿಗಳು", bn: "বর্তমান পরিস্থিতি", mr: "सध्याची परिस्थिती", gu: "વર્તમાન પરિસ્થિતિઓ", pa: "ਮੌਜੂਦਾ ਹਾਲਾਤ" })}</CardTitle>
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
                        <p className="text-sm text-muted-foreground">{t({ en: "Humidity", ml: "ஈർപ്പം", hi: "नमी", ta: "ஈரப்பதம்", te: "తేమ", kn: " आर्द्रता", bn: "आर्द्रता", mr: "आर्द्रता", gu: "ભેજ", pa: "ਨਮੀ" })}</p>
                    </div>
                     <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50">
                        <Wind className="h-6 w-6 text-primary mb-2"/>
                        <p className="font-bold text-lg">{weatherData.current.wind} km/h</p>
                        <p className="text-sm text-muted-foreground">{t({ en: "Wind", ml: "കാറ്റ്", hi: "हवा", ta: "காற்று", te: "గాలి", kn: "ಗాలి", bn: "বাতাস", mr: "वारा", gu: "પવન", pa: "ਹਵਾ" })}</p>
                    </div>
                </div>
                <div className="md:col-span-2 p-4 bg-accent/20 text-accent-foreground/80 rounded-lg">
                    <p className="font-semibold">{t({ en: "Farming Recommendation:", ml: "കാർഷിക ശുപാർശ:", hi: "खेती की सिफारिश:", ta: "விவசாய பரிந்துரை:", te: "వ్యవసాయ సిఫార్సు:", kn: "ಕೃಷಿ ಶಿಫಾರಸು:", bn: "কৃষি பரிந்துரை:", mr: "शेतीची शिफारस:", gu: "ખેतीની ભલામણ:", pa: "ਖੇਤੀ ਸਿਫਾਰਸ਼:" })}</p>
                    <p>{weatherData.current.recommendation}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t({ en: "5-Day Forecast", ml: "5 ദിവസത്തെ പ്രവചനം", hi: "5-दिवसीय पूर्वानुमान", ta: "5-நாள் முன்னறிவிப்பு", te: "5-రోజుల முன்னறிవిப்பு", kn: "5-ದಿನಗಳ وړاندوینه", bn: "5 দিনের পূর্বাভাস", mr: "5-दिवसांचा अंदाज", gu: "5-દિવસની આગાહી", pa: "5-ਦਿਨ ਦੀ ਭਵਿੱਖਬਾਣੀ" })}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center p-2 rounded-lg bg-secondary">
                    <p className="font-bold">{day.day}</p>
                    <div className="my-2">{getIcon(day.icon)}</div>
                    <p className="text-xl font-semibold">{day.temp}°C</p>t
                    <p className="text-xs text-muted-foreground capitalize">{day.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <p>{t({ en: "Could not load weather data.", ml: "കാലാവസ്ഥാ ഡാറ്റ ലഭ്യമാക്കാൻ കഴിഞ്ഞില്ല.", hi: "मौसम डेटा लोड नहीं किया जा सका।", ta: "வானிலை தரவை ஏற்ற முடியவில்லை.", te: "వాతావరణ డేటాను లోడ్ చేయలేకపోయింది.", kn: "ಹವಾಮಾನ ಡೇಟಾವನ್ನು లోడ్ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.", bn: "আবহাওয়ার ডেটা লোಡ್ করা যায়নি।", mr: "हवाમાન डेटा लोड करू शकला नाही.", gu: "હવામાન ડેટા લોડ કરી શકાયો નથી.", pa: "ਮੌਸਮ ਡਾਟਾ ਲੋడ్ नहीं ਕੀਤਾ ਜਾ ਸਕਿਆ।" })}</p>
        )}
      </main>
    </>
  );
}
