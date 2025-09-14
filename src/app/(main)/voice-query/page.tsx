"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { speechToText } from "@/ai/flows/speech-to-text";
import { getCropAdvice, CropAdviceOutput } from "@/ai/flows/ai-crop-advice";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { Loader2, Mic, Square, Bot, Volume2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage, languageNameMap } from "@/contexts/language-context";
import { Textarea } from "@/components/ui/textarea";

export default function VoiceQueryPage() {
  const [recording, setRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [advice, setAdvice] = useState<CropAdviceOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [gettingAdvice, setGettingAdvice] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [isReading, setIsReading] = useState(false);

  const handleReadAloud = async (text: string) => {
    if (isReading) return;
    setIsReading(true);
    try {
      const result = await textToSpeech({ text });
      const audio = new Audio(result.audio);
      audio.play();
      audio.onended = () => {
        setIsReading(false);
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = handleStop;
      mediaRecorderRef.current.start();
      setRecording(true);
      setTranscribedText("");
      setAdvice(null);
      setAudioUrl(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        variant: "destructive",
        title: t({ en: "Microphone Error", ml: "മൈക്രോഫോൺ പിശക്", hi: "माइक्रोफ़ोन त्रुटि" }),
        description: t({ en: "Could not access microphone. Please check permissions.", ml: "മൈക്രോഫോൺ ആക്സസ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി അനുമതികൾ പരിശോധിക്കുക.", hi: "माइक्रोफ़ोन तक नहीं पहुंच सका। कृपया अनुमतियों की जांच करें।" }),
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleStop = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result as string;
      await transcribeAudio(base64Audio);
    };

    audioChunksRef.current = [];
  };

  const transcribeAudio = async (audio: string) => {
    setLoading(true);
    try {
      const result = await speechToText({ audio });
      setTranscribedText(result.text);
    } catch (error) {
      console.error("Error with speech-to-text:", error);
      toast({
        variant: "destructive",
        title: t({ en: "Transcription Error", ml: "ട്രാൻസ്ക്രിപ്ഷൻ പിശക്", hi: "प्रतिलेखन त्रुटि" }),
        description: t({ en: "Failed to transcribe your voice. Please try again.", ml: "നിങ്ങളുടെ ശബ്ദം പകർത്തുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.", hi: "आपकी आवाज़ का प्रतिलेखन करने में विफल। कृपया पुन: प्रयास करें।" }),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetAdvice = async () => {
    if (!transcribedText.trim()) {
      toast({
        variant: "destructive",
        title: t({ en: "No text to analyze", ml: "വിശകലനം ചെയ്യാൻ ടെക്സ്റ്റ് ഇല്ല", hi: "विश्लेषण के लिए कोई पाठ नहीं" }),
        description: t({ en: "Please record your question first.", ml: "ദയവായി ആദ്യം നിങ്ങളുടെ ചോദ്യം റെക്കോർഡ് ചെയ്യുക.", hi: "कृपया पहले अपना प्रश्न रिकॉर्ड करें।" }),
      });
      return;
    }
    setGettingAdvice(true);
    setAdvice(null);
    try {
      const result = await getCropAdvice({ question: transcribedText, language });
      setAdvice(result);
    } catch (error) {
      console.error("Error getting crop advice:", error);
      toast({
        variant: "destructive",
        title: t({ en: "AI Error", ml: "AI പിശക്", hi: "एआई त्रुटि" }),
        description: t({ en: "Failed to get advice from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് ഉപദേശം ലഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.", hi: "एआई से सलाह लेने में विफल। कृपया बाद में पुन: प्रयास करें।" }),
      });
    } finally {
      setGettingAdvice(false);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleGetAdvice();
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न" })}
        description={t({ en: "Ask farming questions in your local language.", ml: "നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ കാർഷിക ചോദ്യങ്ങൾ ചോദിക്കുക.", hi: "अपनी स्थानीय भाषा में खेती के प्रश्न पूछें।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t({ en: "Step 1: Speak Your Question", ml: "ഘട്ടം 1: നിങ്ങളുടെ ചോദ്യം സംസാരിക്കുക", hi: "चरण 1: अपना प्रश्न बोलें" })}</CardTitle>
                <CardDescription>
                  {t({ en: "Press the button to start recording. Ask your question clearly.", ml: "റെക്കോർഡിംഗ് ആരംഭിക്കാൻ ബട്ടൺ അമർത്തുക. നിങ്ങളുടെ ചോദ്യം വ്യക്തമായി ചോദിക്കുക.", hi: "रिकॉर्डिंग शुरू करने के लिए बटन दबाएं। अपना प्रश्न स्पष्ट रूप से पूछें।" })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-6">
                <Button
                  onClick={recording ? stopRecording : startRecording}
                  size="lg"
                  variant={recording ? "destructive" : "default"}
                  className="w-40 h-16 text-lg"
                  disabled={loading}
                >
                  {recording ? (
                    <>
                      <Square className="mr-2 h-6 w-6" /> {t({ en: "Stop", ml: "നിർത്തുക", hi: "रोकें" })}
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-6 w-6" /> {t({ en: "Record", ml: "റെക്കോർഡ്", hi: "रिकॉर्ड" })}
                    </>
                  )}
                </Button>
                {recording && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mic className="h-5 w-5 text-red-500 animate-pulse" />
                    <span>{t({ en: "Recording...", ml: "റെക്കോർഡിംഗ്...", hi: "रिकॉर्डिंग..." })}</span>
                  </div>
                )}
                 {audioUrl && !loading && (
                      <div className="w-full">
                          <p className="text-sm font-medium mb-2">{t({ en: "Your recording:", ml: "നിങ്ങളുടെ റെക്കോർഡിംഗ്:", hi: "आपकी रिकॉर्डिंग:" })}</p>
                          <audio src={audioUrl} controls className="w-full" />
                      </div>
                  )}
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                  <CardTitle>{t({ en: "Step 2: Get Advice", ml: "ഘട്ടം 2: ഉപദേശം നേടുക", hi: "चरण 2: सलाह लें" })}</CardTitle>
                  <CardDescription>
                   {t({ en: "Review the transcribed text and click the button for AI advice.", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്ത വാചകം അവലോകനം ചെയ്ത് AI ഉപദേശത്തിനായി ബട്ടൺ ക്ലിക്കുചെയ്യുക.", hi: "प्रतिलेखित पाठ की समीक्षा करें और AI सलाह के लिए बटन पर क्लिक करें।" })}
                  </CardDescription>
              </CardHeader>
               <CardContent>
                  <Textarea
                    placeholder={t({ en: "Transcribed text will appear here...", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്ത വാചകം ഇവിടെ ദൃശ്യമാകും...", hi: "प्रतिलेखित पाठ यहां दिखाई देगा..." })}
                    className="min-h-[100px] mb-4"
                    value={loading ? t({ en: "Transcribing...", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്യുന്നു...", hi: "प्रतिलेखन..." }) : transcribedText}
                    readOnly={loading || gettingAdvice}
                    onChange={(e) => setTranscribedText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
               </CardContent>
               <CardFooter>
                  <Button onClick={handleGetAdvice} disabled={!transcribedText || loading || gettingAdvice}>
                      {gettingAdvice && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {gettingAdvice ? t({ en: "Getting Advice...", ml: "ഉപദേശം നേടുന്നു...", hi: "सलाह मिल रही है..." }) : t({ en: "Get AI Advice", ml: "AI ഉപദേശം നേടുക", hi: "AI सलाह प्राप्त करें" })}
                  </Button>
               </CardFooter>
             </Card>
          </div>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-primary" /> {t({ en: "AI Recommendation", ml: "AI ശുപാർശ", hi: "एआई सिफारिश" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "The advice from our AI expert will appear here.", ml: "ഞങ്ങളുടെ AI വിദഗ്ദ്ധന്റെ ഉപദേശം ഇവിടെ ദൃശ്യമാകും.", hi: "हमारे AI विशेषज्ञ की सलाह यहां दिखाई देगी।" })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {gettingAdvice && (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                   <Skeleton className="h-4 w-full" />
                </div>
              )}
              {advice && (
                <div className="grid gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">In English:</h3>
                        <Button variant="ghost" size="icon" onClick={() => handleReadAloud(advice.englishAdvice)} disabled={isReading}>
                            {isReading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                      {advice.englishAdvice}
                    </div>
                  </div>
                   {language !== 'en' && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">In {languageNameMap[language]}:</h3>
                        <Button variant="ghost" size="icon" onClick={() => handleReadAloud(advice.translatedAdvice)} disabled={isReading}>
                            {isReading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                        {advice.translatedAdvice}
                      </div>
                    </div>
                   )}
                </div>
              )}
              {!gettingAdvice && !advice && (
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

    