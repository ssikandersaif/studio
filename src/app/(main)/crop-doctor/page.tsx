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
import { Lightbulb, Loader2, Volume2 } from "lucide-react";
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
        title: t({ en: "All fields are required", ml: "എല്ലാ ഫീൽഡുകളും ആവശ്യമാണ്", hi: "सभी फ़ील्ड आवश्यक हैं" }),
        description: t({ en: "Please describe your problem and provide your location and crop type.", ml: "നിങ്ങളുടെ പ്രശ്നം വിവരിച്ച് നിങ്ങളുടെ സ്ഥലവും വിളയുടെ തരവും നൽകുക.", hi: "कृपया अपनी समस्या का वर्णन करें और अपना स्थान और फसल का प्रकार प्रदान करें।" }),
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
        title: t({ en: "AI Error", ml: "AI പിശക്", hi: "एआई त्रुटि" }),
        description: t({ en: "Failed to get advice from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് ഉപദേശം ലഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.", hi: "एआई से सलाह लेने में विफल। कृपया बाद में पुन: प्रयास करें।" }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर" })}
        description={t({ en: "Get AI-driven advice for your farming problems.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നങ്ങൾക്ക് AI-യുടെ സഹായത്തോടെ ഉപദേശം നേടുക.", hi: "अपनी खेती की समस्याओं के लिए AI-संचालित सलाह प्राप्त करें।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>{t({ en: "Ask a Question", ml: "ചോദ്യം ചോദിക്കുക", hi: "प्रश्न पूछें" })}</CardTitle>
                <CardDescription>
                  {t({ en: "Describe your farming problem, and our AI expert will provide a solution.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നം വിവരിക്കുക, ഞങ്ങളുടെ AI വിദഗ്ദ്ധൻ ഒരു പരിഹാരം നൽകും.", hi: "अपनी खेती की समस्या का वर्णन करें, और हमारा AI विशेषज्ञ समाधान प्रदान करेगा।" })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">{t({ en: "Your Location", ml: "നിങ്ങളുടെ സ്ഥലം", hi: "आपका स्थान" })}</Label>
                        <Input 
                            id="location"
                            placeholder={t({ en: "e.g., Thrissur, Kerala", ml: "ഉദാ., തൃശ്ശൂർ, കേരളം", hi: "उदा., त्रिशूर, केरल" })}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="crop">{t({ en: "Crop Type", ml: "വിളയുടെ തരം", hi: "फ़सल का प्रकार" })}</Label>
                        <Input 
                            id="crop"
                            placeholder={t({ en: "e.g., Tomato", ml: "ഉദാ., തക്കാളി", hi: "उदा., टमाटर" })}
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                 </div>

                <div className="space-y-2">
                  <Label htmlFor="question">{t({ en: "Your Question", ml: "നിങ്ങളുടെ ചോദ്യം", hi: "आपका प्रश्न" })}</Label>
                  <Textarea
                    id="question"
                    placeholder={t(
                      {
                        en: "e.g., 'My tomato plants have yellow leaves with brown spots. What should I do?'", 
                        ml: "ഉദാ: 'എന്റെ തക്കാളി ചെടികൾക്ക് മഞ്ഞ ഇലകളും തവിട്ടുനിറത്തിലുള്ള പാടുകളും ഉണ്ട്. ഞാൻ എന്തുചെയ്യണം?'",
                        hi: "उदा., 'मेरे टमाटर के पौधों में भूरे धब्बों के साथ पीली पत्तियां हैं। मुझे क्या करना चाहिए?'"
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
                  {loading ? t({ en: "Getting Advice...", ml: "ഉപദേശം നേടുന്നു...", hi: "सलाह मिल रही है..." }) : t({ en: "Get AI Advice", ml: "AI ഉപദേശം നേടുക", hi: "AI सलाह प्राप्त करें" })}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                {t({ en: "AI Recommendation", ml: "AI ശുപാർശ", hi: "एआई सिफारिश" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "The AI's advice will appear here.", ml: "AI-യുടെ ഉപദേശം ഇവിടെ ദൃശ്യമാകും.", hi: "एआई की सलाह यहां दिखाई देगी।" })}
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
                    <p>{t({ en: "Your expert advice will be generated here.", ml: "നിങ്ങളുടെ വിദഗ്ദ്ധ ഉപദേശം ഇവിടെ ജനറേറ്റ് ചെയ്യും.", hi: "आपकी विशेषज्ञ सलाह यहां उत्पन्न होगी।" })}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
