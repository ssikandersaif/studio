"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { voiceQueryForFarming } from "@/ai/flows/voice-query";
import { Loader2, Mic, MicOff, Square, Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";

export default function VoiceQueryPage() {
  const [recording, setRecording] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = handleStop;
      mediaRecorderRef.current.start();
      setRecording(true);
      setAnswer("");
      setAudioUrl(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
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
        await getAIAnswer(base64Audio);
    };

    audioChunksRef.current = [];
  }

  const getAIAnswer = async (voiceQuery: string) => {
    setLoading(true);
    try {
      const result = await voiceQueryForFarming({ voiceQuery, language });
      setAnswer(result.answer);
    } catch (error) {
      console.error("Error with voice query:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to process your voice query. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Voice Query"
        description="Ask farming questions in your local language."
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Speak Your Question</CardTitle>
              <CardDescription>
                Press the button to start recording. Ask your question clearly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-6">
              <Button
                onClick={recording ? stopRecording : startRecording}
                size="lg"
                variant={recording ? "destructive" : "default"}
                className="w-40 h-16 text-lg"
              >
                {recording ? (
                  <>
                    <Square className="mr-2 h-6 w-6" /> Stop
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-6 w-6" /> Record
                  </>
                )}
              </Button>
              {recording && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Mic className="h-5 w-5 text-red-500 animate-pulse" />
                    <span>Recording...</span>
                </div>
              )}
               {audioUrl && !loading && (
                    <div className="w-full">
                        <p className="text-sm font-medium mb-2">Your recording:</p>
                        <audio src={audioUrl} controls className="w-full" />
                    </div>
                )}
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-primary" /> AI Answer
              </CardTitle>
              <CardDescription>
                The answer from our AI expert will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {loading && (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                </div>
              )}
              {answer && (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                    {answer}
                </div>
              )}
              {!loading && !answer && (
                <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                    <p>Press record and ask a question to get an answer.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
