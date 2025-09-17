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
        title: t({ en: "AI Error", ml: "AI പിശക്", hi: "एआई त्रुटि", ta: "AI பிழை", te: "AI లోపం", kn: "AI ದೋಷ", bn: "এআই ত্রুটি", mr: "एआय त्रुटी", gu: "AI ભૂલ", pa: "AI ਗਲਤੀ" }),
        description: t({ en: "Failed to get response from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് പ്രതികരണം ലഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.", hi: "एआई से प्रतिक्रिया प्राप्त करने में विफल। कृपया बाद में पुनः प्रयास करें।", ta: "AI இடமிருந்து பதில் பெற முடியவில்லை. தயவுசெய்து பின்னர் மீண்டும் முயற்சிக்கவும்.", te: "AI నుండి ప్రతిస్పందనను పొందడంలో విఫలమైంది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.", kn: "AI ಯಿಂದ ಪ್ರತಿಕ್ರಿಯೆ ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", bn: "এআই থেকে প্রতিক্রিয়া পেতে ব্যর্থ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।", mr: "एआय कडून प्रतिसाद मिळविण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.", gu: "AI પાસેથી પ્રતિસાદ મેળવવામાં નિષ્ફળ. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.", pa: "AI ਤੋਂ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" }),
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
        title={t({ en: "Talk to AI", hi: "एआई से बात करें", ml: "AI-യോട് സംസാരിക്കുക", ta: "AI உடன் பேசுங்கள்", te: "AIతో మాట్లాడండి", kn: "AI ಜೊತೆ ಮಾತನಾಡಿ", bn: "এআই এর সাথে কথা বলুন", mr: "एआयशी बोला", gu: "AI સાથે વાત કરો", pa: "AI ਨਾਲ ਗੱਲ ਕਰੋ" })}
        description={t({ en: "Have a general conversation with our AI assistant.", hi: "हमारे एआई सहायक के साथ एक सामान्य बातचीत करें।", ml: "ഞങ്ങളുടെ AI അസിസ്റ്റന്റുമായി ഒരു പൊതു സംഭാഷണം നടത്തുക.", ta: "எங்கள் AI உதவியாளருடன் ஒரு பொதுவான உரையாடலை மேற்கொள்ளுங்கள்.", te: "మా AI సహాయకుడితో సాధారణ సంభాషణ చేయండి.", kn: "ನಮ್ಮ AI ಸಹಾಯಕರೊಂದಿಗೆ ಸಾಮಾನ್ಯ ಸಂಭಾಷಣೆ ನಡೆಸಿ.", bn: "আমাদের এআই সহকারীর সাথে একটি সাধারণ কথোপকথন করুন।", mr: "आमच्या एआय सहाय्यकाशी सामान्य संभाषण करा.", gu: "અમારા AI સહાયક સાથે સામાન્ય વાતચીત કરો.", pa: "ਸਾਡੇ AI ਸਹਾਇਕ ਨਾਲ ਇੱਕ ਆਮ ਗੱਲਬਾਤ ਕਰੋ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6 flex justify-center">
        <Card className="w-full max-w-3xl flex flex-col h-[75vh]">
          <CardHeader>
            <CardTitle>{t({ en: "Chat", hi: "चैट", ml: "ചാറ്റ്", ta: "அரட்டை", te: "చాట్", kn: "ಚಾಟ್", bn: "চ্যাট", mr: "गप्पा", gu: "ચેટ", pa: "ਗੱਲਬਾਤ" })}</CardTitle>
            <CardDescription>
              {t({ en: "You can ask anything!", hi: "आप कुछ भी पूछ सकते हैं!", ml: "നിങ്ങൾക്ക് എന്തും ചോദിക്കാം!", ta: "நீங்கள் எதையும் கேட்கலாம்!", te: "మీరు ఏదైనా అడగవచ్చు!", kn: "ನೀವು ಏನು ಬೇಕಾದರೂ ಕೇಳಬಹುದು!", bn: "আপনি যে কোন কিছু জিজ্ঞাসা করতে পারেন!", mr: "तुम्ही काहीही विचारू शकता!", gu: "તમે કંઈપણ પૂછી શકો છો!", pa: "ਤੁਸੀਂ ਕੁਝ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ!" })}
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
                        <p>{t({en: "No messages yet. Start the conversation!", hi: "अभी तक कोई संदेश नहीं है। बातचीत शुरू करें!", ml: "ഇതുവരെ സന്ദേശങ്ങളൊന്നുമില്ല. സംഭാഷണം ആരംഭിക്കൂ!", ta: "இன்னும் செய்திகள் இல்லை. உரையாடலைத் தொடங்குங்கள்!", te: "ఇంకా సందేశాలు లేవు. సంభాషణను ప్రారంభించండి!", kn: "ಇನ್ನೂ ಯಾವುದೇ ಸಂದೇಶಗಳಿಲ್ಲ. ಸಂಭಾಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ!", bn: "এখনও কোন বার্তা নেই। কথোপকথন শুরু করুন!", mr: "अजून कोणतेही संदेश नाहीत. संभाषण सुरू करा!", gu: "હજુ સુધી કોઈ સંદેશા નથી. વાતચીત શરૂ કરો!", pa: "ਅਜੇ ਤੱਕ ਕੋਈ ਸੁਨੇਹਾ ਨਹੀਂ। ਗੱਲਬਾਤ ਸ਼ੁਰੂ ਕਰੋ!"})}</p>
                    </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4 border-t">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t({ en: "Type your message...", hi: "अपना संदेश लिखें...", ml: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...", ta: "உங்கள் செய்தியைத் தட்டச்சு செய்யவும்...", te: "మీ సందేశాన్ని టైప్ చేయండి...", kn: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...", bn: "আপনার বার্তা টাইপ করুন...", mr: "तुमचा संदेश टाइप करा...", gu: "તમારો સંદેશ લખો...", pa: "ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ..." })}
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
