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
import { Loader2, Mic, Square, Bot, Lightbulb } from "lucide-react";
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
        title: t({ en: "Microphone Error", ml: "മൈക്രോഫോൺ പിശക്" }),
        description: t({ en: "Could not access microphone. Please check permissions.", ml: "മൈക്രോഫോൺ ആക്സസ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി അനുമതികൾ പരിശോധിക്കുക." }),
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
        title: t({ en: "Transcription Error", ml: "ട്രാൻസ്ക്രിപ്ഷൻ പിശക്" }),
        description: t({ en: "Failed to transcribe your voice. Please try again.", ml: "നിങ്ങളുടെ ശബ്ദം പകർത്തുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക." }),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetAdvice = async () => {
    if (!transcribedText.trim()) {
      toast({
        variant: "destructive",
        title: t({ en: "No text to analyze", ml: "വിശകലനം ചെയ്യാൻ ടെക്സ്റ്റ് ഇല്ല" }),
        description: t({ en: "Please record your question first.", ml: "ദയവായി ആദ്യം നിങ്ങളുടെ ചോദ്യം റെക്കോർഡ് ചെയ്യുക." }),
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
        title: t({ en: "AI Error", ml: "AI പിശക്" }),
        description: t({ en: "Failed to get advice from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് ഉപദേശം നേടുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക." }),
      });
    } finally {
      setGettingAdvice(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Voice Query", ml: "ശബ്ദ ചോദ്യം" })}
        description={t({ en: "Ask farming questions in your local language.", ml: "നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ കാർഷിക ചോദ്യങ്ങൾ ചോദിക്കുക." })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t({ en: "Step 1: Speak Your Question", ml: "ഘട്ടം 1: നിങ്ങളുടെ ചോദ്യം സംസാരിക്കുക" })}</CardTitle>
                <CardDescription>
                  {t({ en: "Press the button to start recording. Ask your question clearly.", ml: "റെക്കോർഡിംഗ് ആരംഭിക്കാൻ ബട്ടൺ അമർത്തുക. നിങ്ങളുടെ ചോദ്യം വ്യക്തമായി ചോദിക്കുക." })}
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
                      <Square className="mr-2 h-6 w-6" /> {t({ en: "Stop", ml: "നിർത്തുക" })}
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-6 w-6" /> {t({ en: "Record", ml: "റെക്കോർഡ്" })}
                    </>
                  )}
                </Button>
                {recording && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mic className="h-5 w-5 text-red-500 animate-pulse" />
                    <span>{t({ en: "Recording...", ml: "റെക്കോർഡിംഗ്..." })}</span>
                  </div>
                )}
                 {audioUrl && !loading && (
                      <div className="w-full">
                          <p className="text-sm font-medium mb-2">{t({ en: "Your recording:", ml: "നിങ്ങളുടെ റെക്കോർഡിംഗ്:" })}</p>
                          <audio src={audioUrl} controls className="w-full" />
                      </div>
                  )}
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                  <CardTitle>{t({ en: "Step 2: Get Advice", ml: "ഘട്ടം 2: ഉപദേശം നേടുക" })}</CardTitle>
                  <CardDescription>
                   {t({ en: "Review the transcribed text and click the button for AI advice.", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്ത വാചകം അവലോകനം ചെയ്ത് AI ഉപദേശത്തിനായി ബട്ടൺ ക്ലിക്കുചെയ്യുക." })}
                  </CardDescription>
              </CardHeader>
               <CardContent>
                  <Textarea
                    placeholder={t({ en: "Transcribed text will appear here...", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്ത വാചകം ഇവിടെ ദൃശ്യമാകും..." })}
                    className="min-h-[100px] mb-4"
                    value={loading ? t({ en: "Transcribing...", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്യുന്നു..." }) : transcribedText}
                    readOnly={loading || gettingAdvice}
                    onChange={(e) => setTranscribedText(e.target.value)}
                  />
               </CardContent>
               <CardFooter>
                  <Button onClick={handleGetAdvice} disabled={!transcribedText || loading || gettingAdvice}>
                      {gettingAdvice && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {gettingAdvice ? t({ en: "Getting Advice...", ml: "ഉപദേശം നേടുന്നു..." }) : t({ en: "Get AI Advice", ml: "AI ഉപദേശം നേടുക" })}
                  </Button>
               </CardFooter>
             </Card>
          </div>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-primary" /> {t({ en: "AI Recommendation", ml: "AI ശുപാർശ" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "The advice from our AI expert will appear here.", ml: "ഞങ്ങളുടെ AI വിദഗ്ദ്ധന്റെ ഉപദേശം ഇവിടെ ദൃശ്യമാകും." })}
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
                    <h3 className="font-semibold mb-2">In English:</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                      {advice.englishAdvice}
                    </div>
                  </div>
                   {language !== 'en' && (
                    <div>
                      <h3 className="font-semibold mb-2">In {languageNameMap[language]}:</h3>
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                        {advice.translatedAdvice}
                      </div>
                    </div>
                   )}
                </div>
              )}
              {!gettingAdvice && !advice && (
                <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                  <p>{t({ en: "Your expert advice will be generated here.", ml: "നിങ്ങളുടെ വിദഗ്ദ്ധ ഉപദേശം ഇവിടെ ജനറേറ്റ് ചെയ്യും." })}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
