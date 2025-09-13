
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
  const [gettingLocation, setGettingLocation] = useState(false);
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
    // Default location (e.g., Delhi)
    fetchWeather(28.6139, 77.2090);
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: t({ en: "Geolocation not supported", ml: "ജിയോലൊക്കേഷൻ പിന്തുണയ്ക്കുന്നില്ല", hi: "जियोलोकेशन समर्थित नहीं है", ta: "Geolocation समर्थित নয়", te: "జియోलोకేషన్ समर्थित नहीं है", kn: "Geolocation समर्थितವಾಗಿಲ್ಲ", bn: "Geolocation সমর্থিত নয়", mr: "जिओलोकेशन समर्थित नाही", gu: "જીઓલોકેશન समर्थित નથી", pa: "Geolocation ਸਮର୍ਥित ਨਹੀਂ ਹੈ" }),
        description: t({ en: "Your browser doesn't support geolocation.", ml: "നിങ്ങളുടെ ബ്രൗസർ ജിയോലൊക്കേഷൻ പിന്തുണയ്ക്കുന്നില്ല.", hi: "आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है।", ta: "உங்கள் உலாவி జియోలోకేషన్‌కు ஆதரవளிக்கదు.", te: "మీ బ్రౌజర్ జియోలోకేషన్‌కు ஆதரవளிக்கదు.", kn: "ನಿಮ್ಮ ಬ್ರೌज़र జియోలోకేషన్‌ಗೆ ஆதரவளிക്കదు.", bn: "আপনার 브라우저 जियोलोकेशन সমর্থন করে না।", mr: "तुमचा ब्राउझर भौगोलिक स्थानास समर्थन देत नाही.", gu: "તમારું બ્રાઉज़र જીઓલોકેશનને समर्थन નથી કરતું.", pa: "ਤੁਹਾਡਾ ਬ੍ਰਾਊਜ਼ਰ जियोलोकेशन ਦਾ ਸਮਰਥਨ ਨਹੀਂ ਕਰਦਾ।" }),
      });
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
        setGettingLocation(false);
        toast({
          title: t({ en: "Location updated!", ml: "ലൊക്കേഷൻ അപ്‌ഡേറ്റ് ചെയ്തു!", hi: "स्थान अपडेट किया गया!", ta: "இடம் புதுப்பிக்கப்பட்டது!", te: "స్థానం నవీకరించబడింది!", kn: "ಸ್ಥಳವನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ!", bn: "অবস্থান আপডেট করা হয়েছে!", mr: "स्थान अपडेट केले!", gu: "સ્થान અપડેટ થયું!", pa: "ਸਥਾਨ ਅੱਪਡੇਟ ਕੀਤਾ ਗਿਆ!" }),
          description: t({ en: "Displaying weather for your current location.", ml: "നിങ്ങളുടെ ప్రస్తుത ലൊക്കേഷനിലെ കാലാവസ്ഥ പ്രദർശിപ്പിക്കുന്നു.", hi: "आपके वर्तमान स्थान के लिए मौसम प्रदर्शित कर रहा है।", ta: "உங்கள் தற்போதைய இருப்பிடத்திற்கான வானிலை காட்டுகிறது.", te: "మీ ప్రస్తుత స్థానం కోసం వాతావరణాన్ని ప్రదర్శిస్తోంది.", kn: "ನಿಮ್ಮ ప్రస్తుత સ્થાનಕ್ಕಾಗಿ ಹವಾಮಾನವನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ.", bn: "আপনার বর্তমান অবস্থানের জন্য আবহাওয়া প্রদর্শন করা হচ্ছে।", mr: "तुमच्या सध्याच्या स्थानासाठी हवामान प्रदर्शित करत आहे.", gu: "તમારા વર્તમાન સ્થાન માટે હવામાન ప్రદર્શિત કરી રહ્યું છે.", pa: "ਤੁਹਾਡੇ ਮੌਜੂਦਾ ਸਥਾਨ ਲਈ ਮੌਸਮ ప్రదర్శਿਤ ਕਰ ਰਿਹਾ ਹੈ।" }),
        });
      },
      (error) => {
        setGettingLocation(false);
        let descriptionKey: 'permission_denied' | 'position_unavailable' | 'timeout' | 'default' = 'default';

        if (error.code === error.PERMISSION_DENIED) {
            descriptionKey = 'permission_denied'
        } else if (error.code === error.POSITION_UNAVAILABLE) {
            descriptionKey = 'position_unavailable'
        } else if (error.code === error.TIMEOUT) {
            descriptionKey = 'timeout'
        }
        
        const descriptions = {
            permission_denied: { en: "You denied the request for Geolocation. To fix this, open your browser settings, find this site's permissions, and change the Location access to 'Allow'.", ml: "നിങ്ങൾ ജിയോലൊക്കേഷനായുള്ള അഭ്യർത്ഥന നിരസിച്ചു. ഇത് പരിഹരിക്കുന്നതിന്, നിങ്ങളുടെ ബ്രൗസർ ക്രമീകരണങ്ങൾ തുറന്ന്, ഈ സൈറ്റിന്റെ അനുമതികൾ കണ്ടെത്തി, ലൊക്കേഷൻ ആക്സസ് 'അനുവദിക്കുക' എന്ന് മാറ്റുക.", hi: "आपने जियोलोकेशन के लिए अनुरोध अस्वीकार कर दिया। इसे ठीक करने के लिए, अपनी ब्राउज़र सेटिंग्स खोलें, इस साइट की अनुमतियाँ खोजें, और स्थान पहुँच को 'अनुमति दें' में बदलें।", ta: "நீங்கள் ஜியோலோகேஷன் கோரிக்கையை மறுத்துவிட்டீர்கள். இதை சரிசெய்ய, உங்கள் உலாவி அமைப்புகளைத் திறந்து, இந்த தளத்திற்கான அனுமதிகளைக் கண்டறிந்து, இருப்பிட அணுகலை 'அனுமதி' என மாற்றவும்.", te: "మీరు జియోలోకేషన్ కోసం అభ్యర్థనను నిరాకరించారు. దీన్ని పరిష్కరించడానికి, మీ బ్రౌజర్ సెట్టింగ్‌లను తెరిచి, ఈ సైట్ యొక్క అనుమతులను కనుగొని, స్థాన ప్రాప్యతను 'అనుమతించు'కు మార్చండి.", kn: "ನೀವು ಜಿಯೋಲೋಕೇಶನ್‌ಗಾಗಿ ವಿನಂತಿಯನ್ನು ನಿರಾಕರಿಸಿದ್ದೀರಿ. ಇದನ್ನು ಸರಿಪಡಿಸಲು, ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ತೆರೆಯಿರಿ, ಈ ಸೈಟ್‌ನ ಅನುಮತಿಗಳನ್ನು ಹುಡುಕಿ, ಮತ್ತು ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು 'ಅನುಮತಿಸಿ' ಎಂದು ಬದಲಾಯಿಸಿ.", bn: "আপনি জিওলোকেশন অনুরোধ প্রত্যাখ্যান করেছেন। এটি ঠিক করতে, আপনার ব্রাউজার সেটিংস খুলুন, এই সাইটের অনুমতি খুঁজুন, এবং অবস্থান অ্যাক্সেস 'অনুমতি দিন'-এ পরিবর্তন করুন।", mr: "तुम्ही भौगोलिक स्थानासाठी विनंती नाकारली. हे दुरुस्त करण्यासाठी, तुमच्या ब्राउझर सेटिंग्ज उघडा, या साइटच्या परवानग्या शोधा, आणि स्थान प्रवेश 'अनुमती द्या' मध्ये बदला.", gu: "તમે જીઓલોકેશન માટેની વિનંતીને નકારી દીધી છે. તેને સુધારવા માટે, તમારા બ્રાઉઝર સેટિંગ્સ ખોલો, આ સાઇટની પરવાનગીઓ શોધો, અને સ્થાન ઍક્सेसને 'મંજૂરી આપੋ' માં બદલો.", pa: "ਤੁਸੀਂ ਜਿਓਲੋਕੇਸ਼ਨ ਲਈ ਬੇਨਤੀ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ ਹੈ। ਇਸ ਨੂੰ ਠੀਕ ਕਰਨ ਲਈ, ਆਪਣੀਆਂ ਬ੍ਰਾਊਜ਼ਰ ਸੈਟਿੰਗਾਂ ਖੋਲ੍ਹੋ, ਇਸ ਸਾਈਟ ਦੀਆਂ ਇਜਾਜ਼ਤਾਂ ਲੱਭੋ, ਅਤੇ ਸਥਾਨ ਪਹੁੰਚ ਨੂੰ 'ਮਨਜ਼ੂਰੀ ਦਿਓ' ਵਿੱਚ ਬਦਲੋ।" },
            position_unavailable: { en: "Location information is unavailable.", ml: "ലൊക്കേഷൻ വിവരങ്ങൾ ലഭ്യമല്ല.", hi: "स्थान की जानकारी अनुपलब्ध है।", ta: "இடம்பெற்ற தகவல் கிடைக்கவில்லை.", te: "స్థాన సమాచారం అందుబాటులో లేదు.", kn: "ಸ್ಥಳ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.", bn: "অবস্থানের তথ্য अनुपलब्ध।", mr: "स्थान माहिती अनुपलब्ध आहे.", gu: "સ્થાન માહિતી अनुपलब्ध છે.", pa: "ਸਥਾਨ ਦੀ ਜਾਣਕਾਰੀ अनुपलब्ध ਹੈ।" },
            timeout: { en: "The request to get user location timed out.", ml: "ഉപയോക്തൃ ലൊക്കേഷൻ നേടാനുള്ള അഭ്യർത്ഥന കാലഹരണപ്പെട്ടു.", hi: "उपयोगकर्ता स्थान प्राप्त करने का अनुरोध समय समाप्त हो गया।", ta: "பயனர் இருப்பிடத்தைப் பெறுவதற்கான கோரிக்கை காலாவதியானது.", te: "వినియోగదారు స్థానాన్ని పొందడానికి అభ్యర్థన సమయం ముగిసింది.", kn: "ಬಳಕೆದಾರರ ಸ್ಥಳವನ್ನು ಪಡೆಯುವ ವಿನಂತಿಯು ಸಮಯ ಮುగిసింది.", bn: "사용자 위치 পাওয়ার জন্য অনুরোধের সময়সীма 초้น થઈ ગઈ।", mr: "वापरकर्ता स्थान मिळवण्याची विनंती कालबाह्य झाली.", gu: "વપરાશકર્તા स्थान મેળવવાની વિનंती સમયસમાપ્ત થઈ ગઈ.", pa: "ਉਪਭੋਗता ਸਥਾਨ ਪ੍ਰਾਪਤ ਕਰਨ ਦੀ ਬੇਨਤੀ ਦਾ ਸਮਾਂ ਸਮਾપ્ત ਹੋ ਗਿਆ।" },
            default: { en: "Please allow location access in your browser settings.", ml: "നിങ്ങളുടെ ബ്രൗസർ ക്രമീകരണങ്ങളിൽ ലൊക്കേഷൻ ആക്‌സസ്സ് അനുവദിക്കുക.", hi: "कृपया अपने ब्राउज़र सेटिंग्स में स्थान पहुंच की अनुमति दें।", ta: "உங்கள் உலாவி அமைப்புகளில் இருப்பிட அணுகலை அனுமதிக்கவும்.", te: "దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో స్థాన ప్రాప్యతను అనుమతించండి.", kn: "దయವಿಟ್ಟು ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆట్టిಂಗ್‌ಗಳಲ್ಲಿ ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಿ.", bn: "অনুগ্রহ করে আপনার ব্রাউজার സെറ്റിംഗ്‌সে অবস্থানের অ্যাক্সেস অনুমতি দিন।", mr: "कृपया तुमच्या ब्राउझर सेटिंग्जमध्ये स्थान प्रवेशास परवानगी द्या.", gu: "કૃપા કરીને તમારા બ્રાઉઝર સેટિંગ્સમાં સ્થાન ઍક્सेसને મંજૂરી આપો.", pa: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਬ੍ਰਾਊਜ਼ਰ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਸਥਾਨ ਪਹੁੰਚ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ।" },
        };
        
        toast({
          variant: "destructive",
          title: t({ en: "Unable to retrieve location", ml: "ലൊക്കേഷൻ വീണ്ടെടുക്കാൻ കഴിഞ്ഞില്ല", hi: "स्थान पुनर्प्राप्त करने में असमर्थ", ta: "இருப்பிடத்தை மீட்டெடுக்க முடியவில்லை", te: "స్థానాన్ని తిరిగి పొందలేకపోయింది", kn: "ಸ್ಥಳವನ್ನು ಹಿಂಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ", bn: "অবস্থান পুনরুদ্ধার করা যায়নি", mr: "स्थान पुनर्प्राप्त करू शकत नाही", gu: "સ્થान પુનઃપ્રાप्त કરવામાં અસમર્થ", pa: "ਸਥਾਨ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ" }),
          description: t(descriptions[descriptionKey]),
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
        title={t({ en: "Weather Forecast", ml: "കാലാവസ്ഥാ പ്രവചനം", hi: "मौसम पूर्वानुमान", ta: "வானிலை முன்னறிவிப்பு", te: "వాతావరణ முன்னறிவிப்பு", kn: "ಹವಾಮಾನ وړاندوینه", bn: "আবহাওয়ার পূর্বাভাস", mr: " हवामान अंदाज", gu: "હવામાન આગાહી", pa: "ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ" })}
        description={t({ en: "Current conditions and 5-day forecast with farming impact analysis.", ml: "നിലവിലെ അവസ്ഥയും 5 ദിവസത്തെ പ്രവചനവും കാർഷിക ആഘാത വിശകലനവും.", hi: "कृषि प्रभाव विश्लेषण के साथ वर्तमान स्थितियाँ और 5-दिवसीय पूर्वानुमान।", ta: "தற்போதைய நிலைமைகள் மற்றும் விவசாய प्रभाव பகுப்பாய்வுடன் 5-நாள் முன்னறிவிப்பு.", te: "ప్రస్తుత పరిస్థితులు మరియు వ్యవసాయ ప్రభావ ਵਿਸ਼ਲੇషణతో 5-రోజుల முன்னறிவிப்பு.", kn: "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳು మరియు ಕೃಷಿ ప్రభావ ವಿಶ್ಲೇಷಣೆಯೊಂದಿಗೆ 5-ದಿನಗಳ وړاندوینه.", bn: "বর্তমান পরিস্থিতি এবং কৃষি প্রভাব বিশ্লেষণের সাথে 5-দিনের পূর্বাভাস।", mr: "सध्याची परिस्थिती आणि शेती प्रभाव विश्लेषणासह 5-दिवसांचा अंदाज.", gu: "વર્તમાન પરિસ્થિતિઓ మరియు કૃષિ પ્રભਾਵ વિશ્લેષણ સાથે 5-દિવસની આગાહી.", pa: "ਮੌਜੂਦਾ ਹਾਲਾਤ ਅਤੇ ਖੇਤੀ ਪ੍ਰਭਾਵ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਾਲ 5-ਦਿਨ ਦੀ ਭਵਿੱਖਬਾਣੀ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold capitalize">{t({ en: "Weather for", ml: "ഇവിടെ കാലാവസ്ഥ", hi: "के लिए मौसम", ta: "க்கான வானிலை", te: "కోసం వాతావరణం", kn: "ಗಾಗಿ ಹವಾಮಾನ", bn: "জন্য আবহাওয়া", mr: "साठी हवामान", gu: "માટે હવામાન", pa: "ਲਈ ਮੌਸਮ" })} {locationName}</h2>
          <Button onClick={handleGetLocation} disabled={gettingLocation}>
            {gettingLocation ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LocateFixed className="mr-2 h-4 w-4" />
            )}
            {gettingLocation ? t({ en: "Getting location...", ml: "ലൊക്കേഷൻ ලබා...", hi: "स्थान मिल रहा है...", ta: "இருப்பிடத்தைப் பெறு...", te: "స్థానం పొందుతోంది...", kn: "ಸ್ಥಳವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...", bn: "অবস্থান পাওয়া যাচ্ছে...", mr: "स्थान मिळत आहे...", gu: "સ્થાન મળી રહ્યું છે...", pa: "ਸਥਾਨ ਪ੍ਰਾਪਤ ਹੋ रहा है..." }) : t({ en: "Use My Location", ml: "എന്റെ ലൊക്കേഷൻ ഉപയോഗിക്കുക", hi: "मेरा स्थान उपयोग करें", ta: "எனது இருப்பிடத்தைப் பயன்படுத்து", te: "నా స్థానాన్ని ఉపయోగించు", kn: "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ", bn: "আমার অবস্থান ব্যবহার করুন", mr: "माझे स्थान वापरा", gu: "મારું स्थान વાપરો", pa: "ਮੇਰਾ ਸਥਾਨ ਵਰਤੋਂ" })}
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
          <p>{t({ en: "Could not load weather data.", ml: "കാലാവസ്ഥാ ഡാറ്റ ലഭ്യമാക്കാൻ കഴിഞ്ഞില്ല.", hi: "मौसम डेटा लोड नहीं किया जा सका।", ta: "வானிலை தரவை ஏற்ற முடியவில்லை.", te: "వాతావరణ డేటాను లోడ్ చేయలేకపోయింది.", kn: "ಹವಾಮಾನ ಡೇಟಾವನ್ನು లోడ్ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.", bn: "আবহাওয়ার డేটা লোಡ್ করা যায়নি।", mr: "हवाમાન डेटा लोड करू शकला नाही.", gu: "હવામાન ડેટા લોડ કરી શકાયો નથી.", pa: "ਮੌਸਮ ਡਾਟਾ ਲੋడ్ नहीं ਕੀਤਾ ਜਾ ਸਕਿਆ।" })}</p>
        )}
      </main>
    </>
  );
}

    