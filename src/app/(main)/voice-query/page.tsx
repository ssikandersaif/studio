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
import { getCropAdvice } from "@/ai/flows/ai-crop-advice";
import { Loader2, Mic, Square, Bot, Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Textarea } from "@/components/ui/textarea";

export default function VoiceQueryPage() {
  const [recording, setRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [gettingAdvice, setGettingAdvice] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();

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
      setAdvice("");
      setAudioUrl(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        variant: "destructive",
        title: t("Microphone Error", "മൈക്രോഫോൺ പിശക്"),
        description: t("Could not access microphone. Please check permissions.", "മൈക്രോഫോൺ ആക്സസ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി അനുമതികൾ പരിശോധിക്കുക."),
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
        title: t("Transcription Error", "ട്രാൻസ്ക്രിപ്ഷൻ പിശക്"),
        description: t("Failed to transcribe your voice. Please try again.", "നിങ്ങളുടെ ശബ്ദം പകർത്തുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക."),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetAdvice = async () => {
    if (!transcribedText.trim()) {
      toast({
        variant: "destructive",
        title: t("No text to analyze", "വിശകലനം ചെയ്യാൻ ടെക്സ്റ്റ് ഇല്ല"),
        description: t("Please record your question first.", "ദയവായി ആദ്യം നിങ്ങളുടെ ചോദ്യം റെക്കോർഡ് ചെയ്യുക."),
      });
      return;
    }
    setGettingAdvice(true);
    setAdvice("");
    try {
      const result = await getCropAdvice({ question: transcribedText });
      setAdvice(result.advice);
    } catch (error) {
      console.error("Error getting crop advice:", error);
      toast({
        variant: "destructive",
        title: t("AI Error", "AI പിശക്"),
        description: t("Failed to get advice from AI. Please try again later.", "AI-യിൽ നിന്ന് ഉപദേശം നേടുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക."),
      });
    } finally {
      setGettingAdvice(false);
    }
  };

  return (
    <>
      <Header
        title={t("Voice Query", "ശബ്ദ ചോദ്യം")}
        description={t("Ask farming questions in your local language.", "നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ കാർഷിക ചോദ്യങ്ങൾ ചോദിക്കുക.")}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t("Step 1: Speak Your Question", "ഘട്ടം 1: നിങ്ങളുടെ ചോദ്യം സംസാരിക്കുക")}</CardTitle>
                <CardDescription>
                  {t("Press the button to start recording. Ask your question clearly.", "റെക്കോർഡിംഗ് ആരംഭിക്കാൻ ബട്ടൺ അമർത്തുക. നിങ്ങളുടെ ചോദ്യം വ്യക്തമായി ചോദിക്കുക.")}
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
                      <Square className="mr-2 h-6 w-6" /> {t("Stop", "നിർത്തുക")}
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-6 w-6" /> {t("Record", "റെക്കോർഡ്")}
                    </>
                  )}
                </Button>
                {recording && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mic className="h-5 w-5 text-red-500 animate-pulse" />
                    <span>{t("Recording...", "റെക്കോർഡിംഗ്...")}</span>
                  </div>
                )}
                 {audioUrl && !loading && (
                      <div className="w-full">
                          <p className="text-sm font-medium mb-2">{t("Your recording:", "നിങ്ങളുടെ റെക്കോർഡിംഗ്:")}</p>
                          <audio src={audioUrl} controls className="w-full" />
                      </div>
                  )}
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                  <CardTitle>{t("Step 2: Get Advice", "ഘട്ടം 2: ഉപദേശം നേടുക")}</CardTitle>
                  <CardDescription>
                   {t("Review the transcribed text and click the button for AI advice.", "ട്രാൻസ്ക്രൈബ് ചെയ്ത വാചകം അവലോകനം ചെയ്ത് AI ഉപദേശത്തിനായി ബട്ടൺ ക്ലിക്കുചെയ്യുക.")}
                  </CardDescription>
              </CardHeader>
               <CardContent>
                  <Textarea
                    placeholder={t("Transcribed text will appear here...", "ട്രാൻസ്ക്രൈബ് ചെയ്ത വാചകം ഇവിടെ ദൃശ്യമാകും...")}
                    className="min-h-[100px] mb-4"
                    value={loading ? t("Transcribing...", "ട്രാൻസ്ക്രൈബ് ചെയ്യുന്നു...") : transcribedText}
                    readOnly={loading || gettingAdvice}
                    onChange={(e) => setTranscribedText(e.target.value)}
                  />
               </CardContent>
               <CardFooter>
                  <Button onClick={handleGetAdvice} disabled={!transcribedText || loading || gettingAdvice}>
                      {gettingAdvice && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {gettingAdvice ? t("Getting Advice...", "ഉപദേശം നേടുന്നു...") : t("Get AI Advice", "AI ഉപദേശം നേടുക")}
                  </Button>
               </CardFooter>
             </Card>
          </div>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-primary" /> {t("AI Recommendation", "AI ശുപാർശ")}
              </CardTitle>
              <CardDescription>
                {t("The advice from our AI expert will appear here.", "ഞങ്ങളുടെ AI വിദഗ്ദ്ധന്റെ ഉപദേശം ഇവിടെ ദൃശ്യമാകും.")}
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
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                  {advice}
                </div>
              )}
              {!gettingAdvice && !advice && (
                <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                  <p>{t("Your expert advice will be generated here.", "നിങ്ങളുടെ വിദഗ്ദ്ധ ഉപദേശം ഇവിടെ ജനറേറ്റ് ചെയ്യും.")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
