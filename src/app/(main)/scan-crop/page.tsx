"use client";

import { useState, useRef } from "react";
import Image from "next/image";
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
import { identifyDiseaseOrPest, IdentifyDiseaseOrPestOutput } from "@/ai/flows/image-based-disease-id";
import { Camera, ListChecks, Loader2, Upload, Leaf, TestTube2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function ScanCropPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<IdentifyDiseaseOrPestOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
          toast({
            variant: "destructive",
            title: t({ en: "Image too large", ml: "ചിത്രം വളരെ വലുതാണ്", hi: "छवि बहुत बड़ी है", ta: "படம் 너무 വലുതാണ്", te: "చిత్రం చాలా పెద్దది", kn: "ಚಿತ್ರ ತುಂಬಾ ದೊಡ್ಡದಾಗಿದೆ", bn: "ছবি খুব বড়", mr: "प्रतिमा खूप मोठी आहे", gu: "છબી ખૂબ મોટી છે", pa: "ਚਿੱਤਰ ਬਹੁਤ ਵੱਡਾ ਹੈ" }),
            description: t({ en: "Please upload an image smaller than 4MB.", ml: "4MB-യിൽ താഴെയുള്ള ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.", hi: "कृपया 4MB से छोटी छवि अपलोड करें।", ta: "దయచేసి 4MB కంటే చిన్న చిత్రాన్ని అప్‌లోడ్ చేయండి.", te: "దయచేసి 4MB కంటే చిన్న చిత్రాన్ని అప్‌లోడ్ చేయండి.", kn: "దయವಿಟ್ಟು 4MB ಗಿಂತ ಚಿಕ್ಕದಾದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.", bn: "অনুগ্রহ করে 4MB এর চেয়ে ছোট একটি ছবি আপলোড করুন।", mr: "कृपया 4MB पेक्षा लहान प्रतिमा अपलोड करा.", gu: "કૃપા કરીને 4MB કરતાં નાની છબી અપલોડ કરો.", pa: "ਕਿਰਪਾ ਕਰਕੇ 4MB ਤੋਂ چھوٹی ਇੱਕ ਚਿੱਤਰ ਅੱਪਲੋਡ ਕਰੋ।" }),
          });
          return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        setImageData(dataUri);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null); // Clear previous results
    }
  };

  const handleAnalyze = async () => {
    if (!imageData) {
      toast({
        variant: "destructive",
        title: t({ en: "No image selected", ml: "ചിത്രം തിരഞ്ഞെടുത്തിട്ടില്ല", hi: "कोई छवि चयनित नहीं", ta: "படம் தேர்ந்தெடுக்கப்படவில்லை", te: "చిత్రం ఎంచుకోబడలేదు", kn: "ಯಾವುದೇ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿಲ್ಲ", bn: "কোনো ছবি নির্বাচন করা হয়নি", mr: "कोणतीही प्रतिमा निवडली नाही", gu: "કોઈ છબી પસંદ નથી", pa: "ਕੋਈ ਚਿੱਤਰ ਨਹੀਂ ਚੁਣਿਆ ਗਿਆ" }),
        description: t({ en: "Please upload an image of your crop to analyze.", ml: "വിശകലനം ചെയ്യാൻ ദയവായി നിങ്ങളുടെ വിളയുടെ ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.", hi: "विश्लेषण के लिए कृपया अपनी फसल की एक छवि अपलोड करें।", ta: "பகுப்பாய்வு ಮಾಡಲು உங்கள் பயிரின் படத்தை பதிவேற்றவும்.", te: "विश्लेषण చేయడానికి దయచేసి మీ పంట యొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి.", kn: "ವಿಶ್ಲೇಷಣೆಗಾಗಿ ದಯವಿಟ್ಟು ನಿಮ್ಮ ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.", bn: "تحليل করার জন্য আপনার ফসলের একটি ছবি আপলোড করুন।", mr: "विश्लेषण करण्यासाठी कृपया तुमच्या पिकाची प्रतिमा अपलोड करा.", gu: "વિશ્લેષણ કરવા માટે કૃપા કરીને તમારા પાકની છબી અપલોડ કરો.", pa: "ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਫਸਲ ਦੀ ਇੱਕ છબી ਅੱਪਲੋਡ ਕਰੋ।" }),
      });
      return;
    }
    setLoading(true);
    setAnalysisResult(null);
    try {
      const result = await identifyDiseaseOrPest({ photoDataUri: imageData, language });
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error identifying disease:", error);
      toast({
        variant: "destructive",
        title: t({ en: "AI Error", ml: "AI പിശക്", hi: "एआई त्रुटि", ta: "AI பிழை", te: "AI లోపం", kn: "AI ದೋಷ", bn: "এআই ত্রুটি", mr: "एआय त्रुटी", gu: "AI ભૂલ", pa: "AI ਗਲਤੀ" }),
        description: t({ en: "Failed to analyze image. Please try again later.", ml: "ചിത്രം വിശകലനം ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.", hi: "छवि का विश्लेषण करने में विफल। कृपया बाद में पुन: प्रयास करें।", ta: "படத்தை பகுப்பாய்வு செய்ய முடியவில்லை. ದಯವಿಟ್ಟು ನಂತರ 다시 ಪ್ರಯತ್ನించండి.", te: "చిత్రాన్ని విశ్లేషించడంలో విఫలమైంది. దయచేసి మళ్లీ પ્રયત્నించండి.", kn: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ફરી પ્રયાસಿಸಿ.", bn: "ছবি বিশ্লেষণ করতে ব্যর্থ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।", mr: "प्रतिमा विश्लेषण करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.", gu: "છબીનું વિશ્લેષણ કરવામાં નિષ્ફળ. કૃપા કરીને પછીથી ફરી પ્રયાસ કરો.", pa: "ਚਿੱਤਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन", ta: "பயிர் స్కాన్", te: "పంట స్కాన్", kn: "ಬೆಳೆ స్కాన్", bn: "ফসল স্ক্যান", mr: "पीक स्कॅन", gu: "પાક સ્કેન", pa: "ਫਸਲ ਸਕੈਨ" })}
        description={t({ en: "Upload a crop image for AI-driven disease and pest identification.", ml: "AI- ഉപയോഗിച്ചുള്ള രോഗ, കീട തിരിച്ചറിയലിനായി വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.", hi: "AI-संचालित रोग और कीट पहचान के लिए फसल की छवि अपलोड करें।", ta: "AI-চালিত রোগ এবং കീടpatang തിരിച്ചറിയലിനായി பயிர் ചിത്രം আপলোড করুন.", te: "AI-ఆధారిత వ్యాధి మరియు കീటకాల గుర్తింపు కోసం పంట చిత్రాన్ని అప్‌లోడ్ చేయండి.", kn: "AI-ಚಾಲಿತ ರೋಗ ਅਤੇ ಕೀಟ ಗುರುತಿಸುವಿಕೆಗಾಗಿ ಬೆಳೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.", bn: "এআই-চালিত রোগ ও পোকা শনাক্তকরণের জন্য ফসলের ছবি আপলোড করুন।", mr: "एआय-आधारित रोग आणि कीड ओळखण्यासाठी पिकाची प्रतिमा अपलोड करा.", gu: "AI-આધારિત રોગ અને જંતુ ઓળખ માટે પાકની છબી અપલોడ్ કરો.", pa: "AI-ਸੰਚालित ਬਿਮਾਰੀ ਅਤੇ ਕੀਟ ਪਛਾਣ ਲਈ ਫਸਲ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t({ en: "Upload Crop Image", ml: "വിളയുടെ ചിത്രം അപ്‌लोड് ചെയ്യുക", hi: "फसल की छवि अपलोड करें", ta: "பயிர் படத்தை பதிவேற்றவும்", te: "పంట చిత్రాన్ని అప్‌లోడ్ చేయండి", kn: "ಬೆಳೆ ಚಿತ್ರವನ್ನು അപ്‌ಲೋಡ್ ಮಾಡಿ", bn: "ফসলের ছবি আপলোড করুন", mr: "पीक प्रतिमा अपलोड करा", gu: "પાકની છબી અપલોડ કરો", pa: "ਫਸਲ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ" })}</CardTitle>
              <CardDescription>
                {t({ en: "Choose a clear photo of the affected plant part.", ml: "രോഗബാധിതമായ ചെടിയുടെ ഭാഗത്തിന്റെ വ്യക്തമായ ഫോട്ടോ തിരഞ്ഞെടുക്കുക.", hi: "प्रभावित पौधे के हिस्से की एक स्पष्ट तस्वीर चुनें।", ta: "பாதிக்கப்பட்ட தாவரப் பகுதியின் தெளிவான புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.", te: "ప్రభావితమైన మొక్క యొక్క தெளிவான ఫోటోను ఎంచుకోండి.", kn: "ಬಾధిత ಸಸ್ಯದ ಭಾಗದ ಸ್ಪಷ್ಟವಾದ ಫೋಟೋವನ್ನು ಆಯ್ಕೆಮಾಡಿ.", bn: "प्रभावित উদ্ভিদের অংশের একটি સ્પષ્ટ ছবি પસંદ করুন।", mr: "बाधित वनस्पतीच्या भागाचा स्पष्ट फोटो निवडा.", gu: "અસરગ્રस्त છોડના ભાગનો સ્પષ્ટ ફોટો પસંદ કરો.", pa: "ਪ੍ਰਭਾਵਿਤ ਪੌਦੇ ਦੇ ਹਿੱਸੇ ਦੀ ਇੱਕ ਸਾਫ਼ ਤਸਵੀਰ ਚੁਣੋ।" })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="w-full aspect-video border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt={t({ en: "Crop preview", ml: "വിള പ്രിവ്യൂ", hi: "फसल पूर्वावलोकन", ta: "பயிர் முன்னோட்டம்", te: "పంట προεπισκόπηση", kn: "ಬೆಳೆ ಪೂರ್ವವೀಕ್ಷಣೆ", bn: "ফসলের पूर्वावलोकन", mr: "पीक पूर्वावलोकन", gu: "પાક पूर्वावलोकन", pa: "ਫਸਲ ਦਾ पूर्वावलोकन" })}
                    width={400}
                    height={225}
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <div className="text-center text-muted-foreground p-4">
                    <Camera className="mx-auto h-12 w-12" />
                    <p className="mt-2">{t({ en: "Click to upload or drag & drop", ml: "അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക്കുചെയ്യുക അല്ലെങ്കിൽ വലിച്ചിടുക", hi: "अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें", ta: "பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்", te: "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా లాగి వదలండి", kn: "ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ক্লিক ಮಾಡಿ ಅಥವಾ ಎಳೆದು ಬಿಡಿ", bn: "আপলোড করতে ক্লিক করুন বা拖และ放", mr: "अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग आणि ड्रॉप करा", gu: "ਅੱਪਲੋడ్ કરવા માટે ક્લિક કરો અથવા ਡਰੈਗ ਅਤੇ ਡਰਾਪ ਕਰੋ", pa: "ਅੱਪਲੋడ్ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ ਜਾਂ ਡਰੈਗ ਅਤੇ ਡਰਾਪ ਕਰੋ" })}</p>
                    <p className="text-xs mt-1">{t({ en: "PNG, JPG, WEBP up to 4MB", ml: "PNG, JPG, WEBP 4MB വരെ", hi: "PNG, JPG, WEBP 4MB तक", ta: "PNG, JPG, WEBP 4MB வரை", te: "PNG, JPG, WEBP 4MB వరకు", kn: "PNG, JPG, WEBP 4MB ವರೆಗೆ", bn: "PNG, JPG, WEBP 4MB পর্যন্ত", mr: "PNG, JPG, WEBP 4MB पर्यंत", gu: "PNG, JPG, WEBP 4MB સુધી", pa: "PNG, JPG, WEBP 4MB ਤੱਕ" })}</p>
                  </div>
                )}
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
              />
               <Button onClick={handleAnalyze} disabled={loading || !imagePreview} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? t({ en: "Analyzing...", ml: "വിശകലനം ചെയ്യുന്നു...", hi: "विश्लेषण हो रहा है...", ta: "பகுப்பாய்வு ചെയ്യുന്നു...", te: "విశ్లేషిస్తోంది...", kn: "വിശകലനം ചെയ്യുന്നു...", bn: "تحليل করা হচ্ছে...", mr: "विश्लेषण करत आहे...", gu: "વિશ્લેષણ કરી રહ્યું છે...", pa: "ਵਿਸ਼ਲੇਸ਼ણ ਹੋ ਰਿਹਾ ਹੈ..." }) : t({ en: "Analyze Crop Image", ml: "വിളയുടെ ചിത്രം വിശകലനം ചെയ്യുക", hi: "फसल की छवि का विश्लेषण करें", ta: "பயிர் படத்தை பகுப்பாய்வு செய்யுங்கள்", te: "పంట చిత్రాన్ని విశ్లేషించండి", kn: "ಬೆಳೆ ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ", bn: "ফসলের ছবি বিশ্লেষণ করুন", mr: "पीक प्रतिमा विश्लेषण करा", gu: "પાકની છબીનું વિશ્લેષણ કરો", pa: "ਫਸਲ ਦੀ ਤਸਵੀਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ" })}
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="text-primary" />
                {t({ en: "Analysis Results", ml: "വിശകലന ഫലങ്ങൾ", hi: "विश्लेषण परिणाम", ta: "பகுப்பாய்வு முடிவுகள்", te: "విశ్లేషణ ఫలితాలు", kn: "വിಶ್ಲೇಷಣೆಯ ಫಲಿತಾಂಶಗಳು", bn: "تحليل ফলাফল", mr: "विश्लेषण परिणाम", gu: "વિશ્લેષણ પરિણામો", pa: "ਵਿਸ਼ਲੇਸ਼ਣ ਨਤੀਜੇ" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "Potential diseases or pests and their solutions will be listed here.", ml: "സാധ്യമായ രോഗങ്ങൾ അല്ലെങ്കിൽ കീടങ്ങളും അവയുടെ പരിഹാരങ്ങളും ഇവിടെ പട്ടികപ്പെടുത്തും.", hi: "संभावित बीमारियों या कीटों और उनके समाधान यहां सूचीबद्ध किए जाएंगे।", ta: "சாத்தியமான நோய்கள் அல்லது பூச்சிகள் మరియు వాటి పరిష్కారాలు ఇక్కడ பட்டியலிடப்படும்.", te: "संभाव्य रोग किंवा कीटक आणि त्यांचे उपाय येथे सूचीबद्ध केले जातील.", kn: "ಸંભಾವ್ಯ ರೋಗಗಳು ಅಥವಾ ಕೀಟಗಳು ಮತ್ತು ಅವುಗಳ ಪರಿಹಾರಗಳು ಇಲ್ಲಿ பட்டியಲಿடப்படும்.", bn: "সম্ভাব্য রোগ বা পোকা এবং তাদের সমাধান এখানে তালিকাভুক্ত করা হবে।", mr: "संभाव्य रोग किंवा कीटक आणि त्यांचे उपाय येथे सूचीबद्ध केले जातील.", gu: "સંભવિત રોગો અથવા જીવાતો અને તેમના ઉકેલો અહીં સૂચિબદ્ધ કરવામાં આવશે.", pa: "ਸੰਭਾਵੀ ਬਿਮਾਰੀਆਂ ਜਾਂ ਕੀੜਿਆਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਹੱਲ ਇੱਥੇ ਸੂਚੀਬੱਧ ਕੀਤੇ ਜਾਣਗੇ।" })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {loading && (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-4/5" />
                  <Skeleton className="h-8 w-full" />
                </div>
              )}
              {analysisResult && analysisResult.possibleIssues.length > 0 && (
                 <Accordion type="single" collapsible className="w-full space-y-2">
                  {analysisResult.possibleIssues.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="bg-secondary/50 rounded-lg px-4 border-none">
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">{item.issue}</AccordionTrigger>
                      <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="mb-4 whitespace-pre-wrap">{item.recommendation}</p>
                        
                        <Tabs defaultValue="organic">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="organic">
                              <Leaf className="mr-2 h-4 w-4" />
                              {t({en: "Organic", hi: "जैविक"})}
                            </TabsTrigger>
                            <TabsTrigger value="chemical">
                               <TestTube2 className="mr-2 h-4 w-4" />
                               {t({en: "Chemical", hi: "रासायनिक"})}
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="organic" className="mt-4 space-y-3">
                             {item.organic_solutions.map((sol, i) => (
                               <div key={`org-${i}`}>
                                 <h4 className="font-semibold">{sol.name}</h4>
                                 <p className="whitespace-pre-wrap">{sol.instructions}</p>
                               </div>
                             ))}
                          </TabsContent>
                           <TabsContent value="chemical" className="mt-4 space-y-3">
                             {item.chemical_solutions.map((sol, i) => (
                               <div key={`chem-${i}`}>
                                 <h4 className="font-semibold">{sol.name}</h4>
                                 <p className="whitespace-pre-wrap">{sol.instructions}</p>
                               </div>
                             ))}
                           </TabsContent>
                        </Tabs>

                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
              {!loading && (!analysisResult || analysisResult.possibleIssues.length === 0) && (
                 <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                    <p>{t({ en: "Your analysis results will appear here.", ml: "നിങ്ങളുടെ വിശകലന ഫലങ്ങൾ ഇവിടെ ദൃശ്യമാകും.", hi: "आपके विश्लेषण परिणाम यहां दिखाई देंगे।", ta: "உங்கள் பகுப்பாய்வு முடிவுகள் இங்கே தோன்றும்.", te: "మీ విశ్లేషణ ఫలితాలు ఇక్కడ కనిపిస్తాయి.", kn: "ನಿಮ್ಮ ವಿಶ್ಲೇಷಣೆಯ ఫలిತాలు ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.", bn: "আপনার विश्लेषण ফলাফল এখানে প্রদর্শিত হবে।", mr: "तुमचे विश्लेषण परिणाम येथे दिसतील.", gu: "તમારા વિશ્લેષણ પરિણામો અહીં દેખાશે.", pa: "ਤੁਹਾਡੇ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਤੀਜੇ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ।" })}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
