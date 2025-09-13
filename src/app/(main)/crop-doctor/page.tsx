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
import { Lightbulb, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage, languageNameMap } from "@/contexts/language-context";

export default function CropDoctorPage() {
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState<{ english: string; translated: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: t({ en: "Question is empty", ml: "ചോദ്യം ശൂന്യമാണ്", hi: "प्रश्न खाली है", ta: "கேள்வி காலியாக உள்ளது", te: "ప్రశ్న ఖాళీగా ఉంది", kn: "ಪ್ರಶ್ನೆ ಖಾಲಿಯಾಗಿದೆ", bn: "প্রশ্ন খালি", mr: "प्रश्न रिकामा आहे", gu: "પ્રશ્ન ખાલી છે", pa: "ਸਵਾਲ ਖਾਲੀ ਹੈ" }),
        description: t({ en: "Please enter a question about your farming problem.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നത്തെക്കുറിച്ച് ഒരു ചോദ്യം നൽകുക.", hi: "कृपया अपनी खेती की समस्या के बारे में एक प्रश्न दर्ज करें।", ta: "உங்கள் விவசாய பிரச்சனை குறித்த கேள்வியை உள்ளிடவும்.", te: "దయచేసి మీ వ్యవసాయ సమస్య గురించి ఒక ప్రశ్నను నమోదు చేయండి.", kn: "దయವಿಟ್ಟು ನಿಮ್ಮ ಕೃಷಿ ಸಮಸ್ಯೆಯ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ.", bn: "আপনার কৃষি সমস্যা সম্পর্কে একটি প্রশ্ন লিখুন।", mr: "कृपया तुमच्या शेतीच्या समस्येबद्दल प्रश्न विचारा.", gu: "કૃપા કરીને તમારી ખેતીની સમસ્યા વિશે một પ્રશ્ન દાખલ કરો.", pa: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਖੇਤੀ ਸਮੱਸਿਆ ਬਾਰੇ ਇੱਕ ਸਵਾਲ ਦਰਜ ਕਰੋ।" }),
      });
      return;
    }
    setLoading(true);
    setAdvice(null);
    try {
      const result = await getCropAdvice({ question, language });
      setAdvice({
        english: result.englishAdvice,
        translated: result.translatedAdvice
      });
    } catch (error) {
      console.error("Error getting crop advice:", error);
      toast({
        variant: "destructive",
        title: t({ en: "AI Error", ml: "AI പിശക്", hi: "एआई त्रुटि", ta: "AI பிழை", te: "AI లోపం", kn: "AI ದೋಷ", bn: "এআই ত্রুটি", mr: "एआय त्रुटी", gu: "AI ભૂલ", pa: "AI ਗਲਤੀ" }),
        description: t({ en: "Failed to get advice from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് ഉപദേശം ലഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.", hi: "एआई से सलाह लेने में विफल। कृपया बाद में पुन: प्रयास करें।", ta: "AI இடமிருந்து அறிவுரை பெற முடியவில்லை. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.", te: "AI నుండి సలహా పొందడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.", kn: "AI ನಿಂದ ಸಲಹೆ ಪಡೆಯಲು ವಿಫലವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ 다시 ಪ್ರಯತ್ನಿಸಿ.", bn: "এআই থেকে পরামর্শ পেতে ব্যর্থ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।", mr: "एआय कडून सल्ला मिळविण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.", gu: "AI પાસેથી સલાહ મેળવવામાં નિષ્ફળ. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.", pa: "AI ਤੋਂ ਸਲਾહ ਲੈਣ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर", ta: "பயிர் மருத்துவர்", te: "పంట மருத்துவர்", kn: "ಬೆಳೆ ವೈದ್ಯ", bn: "ফসল ডাক্তার", mr: "पीक डॉक्टर", gu: "પાક ડોક્ટર", pa: "ਫਸਲ ਡਾਕਟਰ" })}
        description={t({ en: "Get AI-driven advice for your farming problems.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നങ്ങൾക്ക് AI-യുടെ സഹായത്തോടെ ഉപദേശം നേടുക.", hi: "अपनी खेती की समस्याओं के लिए AI-संचालित सलाह प्राप्त करें।", ta: "உங்கள் விவசாய பிரச்சனைகளுக்கு AI-চালిత ஆலோசனைகளைப் பெறுங்கள்.", te: "మీ వ్యవసాయ సమస్యలకు AI-ఆధారిత సలహాలను పొందండి.", kn: "ನಿಮ್ಮ ಕೃಷಿ ಸಮಸ್ಯೆಗಳಿಗೆ AI-ಚಾಲಿತ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.", bn: "আপনার কৃষি সমস্যার জন্য AI-চালিত পরামর্শ পান।", mr: "तुमच्या शेतीच्या समस्यांसाठी AI-आधारित सल्ला मिळवा.", gu: "તમારી ખેતીની સમસ્યાઓ માટે AI-આધારિત સલાહ મેળવો.", pa: "ਆਪਣੀਆਂ ਖੇਤੀ ਸਮੱਸਿਆਵਾਂ ਲਈ AI-ਸੰਚਾਲਿਤ ਸਲਾਹ ਲਓ।" })}
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
              <CardContent>
                <Textarea
                  placeholder={t(
                    {
                      en: "e.g., 'My tomato plants have yellow leaves with brown spots. What should I do?'", 
                      ml: "ഉദാ: 'എന്റെ തക്കാളി ചെടികൾക്ക് മഞ്ഞ ഇലകളും തവിട്ടുനിറത്തിലുള്ള പാടുകളും ഉണ്ട്. ഞാൻ എന്തുചെയ്യണം?'",
                      hi: "उदा., 'मेरे टमाटर के पौधों में भूरे धब्बों के साथ पीली पत्तियां हैं। मुझे क्या करना चाहिए?'",
                      ta: "உദാ., 'என் தக்காளி செடிகளில் பழுப்பு நிற புள்ளிகளுடன் மஞ்சள் இலைகள் உள்ளன. நான் என்ன செய்ய வேண்டும்?'",
                      te: "ఉదా., 'నా టమోటా మొక్కలకు గోధుమ రంగు మచ్చలతో పసుపు ఆకులు ఉన్నాయి. నేను ఏమి చేయాలి?'",
                      kn: "ಉದಾ., 'ನನ್ನ ಟೊಮೆಟೊ ಗಿಡಗಳಲ್ಲಿ ಕಂದು ಚುಕ್ಕೆಗಳೊಂದಿಗೆ ಹಳದಿ ಎಲೆಗಳಿವೆ. ನಾನು ಏನು ಮಾಡಬೇಕು?'",
                      bn: "उदा., 'আমার টমেটো গাছে বাদামী দাগ সহ হলুদ পাতা রয়েছে। আমার কী করা উচিত?'",
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
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? t({ en: "Getting Advice...", ml: "ഉപദേശം നേടുന്നു...", hi: "सलाह मिल रही है...", ta: "ஆலோசனை பெறப்படுகிறது...", te: "సలహా పొందుతోంది...", kn: "ಸಲಹೆ ಪಡೆಯಲಾಗುತ್ತಿದೆ...", bn: "পରାమర్శ পাওয়া হচ্ছে...", mr: "सल्ला मिळत आहे...", gu: "સલાહ મળી રહી છે...", pa: "ਸਲਾਹ ਮਿਲ ਰਹੀ ਹੈ..." }) : t({ en: "Get AI Advice", ml: "AI ഉപദേശം നേടുക", hi: "AI सलाह प्राप्त करें", ta: "AI ஆலோசனை ಪಡೆಯுங்கள்", te: "AI సలహా పొందండి", kn: "AI ಸಲಹೆ ಪಡೆಯಿರಿ", bn: "এআই পরামর্শ পান", mr: "एआय सल्ला मिळवा", gu: "AI સલાહ મેળવો", pa: "AI ਸਲਾਹ ਲਓ" })}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                {t({ en: "AI Recommendation", ml: "AI ശുപാർശ", hi: "एआई सिफारिश", ta: "AI பரிந்துரை", te: "AI సిఫార్సు", kn: "AI ಶಿಫಾರಸು", bn: "এഐ সুপারিশ", mr: "एआय शिफारस", gu: "AI ભલામણ", pa: "AI ਸਿਫਾਰਸ਼" })}
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
                    <h3 className="font-semibold mb-2">In English:</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                      {advice.english}
                    </div>
                  </div>
                   {language !== 'en' && (
                    <div>
                      <h3 className="font-semibold mb-2">In {languageNameMap[language]}:</h3>
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
