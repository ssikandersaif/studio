"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generalChat } from "@/ai/flows/general-chat-flow";
import { Loader2, Send, User, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

export default function TalkToAiPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A slight delay to allow the new message to render
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 100);
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await generalChat({ prompt: input });
      const botMessage: Message = { sender: 'bot', text: result.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chat response:", error);
      toast({
        variant: "destructive",
        title: t({ en: "AI Error", ml: "AI പിശക്", hi: "एआई त्रुटि" }),
        description: t({ en: "Failed to get response from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് പ്രതികരണം ലഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.", hi: "एआई से प्रतिक्रिया प्राप्त करने में विफल। कृपया बाद में पुनः प्रयास करें।" }),
      });
      // OPTIONAL: remove the user's message if the bot fails to respond
      // setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Talk to AI", hi: "एआई से बात करें" })}
        description={t({ en: "Have a general conversation with our AI assistant.", hi: "हमारे एआई सहायक के साथ एक सामान्य बातचीत करें।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6 flex justify-center">
        <Card className="w-full max-w-3xl flex flex-col h-[75vh]">
          <CardHeader>
            <CardTitle>{t({ en: "Chat", hi: "चैट" })}</CardTitle>
            <CardDescription>
              {t({ en: "You can ask anything!", hi: "आप कुछ भी पूछ सकते हैं!" })}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    {message.sender === 'bot' && (
                        <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                            <AvatarFallback><Bot size={18} /></AvatarFallback>
                        </Avatar>
                    )}
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap ${
                        message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary'
                    }`}>
                      {message.text}
                    </div>
                    {message.sender === 'user' && (
                        <Avatar className="w-8 h-8 border">
                             <AvatarFallback><User size={18} /></AvatarFallback>
                        </Avatar>
                    )}
                  </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                            <AvatarFallback><Bot size={18} /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-secondary flex items-center">
                            <Loader2 className="w-5 h-5 animate-spin"/>
                        </div>
                    </div>
                )}
                 {messages.length === 0 && !loading && (
                    <div className="text-center text-muted-foreground pt-16">
                        <p>{t({en: "No messages yet. Start the conversation!", hi: "अभी तक कोई संदेश नहीं है। बातचीत शुरू करें!"})}</p>
                    </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4 border-t">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t({ en: "Type your message...", hi: "अपना संदेश लिखें..." })}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
