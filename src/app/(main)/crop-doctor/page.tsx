"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getCropAdvice } from "@/ai/flows/ai-crop-advice";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { Lightbulb, Loader2, Volume2, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage, languageNameMap } from "@/contexts/language-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CropDoctorPage() {
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("");
  const [advice, setAdvice] = useState<{ english: string; translated: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);

  const handleReadAloud = async (text: string) => {
    if (isReading) return;
    setIsReading(true);
    try {
      const result = await textToSpeech({ text });
      setAudioUrl(result.audio);
      const audio = new Audio(result.audio);
      audio.play();
      audio.onended = () => {
        setIsReading(false);
        setAudioUrl(null);
      };
    } catch (error) {
      console.error("Error with text-to-speech:", error);
      toast({
        variant: "destructive",
        title: t({ en: "Audio Error", ml: "ഓഡിയോ പിശക്", hi: "ऑडियो त्रुटि" }),
        description: t({ en: "Failed to generate audio. Please try again.", ml: "ഓഡിയോ ജനറേറ്റ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.", hi: "ऑडियो उत्पन्न करने में विफल। कृपया पुन: प्रयास करें।" }),
      });
      setIsReading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !location.trim() || !crop.trim()) {
      toast({
        variant: "destructive",
        title: t({ en: "All fields are required", ml: "എല്ലാ ഫീൽഡുകളും ആവശ്യമാണ്", hi: "सभी फ़ील्ड आवश्यक हैं", ta: "அனைத்து புலங்களும் தேவை", te: "అన్ని ఫీల్డ్‌లు అవసరం", kn: "ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳು ಅಗತ್ಯವಿದೆ", bn: "সমস্ত ক্ষেত্র প্রয়োজন", mr: "सर्व फील्ड आवश्यक आहेत", gu: "બધા ફીલ્ડ્સ જરૂરી છે", pa: "ਸਾਰੇ ਖੇਤਰ ਲੋੜੀਂਦੇ ਹਨ" }),
        description: t({ en: "Please describe your problem and provide your location and crop type.", ml: "നിങ്ങളുടെ പ്രശ്നം വിവരിച്ച് നിങ്ങളുടെ സ്ഥലവും വിളയുടെ തരവും നൽകുക.", hi: "कृपया अपनी समस्या का वर्णन करें और अपना स्थान और फसल का प्रकार प्रदान करें।", ta: "உங்கள் சிக்கலை விவரிக்கவும் மற்றும் உங்கள் இருப்பிடம் மற்றும் பயிர் வகையை வழங்கவும்.", te: "దయచేసి మీ సమస్యను వివరించండి మరియు మీ స్థానం మరియు పంట రకాన్ని అందించండి.", kn: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಬೆಳೆ ಪ್ರಕಾರವನ್ನು ಒದಗಿಸಿ.", bn: "অনুগ্রহ করে আপনার সমস্যার বর্ণনা দিন এবং আপনার অবস্থান ও ফসলের ধরন উল্লেখ করুন।", mr: "कृपया तुमची समस्या सांगा आणि तुमचे स्थान व पिकाचा प्रकार सांगा.", gu: "કૃપા કરીને તમારી સમસ્યાનું વર્ણન કરો અને તમારું સ્થાન અને પાકનો પ્રકાર પ્રદાન કરો.", pa: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਸਮੱਸਿਆ ਦਾ ਵਰਣਨ ਕਰੋ ਅਤੇ ਆਪਣਾ ਸਥਾਨ ਅਤੇ ਫਸਲ ਦੀ ਕਿਸਮ ਪ੍ਰਦਾਨ ਕਰੋ।" }),
      });
      return;
    }
    setLoading(true);
    setAdvice(null);
    try {
      const result = await getCropAdvice({ question, location, crop, language });
      setAdvice({
        english: result.englishAdvice,
        translated: result.translatedAdvice
      });
    } catch (error) {
      console.error("Error getting crop advice:", error);
      toast({
        variant: "destructive",
        title: t({ en: "AI Error", ml: "AI പിശക്", hi: "एआई त्रुटि", ta: "AI பிழை", te: "AI లోపం", kn: "AI ದೋಷ", bn: "এআই ত্রুটি", mr: "एआय त्रुटी", gu: "AI ભૂલ", pa: "AI ਗਲਤੀ" }),
        description: t({ en: "Failed to get advice from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് ഉപദേശം ലഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.", hi: "एआई से सलाह लेने में विफल। कृपया बाद में पुन: प्रयास करें।", ta: "AI இடமிருந்து அறிவுரை பெற முடியவில்லை. தയచేసి తరువాత మళ్లీ ప్రయత్నించండి.", te: "AI నుండి సలహా పొందడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.", kn: "AI ನಿಂದ ಸಲಹೆ ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ 다시 ಪ್ರಯತ್ನಿಸಿ.", bn: "এআই থেকে পরামর্শ পেতে ব্যর্থ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।", mr: "एआय कडून सल्ला मिळविण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.", gu: "AI પાસેથી સલાહ મેળવવામાં નિષ્ફળ. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.", pa: "AI ਤੋਂ ਸਲਾਹ ਲੈਣ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर", ta: "பயிர் மருத்துவர்", te: "పంట డాక్టర్", kn: "ಬೆಳೆ ವೈದ್ಯ", bn: "ফসল ডাক্তার", mr: "पीक डॉक्टर", gu: "પાક ડોક્ટર", pa: "ਫਸਲ ਡਾਕਟਰ" })}
        description={t({ en: "Get AI-driven advice for your farming problems.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നങ്ങൾക്ക് AI-യുടെ സഹായത്തോടെ ഉപദേശം നേടുക.", hi: "अपनी खेती की समस्याओं के लिए AI-संचालित सलाह प्राप्त करें।", ta: "உங்கள் விவசாய பிரச்சனைகளுக்கு AI-இயக்க ஆலோசனைகளைப் பெறுங்கள்.", te: "మీ వ్యవసాయ సమస్యలకు AI-ఆధారిత సలహాలను పొందండి.", kn: "ನಿಮ್ಮ ಕೃಷಿ ಸಮಸ್ಯೆಗಳಿಗೆ AI-ಚಾಲಿತ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.", bn: "আপনার কৃষি সমস্যার জন্য AI-চালিত পরামর্শ পান।", mr: "तुमच्या शेतीच्या समस्यांसाठी AI-आधारित सल्ला मिळवा.", gu: "તમારી ખેતીની સમસ્યાઓ માટે AI-આધારિત સલાહ મેળવો.", pa: "ਆਪਣੀਆਂ ਖੇਤੀ ਸਮੱਸਿਆਵਾਂ ਲਈ AI-ਸੰਚਾਲਿਤ ਸਲਾਹ ਲਓ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>{t({ en: "Ask a Question", ml: "ചോദ്യം ചോദിക്കുക", hi: "प्रश्न पूछें", ta: "கேள்வி கேளுங்கள்", te: "ప్రశ్న అడగండి", kn: "ಪ್ರಶ್ನೆ ಕೇಳಿ", bn: "প্রশ্ন জিজ্ঞাসা করুন", mr: "प्रश्न विचारा", gu: "પ્રશ્ન પૂછો", pa: "ਸਵਾਲ ਪੁੱਛੋ" })}</CardTitle>
                <CardDescription>
                  {t({ en: "Describe your farming problem, and our AI expert will provide a solution.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നം വിവരിക്കുക, ഞങ്ങളുടെ AI വിദഗ്ദ്ധൻ ഒരു പരിഹാരം നൽകും.", hi: "अपनी खेती की समस्या का वर्णन करें, और हमारा AI विशेषज्ञ समाधान प्रदान करेगा।", ta: "உங்கள் விவசாயப் பிரச்சினையை விவரிக்கவும், எங்கள் AI நிபுணர் ஒரு தீர்வைக் கொடுப்பார்.", te: "మీ వ్యవసాయ సమస్యను వివరించండి మరియు మా AI నిపుణుడు ఒక పరిష్కారం అందిస్తుంది.", kn: "ನಿಮ್ಮ ಕೃಷಿ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ, ಮತ್ತು ನಮ್ಮ AI નિపుણుడు ಪರಿಹಾರವನ್ನು ಒದಗಿಸುತ್ತಾನೆ.", bn: "আপনার কৃষি সমস্যা বর্ণনা করুন, এবং আমাদের AI বিশেষজ্ঞ একটি সমাধান প্রদান করবে।", mr: "तुमची शेतीची समस्या सांगा आणि आमचे AI तज्ञ त्यावर उपाय देतील.", gu: "તમારી ખેતીની સમસ્યાનું વર્ણન કરો, અને અમારા AI નિષ્ણાત সমাধান આપશે.", pa: "ਆਪਣੀ ਖੇਤੀ ਦੀ ਸਮੱਸਿਆ ਬਾਰੇ ਦੱਸੋ, ਅਤੇ ਸਾਡਾ AI ਮਾਹਰ ਹੱਲ ਪ੍ਰਦਾਨ ਕਰੇਗਾ।" })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">{t({ en: "Your Location", ml: "നിങ്ങളുടെ സ്ഥലം", hi: "आपका स्थान", ta: "உங்கள் இடம்", te: "మీ ప్రదేశం", kn: "ನಿಮ್ಮ ಸ್ಥಳ", bn: "আপনার অবস্থান", mr: "तुमचे स्थान", gu: "તમારું સ્થાન", pa: "ਤੁਹਾਡਾ ਟਿਕਾਣਾ" })}</Label>
                        <Input 
                            id="location"
                            placeholder={t({ en: "e.g., Thrissur, Kerala", ml: "ഉദാ., തൃശ്ശൂർ, കേരളം", hi: "उदा., त्रिशूर, केरल", ta: "உதா., திருச்சூர், கேரளா", te: "ఉదా., త్రిస్సూర్, కేరళ", kn: "ಉದಾ., ತ್ರಿಶೂರ್, ಕೇರಳ", bn: "উদাঃ, ত্রিশূর, কেরালা", mr: "उदा., त्रिशूर, केरळ", gu: "ઉદા., ત્રિશૂર, કેરળ", pa: "ਉਦਾ., ਤ੍ਰਿਸ਼ੂਰ, ਕੇਰਲ" })}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="crop">{t({ en: "Crop Type", ml: "വിളയുടെ തരം", hi: "फ़सल का प्रकार", ta: "பயிர் வகை", te: "పంట రకం", kn: "ಬೆಳೆ ಪ್ರಕಾರ", bn: "ফসলের প্রকার", mr: "पिकाचा प्रकार", gu: "પાકનો પ્રકાર", pa: "ਫਸਲ ਦੀ ਕਿਸਮ" })}</Label>
                        <Input 
                            id="crop"
                            placeholder={t({ en: "e.g., Tomato", ml: "ഉദാ., തക്കാളി", hi: "उदा., टमाटर", ta: "உதா., தக்காளி", te: "ఉదా., టమోటా", kn: "ಉದಾ., ಟೊಮೇಟೊ", bn: "উদাঃ, টমেটো", mr: "उदा., टोमॅटो", gu: "ઉદા., ટમેટા", pa: "ਉਦਾ., ਟਮਾਟਰ" })}
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                 </div>

                <div className="space-y-2">
                  <Label htmlFor="question">{t({ en: "Your Question", ml: "നിങ്ങളുടെ ചോദ്യം", hi: "आपका प्रश्न", ta: "உங்கள் கேள்வி", te: "మీ ప్రశ్న", kn: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ", bn: "আপনার প্রশ্ন", mr: "तुमचा प्रश्न", gu: "તમારો પ્રશ્ન", pa: "ਤੁਹਾਡਾ ਸਵਾਲ" })}</Label>
                  <Textarea
                    id="question"
                    placeholder={t(
                      {
                        en: "e.g., 'My tomato plants have yellow leaves with brown spots. What should I do?'", 
                        ml: "ഉദാ: 'എന്റെ തക്കാളി ചെടികൾക്ക് മഞ്ഞ ഇലകളും തവിട്ടുനിറത്തിലുള്ള പാടുകളും ഉണ്ട്. ഞാൻ എന്തുചെയ്യണം?'",
                        hi: "उदा., 'मेरे टमाटर के पौधों में भूरे धब्बों के साथ पीली पत्तियां हैं। मुझे क्या करना चाहिए?'",
                        ta: "உதா., 'என் தக்காளி செடிகளில் பழுப்பு நிற புள்ளிகளுடன் மஞ்சள் இலைகள் உள்ளன. நான் என்ன செய்ய வேண்டும்?'",
                        te: "ఉదా., 'నా టమోటా మొక్కలకు గోధుమ రంగు మచ్చలతో పసుపు ఆకులు ఉన్నాయి. నేను ఏమి చేయాలి?'",
                        kn: "ಉದಾ., 'ನನ್ನ ಟೊಮೆಟೊ ಗಿಡಗಳಲ್ಲಿ ಕಂದು ಚುಕ್ಕೆಗಳೊಂದಿಗೆ ಹಳದಿ ಎಲೆಗಳಿವೆ. ನಾನು ಏನು ಮಾಡಬೇಕು?'",
                        bn: "উদাঃ, 'আমার টমেটো গাছে বাদামী দাগ সহ হলুদ পাতা রয়েছে। আমার কী করা উচিত?'",
                        mr: "उदा., 'माझ्या टोमॅटोच्या रोपांना तपकिरी डागांसह पिवळी पाने आहेत. मी काय करावे?'",
                        gu: "દા.ત., 'મારા ટામેટાના છોડમાં ભૂરા ફોલ્લીઓવાળા પીળા પાંદડા છે. મારે શું કરવું જોઈએ?'",
                        pa: "ਜਿਵੇਂ ਕਿ, 'ਮੇਰੇ ਟਮਾਟਰ ਦੇ ਪੌਦਿਆਂ 'ਤੇ ਭੂਰੇ ਧੱਬਿਆਂ ਨਾਲ ਪੀਲੇ ਪੱਤੇ ਹਨ। ਮੈਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?'"
                      }
                    )}
                    className="min-h-[150px]"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? t({ en: "Getting Advice...", ml: "ഉപദേശം നേടുന്നു...", hi: "सलाह मिल रही है...", ta: "ஆலோசனை பெறப்படுகிறது...", te: "సలహా పొందుతోంది...", kn: "ಸಲಹೆ ಪಡೆಯಲಾಗುತ್ತಿದೆ...", bn: "পরামর্শ পাওয়া হচ্ছে...", mr: "सल्ला मिळत आहे...", gu: "સલાહ મળી રહી છે...", pa: "ਸਲਾਹ ਮਿਲ ਰਹੀ ਹੈ..." }) : t({ en: "Get AI Advice", ml: "AI ഉപദേശം നേടുക", hi: "AI सलाह प्राप्त करें", ta: "AI ஆலோசனை ಪಡೆಯுங்கள்", te: "AI సలహా పొందండి", kn: "AI ಸಲಹೆ ಪಡೆಯಿರಿ", bn: "এআই পরামর্শ পান", mr: "एआय सल्ला मिळवा", gu: "AI સલાહ મેળવો", pa: "AI ਸਲਾਹ ਲਓ" })}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                {t({ en: "AI Recommendation", ml: "AI ശുപാർശ", hi: "एआई सिफारिश", ta: "AI பரிந்துரை", te: "AI సిఫార్సు", kn: "AI ಶಿಫಾರಸು", bn: "এআই সুপারিশ", mr: "एआय शिफारस", gu: "AI ભલામણ", pa: "AI ਸਿఫਾਰਸ਼" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "The AI's advice will appear here.", ml: "AI-യുടെ ഉപദേശം ഇവിടെ ദൃശ്യമാകും.", hi: "एआई की सलाह यहां दिखाई देगी।", ta: "AI இன் அறிவுரை இங்கே தோன்றும்.", te: "AI యొక్క సలహా ఇక్కడ కనిపిస్తుంది.", kn: "AI ಯ ಸಲಹೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.", bn: "এআই-এর পরামর্শ এখানে প্রদর্শিত হবে।", mr: "एआयचा सल्ला येथे दिसेल.", gu: "AI ની સલાહ અહીં દેખાશે.", pa: "AI ਦੀ ਸਲਾਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇਗੀ।" })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              {loading && (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-3/4" />
                </div>
              )}
              {advice && (
                <div className="grid gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">In English:</h3>
                      <Button variant="ghost" size="icon" onClick={() => handleReadAloud(advice.english)} disabled={isReading}>
                        {isReading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                      {advice.english}
                    </div>
                  </div>
                   {language !== 'en' && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">In {languageNameMap[language]}:</h3>
                        <Button variant="ghost" size="icon" onClick={() => handleReadAloud(advice.translated)} disabled={isReading}>
                            {isReading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                        {advice.translated}
                      </div>
                    </div>
                   )}
                </div>
              )}
              {!loading && !advice && (
                <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                    <p>{t({ en: "Your expert advice will be generated here.", ml: "നിങ്ങളുടെ വിദഗ്ദ്ധ ഉപദേശം ഇവിടെ ജനറേറ്റ് ചെയ്യും.", hi: "आपकी विशेषज्ञ सलाह यहां उत्पन्न होगी।", ta: "உங்கள் நிபுணர் அறிவுரை இங்கே உருவாக்கப்படும்.", te: "మీ నిపుణుల సలహా ఇక్కడ உருவாக்கబడుతుంది.", kn: "ನಿಮ್ಮ ತಜ್ಞರ ಸಲಹೆ અહીં üretilir.", bn: "আপনার বিশেষজ্ঞের পরামর্শ এখানে তৈরি হবে।", mr: "तुमचा तज्ञांचा सल्ला येथे तयार केला जाईल.", gu: "તમારી નિષ્ણાત સલાહ અહીં જનરેટ થશે.", pa: "ਤੁਹਾਡੀ ਮਾਹਰ ਸਲਾਹ ਇੱਥੇ ਤਿਆਰ ਕੀਤੀ ਜਾਵੇਗੀ।" })}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
