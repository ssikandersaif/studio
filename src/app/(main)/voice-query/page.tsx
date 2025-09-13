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
        title: t({ en: "Microphone Error", ml: "മൈക്രോഫോൺ പിശക്", hi: "माइक्रोफ़ोन त्रुटि", ta: "மைக்ரோஃபோன் பிழை", te: "మైక్రోఫోన్ లోపం", kn: "ಮೈಕ್ರೋಫೋನ್ ದೋಷ", bn: "מיקרופון שגיאה", mr: "मायक्रोफोन त्रुटी", gu: "માઇક્રોફોન ભૂલ", pa: "ਮਾਈਕ੍ਰੋਫੋన్ ਗਲਤੀ" }),
        description: t({ en: "Could not access microphone. Please check permissions.", ml: "മൈക്രോഫോൺ ആക്സസ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി അനുമതികൾ പരിശോധിക്കുക.", hi: "माइक्रोफ़ोन तक नहीं पहुंच सका। कृपया अनुमतियों की जांच करें।", ta: "மைக்ரோஃபோனை அணுக முடியவில்லை. அனுமதிகளைச் சரிபார்க்கவும்.", te: "మైక్రోఫోన్‌ను యాక్సెస్ చేయలేకపోయింది. దయచేసి अनुमतिలను తనిఖీ చేయండి.", kn: "ಮೈಕ್ರೋಫೋನ್ ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ദയವಿಟ್ಟು ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.", bn: "מיקרופון অ্যাক্সেস করা যায়নি। অনুগ্রহ করে অনুমতিগুলি পরীক্ষা করুন।", mr: "मायक्रोफोनमध्ये प्रवेश करू शकलो नाही. कृपया परवानग्या तपासा.", gu: "માઇક्रोફોનને ઍક્सेस કરી શકાયું નથી. કૃપા કરીને પરવાનગીઓ તપાસો.", pa: "ਮਾਈਕ੍ਰੋਫੋਨ ਤੱਕ ਪਹੁੰchਣ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਅਨੁਮਤੀਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।" }),
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
        title: t({ en: "Transcription Error", ml: "ട്രാൻസ്ക്രിപ്ഷൻ പിശക്", hi: "प्रतिलेखन त्रुटि", ta: "ട്രാൻസ്ക്രിപ്ഷൻ പിശക്", te: "ట్రాన్స్క్రిప్షన్ లోపం", kn: "ಟ್ರಾנסಕ್ರಿప్ഷನ್ ದೋಷ", bn: " প্রতিলিপি ত্রুটি", mr: "ट्रान्सक्रिप्शन त्रुटी", gu: "ટ્રાન્સક્રિપ્ਸ਼ਨ ભૂલ", pa: "ਟ੍ਰਾਂਸਕ੍ਰਿਪਸ਼ਨ ਗਲਤੀ" }),
        description: t({ en: "Failed to transcribe your voice. Please try again.", ml: "നിങ്ങളുടെ ശബ്ദം പകർത്തുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.", hi: "आपकी आवाज़ का प्रतिलेखन करने में विफल। कृपया पुन: प्रयास करें।", ta: "உங்கள் குரலை படியெடுக்க முடியவில்லை. దయచేసి మళ్లీ ప్రయత్నించండి.", te: "మీ குரலை படியெடுக்க முடியவில்லை. దయచేసి మళ్లీ ప్రయత్నించండి.", kn: "ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು প্রতিলিপি ಮಾಡಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ફરી પ્રયાસಿಸಿ.", bn: "আপনার ভয়েস প্রতিলিপি করতে ব্যর্থ। অনুগ্রহ করে 다시 চেষ্টা করুন।", mr: "तुमचा आवाज প্রতিলিপি करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.", gu: "તમારા અવાજને ટ્રાન્સક્રાઇબ કરવામાં નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.", pa: "ਤੁਹਾਡੀ ਆਵਾਜ਼ ਨੂੰ ਟ్రాన్స్ક્રਾਈਬ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" }),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetAdvice = async () => {
    if (!transcribedText.trim()) {
      toast({
        variant: "destructive",
        title: t({ en: "No text to analyze", ml: "വിശകലനം ചെയ്യാൻ ടെക്സ്റ്റ് ഇല്ല", hi: "विश्लेषण के लिए कोई पाठ नहीं", ta: "பகுப்பாய்வு செய்ய පෙළ இல்லை", te: "విశ్లేషించడానికి టెక్స్ట్ లేదు", kn: "ವಿಶ್ಲೇಷಿಸಲು ಯಾವುದೇ ಪಠ್ಯವಿಲ್ಲ", bn: "تحليل করার জন্য কোনো পাঠ্য নেই", mr: "विश्लेषण करण्यासाठी कोणताही मजकूर नाही", gu: "વિશ્લેષण કરવા માટે કોઈ ટેક્સ્ટ નથી", pa: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨ ਲਈ ਕੋਈ ਟੈਕਸਟ ਨਹੀਂ" }),
        description: t({ en: "Please record your question first.", ml: "ദയവായി ആദ്യം നിങ്ങളുടെ ചോദ്യം റെക്കോർഡ് ചെയ്യുക.", hi: "कृपया पहले अपना प्रश्न रिकॉर्ड करें।", ta: "దయచేసి మొదట మీ ప్రశ్నను రికార్డ్ చేయండి.", te: "దయచేసి మొదట మీ ప్రశ్నను రికార్డ్ చేయండి.", kn: "దయವಿಟ್ಟು ಮೊದಲು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು റെക്കോർഡ് ಮಾಡಿ.", bn: "অনুগ্রহ করে প্রথমে আপনার প্রশ্নটি রেকর্ড করুন।", mr: "कृपया आधी तुमचा प्रश्न रेकॉर्ड करा.", gu: "કૃપા કરીને પહેલા તમારો પ્રશ્ન રેકોર્ડ કરો.", pa: "ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਆਪਣਾ ਸਵਾਲ ਰికਾਰਡ ਕਰੋ।" }),
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
        title: t({ en: "AI Error", ml: "AI പിശക്", hi: "एआई त्रुटि", ta: "AI பிழை", te: "AI లోపం", kn: "AI ದೋಷ", bn: "এআই ত্রুটি", mr: "एआय त्रुटी", gu: "AI ભૂલ", pa: "AI ਗਲਤੀ" }),
        description: t({ en: "Failed to get advice from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് ഉപദേശം ലഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.", hi: "एआई से सलाह लेने में विफल। कृपया बाद में पुन: प्रयास करें।", ta: "AI இடமிருந்து அறிவுரை பெற முடியவில்லை. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.", te: "AI నుండి సలహా పొందడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.", kn: "AI ನಿಂದ ಸಲಹೆ ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ 다시 ಪ್ರಯತ್ನಿಸಿ.", bn: "এআই থেকে পরামর্শ পেতে ব্যর্থ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।", mr: "एआय कडून सल्ला मिळविण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.", gu: "AI પાસેથી સલાહ મેળવવામાં નિષ્ફળ. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.", pa: "AI ਤੋਂ ਸਲਾਹ ਲੈਣ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" }),
      });
    } finally {
      setGettingAdvice(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न", ta: "குரல் கேள்வி", te: "వాయిస్ ప్రశ్న", kn: "ಧ್ವನಿ ಪ್ರಶ್ನೆ", bn: "ভয়েস কোয়েরি", mr: "आवाज प्रश्न", gu: "અવાજ ક્વેરી", pa: "ਅਵਾਜ਼ ਸਵਾਲ" })}
        description={t({ en: "Ask farming questions in your local language.", ml: "നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ കാർഷിക ചോദ്യങ്ങൾ ചോദിക്കുക.", hi: "अपनी स्थानीय भाषा में खेती के प्रश्न पूछें।", ta: "உங்கள் உள்ளூர் மொழியில் விவசாய கேள்விகளைக் கேளுங்கள்.", te: "మీ స్థానిక భాషలో వ్యవసాయ ప్రశ్నలు అడగండి.", kn: "ನಿಮ್ಮ ಸ್ಥಳೀಯ భాషೆಯಲ್ಲಿ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.", bn: "আপনার স্থানীয় ভাষায় कृषि প্রশ্ন জিজ্ঞাসা করুন।", mr: "तुमच्या स्थानिक भाषेत शेतीचे प्रश्न विचारा.", gu: "તમારી સ્થાનિક ભાષામાં ખેતીના પ્રશ્નો પૂછો.", pa: "ਆਪਣੀ ਸਥਾਨਕ ਭਾਸ਼ਾ ਵਿੱਚ ਖੇਤੀਬਾੜੀ ਦੇ ਸਵਾਲ ਪੁੱਛੋ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t({ en: "Step 1: Speak Your Question", ml: "ഘട്ടം 1: നിങ്ങളുടെ ചോദ്യം സംസാരിക്കുക", hi: "चरण 1: अपना प्रश्न बोलें", ta: "படி 1: உங்கள் கேள்வியைப் பேசுங்கள்", te: "ഘട്ടം 1: మీ ప్రశ్న మాట్లాడండి", kn: "ಹಂತ 1: നിങ്ങളുടെ ಪ್ರಶ್ನೆ ಮಾತನಾಡಿ", bn: "ধাপ 1: আপনার প্রশ্ন বলুন", mr: "पायरी 1: तुमचा प्रश्न बोला", gu: "પગલું 1: તમારો પ્રશ્ન બોલો", pa: "ਕਦਮ 1: ਆਪਣਾ ਸਵਾਲ ਬੋਲੋ" })}</CardTitle>
                <CardDescription>
                  {t({ en: "Press the button to start recording. Ask your question clearly.", ml: "റെക്കോർഡിംഗ് ആരംഭിക്കാൻ ബട്ടൺ അമർത്തുക. നിങ്ങളുടെ ചോദ്യം വ്യക്തമായി ചോദിക്കുക.", hi: "रिकॉर्डिंग शुरू करने के लिए बटन दबाएं। अपना प्रश्न स्पष्ट रूप से पूछें।", ta: "பதிவுசெய்யத் தொடங்க பொத்தானை அழுத்தவும். உங்கள் கேள்வியைத் தெளிவாகக் கேளுங்கள்.", te: "రికార్డింగ్ ప్రారంభించడానికి బటన్‌ను నొక్కండి. మీ ప్రశ్నను స్పష్టంగా అడగండి.", kn: "ರೆಕಾರ್ഡിಂಗ್ ಪ್ರಾರಂಭಿಸಲು ബటನ್ ಒತ್ತಿರಿ. ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು સ્પಷ್ಟವಾಗಿ ಕೇಳಿ.", bn: "রেকর্ডিং শুরু করতে বোতামটি চাপুন। আপনার প্রশ্নটি સ્પષ્ટভাবে জিজ্ঞাসা করুন।", mr: "रेकॉर्डिंग सुरू करण्यासाठी बटण दाबा. तुमचा प्रश्न स्पष्टपणे विचारा.", gu: "રેકોર્ડિંગ શરૂ કરવા માટે બટન દબાવો. તમારો પ્રશ્ન સ્પષ્ટપણે પૂછો.", pa: "ਰਿਕਾਰਡਿੰਗ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਬਟਨ ਦਬਾਓ। ਆਪਣਾ ਸਵਾਲ ਸਪਸ਼ਟ रूपमा ਪੁੱਛੋ।" })}
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
                      <Square className="mr-2 h-6 w-6" /> {t({ en: "Stop", ml: "നിർത്തുക", hi: "रोकें", ta: "நிறுத்து", te: "ఆపు", kn: "ನಿಲ್ಲಿಸಿ", bn: "থামান", mr: "थांबा", gu: "રોકો", pa: "ਰੋకో" })}
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-6 w-6" /> {t({ en: "Record", ml: "റെക്കോർഡ്", hi: "रिकॉर्ड", ta: "பதிவு", te: "రికార్డ్ చేయండి", kn: "റെക്കോർഡ് ಮಾಡಿ", bn: "রেকর্ড", mr: "रेकॉर्ड", gu: "રેકોર્ડ", pa: "ਰਿਕਾਰਡ" })}
                    </>
                  )}
                </Button>
                {recording && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mic className="h-5 w-5 text-red-500 animate-pulse" />
                    <span>{t({ en: "Recording...", ml: "റെക്കോർഡിംഗ്...", hi: "रिकॉर्डिंग...", ta: "பதிவுசெய்கிறது...", te: "రికార్డింగ్...", kn: "ರೆಕಾರ್ഡിಂಗ್...", bn: "রেকর্ডিং...", mr: "रेकॉर्डिंग...", gu: "રેકોर्डિંગ...", pa: "ਰਿਕਾਰਡਿੰਗ..." })}</span>
                  </div>
                )}
                 {audioUrl && !loading && (
                      <div className="w-full">
                          <p className="text-sm font-medium mb-2">{t({ en: "Your recording:", ml: "നിങ്ങളുടെ റെക്കോർഡിംഗ്:", hi: "आपकी रिकॉर्डिंग:", ta: "உங்கள் பதிவு:", te: "మీ రికార్డింగ్:", kn: "ನಿಮ್ಮ ರೆಕಾರ್ಡಿಂಗ್:", bn: "আপনার রেকর্ডিং:", mr: "तुमची रेकॉर्डिंग:", gu: "તમારી રેકોર્ડિંગ:", pa: "ਤੁਹਾਡੀ ਰਿਕਾਰਡਿੰਗ:" })}</p>
                          <audio src={audioUrl} controls className="w-full" />
                      </div>
                  )}
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                  <CardTitle>{t({ en: "Step 2: Get Advice", ml: "ഘട്ടം 2: ഉപദേശം നേടുക", hi: "चरण 2: सलाह लें", ta: "படி 2: அறிவுரை பெறுங்கள்", te: "ഘട്ടം 2: సలహా పొందండి", kn: "ಹಂತ 2: ಸಲಹೆ ಪಡೆಯಿರಿ", bn: "ধাপ 2: পরামর্শ alın", mr: "पायरी 2: सल्ला घ्या", gu: "પગલું 2: સલાહ લો", pa: "ਕਦਮ 2: ਸਲਾਹ ਲਓ" })}</CardTitle>
                  <CardDescription>
                   {t({ en: "Review the transcribed text and click the button for AI advice.", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്ത വാചകം അവലോകനം ചെയ്ത് AI ഉപദേശത്തിനായി ബട്ടൺ ക്ലിക്കുചെയ്യുക.", hi: "प्रतिलेखित पाठ की समीक्षा करें और AI सलाह के लिए बटन पर क्लिक करें।", ta: "படியெடுத்த உரையை மதிப்பாய்வு செய்து, AI அறிவுரைக்கு பொத்தானைக் கிளிக் செய்யவும்.", te: "ట్రాన్స్క్రైబ్ చేసిన వచనాన్ని సమీక్షించి, AI సలహా కోసం బటన్‌ను క్లిక్ చేయండి.", kn: "ಪ್ರತিলಿଖିത ಪಠ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ અને AI ಸಲಹೆಗಾಗಿ ബటನ್ ക്ലിಕ್ ಮಾಡಿ.", bn: " প্রতিলিপি করা पाठ পর্যালোচনা করুন এবং AI পরামর্শের জন্য বোতামে ক্লিক করুন।", mr: "ट्रान्सक्रिप्ट केलेला मजकूर तपासा आणि AI सल्ल्यासाठी बटणावर क्लिक करा.", gu: "ટ્રાન્સક્રાઇબ કરેલા ટેક્સ્ટની સમીક્ષા કરો અને AI સલાહ માટે બટન પર ક્લિક કરો.", pa: "ਟਰਾన్స్ਕ੍ਰਾਈਬ ਕੀਤੇ ਟੈਕਸਟ ਦੀ ਸਮੀਖਿਆ ਕਰੋ ਅਤੇ AI ਸਲਾਹ ਲਈ ਬਟਨ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।" })}
                  </CardDescription>
              </CardHeader>
               <CardContent>
                  <Textarea
                    placeholder={t({ en: "Transcribed text will appear here...", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്ത വാചകം ഇവിടെ ദൃശ്യമാകും...", hi: "प्रतिलेखित पाठ यहां दिखाई देगा...", ta: "படியெடுத்த உரை இங்கே தோன்றும்...", te: "ట్రాన్స్క్రైబ్ చేసిన టెక్స్ట్ ఇక్కడ కనిపిస్తుంది...", kn: "ಪ್ರತಿलिपि ಮಾಡಿದ ಪಠ್ಯ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ...", bn: "প্রতিলিপি করা পাঠ্য এখানে প্রদর্শিত হবে...", mr: "ट्रान्सक्रिप्ट केलेला मजकूर येथे दिसेल...", gu: "ટ્રાન્સક્રાઈब કરેલ ટેક્સ્ટ અહીં દેખાશે...", pa: "ਲਿਪੀਅੰਤਰਿਤ ਟੈਕਸਟ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇਗਾ..." })}
                    className="min-h-[100px] mb-4"
                    value={loading ? t({ en: "Transcribing...", ml: "ട്രാൻസ്ക്രൈബ് ചെയ്യുന്നു...", hi: "प्रतिलेखन...", ta: "படியெடுக்கிறது...", te: "ట్రాన్స్క్రైబ్ చేస్తోంది...", kn: "ಪ್ರತಿലിപി ಮಾಡಲಾಗುತ್ತಿದೆ...", bn: "প্রতিলিপি করা হচ্ছে...", mr: "ट्रान्सक्राइब करत आहे...", gu: "ટ્રાન્સક્રાઇબ કરી રહ્યું છે...", pa: "ਲਿਪੀਅੰतरित ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ..." }) : transcribedText}
                    readOnly={loading || gettingAdvice}
                    onChange={(e) => setTranscribedText(e.target.value)}
                  />
               </CardContent>
               <CardFooter>
                  <Button onClick={handleGetAdvice} disabled={!transcribedText || loading || gettingAdvice}>
                      {gettingAdvice && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {gettingAdvice ? t({ en: "Getting Advice...", ml: "ഉപദേശം നേടുന്നു...", hi: "सलाह मिल रही है...", ta: "ஆலோசனை பெறப்படுகிறது...", te: "సలహా పొందుతోంది...", kn: "ಸಲಹೆ ಪಡೆಯಲಾಗುತ್ತಿದೆ...", bn: "পରାమర్శ পাওয়া হচ্ছে...", mr: "सल्ला मिळत आहे...", gu: "સલાહ મળી રહી છે...", pa: "ਸਲਾਹ ਮਿਲ ਰਹੀ ਹੈ..." }) : t({ en: "Get AI Advice", ml: "AI ഉപദേശം നേടുക", hi: "AI सलाह प्राप्त करें", ta: "AI ஆலோசனை ಪಡೆಯுங்கள்", te: "AI సలహా పొందండి", kn: "AI ಸಲಹೆ ಪಡೆಯಿರಿ", bn: "এআই পরামর্শ পান", mr: "एआय सल्ला मिळवा", gu: "AI સલાહ મેળવો", pa: "AI ਸਲਾਹ ਲਓ" })}
                  </Button>
               </CardFooter>
             </Card>
          </div>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-primary" /> {t({ en: "AI Recommendation", ml: "AI ശുപാർശ", hi: "एआई सिफारिश", ta: "AI பரிந்துரை", te: "AI సిఫార్సు", kn: "AI ಶಿಫಾರಸು", bn: "এআই সুপারিশ", mr: "एआय शिफारस", gu: "AI ભલામણ", pa: "AI ਸਿਫਾਰਸ਼" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "The advice from our AI expert will appear here.", ml: "ഞങ്ങളുടെ AI വിദഗ്ദ്ധന്റെ ഉപദേശം ഇവിടെ ദൃശ്യമാകും.", hi: "हमारे AI विशेषज्ञ की सलाह यहां दिखाई देगी।", ta: "எங்கள் AI நிபுணரின் அறிவுரை இங்கே தோன்றும்.", te: "మా AI నిపుణుడి సలహా ఇక్కడ కనిపిస్తుంది.", kn: "ನಮ್ಮ AI ತಜ್ಞರ ಸಲಹೆ અહીં ಕಾಣಿಸುತ್ತದೆ.", bn: "আমাদের AI বিশেষজ্ঞের পরামর্শ এখানে প্রদর্শিত হবে।", mr: "आमच्या AI तज्ञांचा सल्ला येथे दिसेल.", gu: "અમારા AI નિષ્ણાતની સલાહ અહીં દેખાશે.", pa: "ਸਾਡੇ AI ਮਾਹਰ ਦੀ ਸਲਾਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇगी।" })}
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
