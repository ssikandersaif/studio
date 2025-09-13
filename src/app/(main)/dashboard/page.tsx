"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  CloudSun,
  DollarSign,
  Mic,
  ScanLine,
  ScrollText,
  Stethoscope,
  Users,
  MessageSquareHeart,
  MessageSquarePlus,
} from "lucide-react"
import { Header } from "@/components/header"
import { useLanguage } from "@/contexts/language-context"

declare global {
  interface Window {
    tidioChat: {
      open: () => void;
      message: (msg: string) => void;
    };
  }
}


export default function DashboardPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [queryOpen, setQueryOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [query, setQuery] = useState("");

  const heroImage = PlaceHolderImages.find((img) => img.id === "farmer-hero")
  const featureImages = {
      market: PlaceHolderImages.find((img) => img.id === "market-prices"),
      weather: PlaceHolderImages.find((img) => img.id === "weather-forecast"),
      doctor: PlaceHolderImages.find((img) => img.id === "crop-doctor"),
      scan: PlaceHolderImages.find((img) => img.id === "scan-crop"),
      voice: PlaceHolderImages.find((img) => img.id === "voice-query"),
      schemes: PlaceHolderImages.find((img) => img.id === "govt-schemes"),
      directory: PlaceHolderImages.find((img) => img.id === "officer-directory"),
  }

  const features = [
    { title: t({ en: "Market Prices", ml: "വിപണി വിലകൾ", hi: "बाजार मूल्य", ta: "சந்தை விலைகள்", te: "మార్కెట్ ధరలు", kn: "ಮಾರುಕಟ್ಟೆ ధరಗಳು", bn: "বাজারদর", mr: "बाजारभाव", gu: "બજારભાવ", pa: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ" }), description: t({ en: "Get real-time crop prices", ml: "തത്സമയ വിള വിലകൾ നേടുക", hi: "वास्तविक समय में फसल की कीमतें प्राप्त करें", ta: "நிகழ்நேர பயிர் விலைகளைப் பெறுங்கள்", te: "వాస్తవ-समय పంట ధరలను పొందండి", kn: "ನೈಜ-ಸಮಯದ ಬೆಳೆ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಿರಿ", bn: "실시간 ফসলের দাম পান", mr: "वास्तविक वेळेतील पिकांचे भाव मिळवा", gu: "વાસ્તવિક સમયના પાકના ભાવ મેળવો", pa: "ਅਸਲ-ਸਮੇਂ ਦੀਆਂ ਫਸਲਾਂ ਦੀਆਂ ਕੀਮatਾਂ ਪ੍ਰਾਪਤ ਕਰੋ" }), href: "/market-prices", icon: <DollarSign className="w-8 h-8 text-primary" />, image: featureImages.market },
    { title: t({ en: "Weather Forecast", ml: "കാലാവസ്ഥാ പ്രവചനം", hi: "मौसम पूर्वानुमान", ta: "வானிலை முன்னறிவிப்பு", te: "వాతావరణ முன்னறிவிப்பு", kn: "ಹವಾಮಾನ وړاندوینه", bn: "আবহাওয়ার পূর্বাভাস", mr: " हवामान अंदाज", gu: "હવામાન આગાહી", pa: "ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ" }), description: t({ en: "Plan ahead with accurate forecasts", ml: "കൃത്യമായ പ്രവചനങ്ങൾ ഉപയോഗിച്ച് മുൻകൂട്ടി ആസൂത്രണം ചെയ്യുക", hi: "सटीक पूर्वानुमानों के साथ आगे की योजना बनाएं", ta: "துல்லியமான முன்னறிவிப்புகளுடன் ముందుగానే திட்டமிடுங்கள்", te: "ఖచ్చితమైన முன்னறிவிப்புகளுடன் ముందుగా ప్లాన్ చేసుకోండి", kn: "ನಿಖರವಾದ وړاندوینهಗಳೊಂದಿಗೆ ముందు ಯೋಜಿಸಿ", bn: "সঠিক পূর্বাভাসের সাথে এগিয়ে পরিকল্পনা করুন", mr: "अचूक अंदाजांसह पुढे योजना करा", gu: "ચોક્કસ આગાહીઓ સાથે આગળની યોજના બનાવો", pa: "ਸਹੀ ਭਵਿੱxਬਾਣੀਆਂ ਨਾਲ ਅੱਗੇ ਦੀ ਯੋਜਨਾ ਬਣਾਓ" }), href: "/weather", icon: <CloudSun className="w-8 h-8 text-primary" />, image: featureImages.weather },
    { title: t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर", ta: "பயிர் மருத்துவர்", te: "పంట மருத்துவர்", kn: "ಬೆಳೆ ವೈದ್ಯ", bn: "ফসল ডাক্তার", mr: "पीक डॉक्टर", gu: "પાક ડોક્ટર", pa: "ਫਸਲ ਡਾਕਟਰ" }), description: t({ en: "Get AI advice for your crops", ml: "നിങ്ങളുടെ വിളകൾക്ക് AI ഉപദേശം നേടുക", hi: "अपनी फसलों के लिए AI सलाह प्राप्त करें", ta: "உங்கள் பயிர்களுக்கு AI ஆலோசனை பெறுங்கள்", te: "మీ పంటలకు AI సలహా పొందండి", kn: "ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ AI ಸಲಹೆ ಪಡೆಯಿರಿ", bn: "আপনার ফসলের জন্য AI পরামর্শ পান", mr: "तुमच्या पिकांसाठी AI सल्ला मिळवा", gu: "તમારા પાક માટે AI સલાહ મેળવો", pa: "ਆਪਣੀਆਂ ਫਸਲਾਂ ਲਈ AI ਸਲਾਹ ਲਓ" }), href: "/crop-doctor", icon: <Stethoscope className="w-8 h-8 text-primary" />, image: featureImages.doctor },
    { title: t({ en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन", ta: "பயிர் స్కాన్", te: "పంట స్కాన్", kn: "ಬೆಳೆ స్కాన్", bn: "ফসল স্ক্যান", mr: "पीक स्कॅन", gu: "પાક સ્કેન", pa: "ਫਸਲ ਸਕੈਨ" }), description: t({ en: "Identify diseases with your camera", ml: "നിങ്ങളുടെ ക്യാമറ ഉപയോഗിച്ച് രോഗങ്ങൾ തിരിച്ചറിയുക", hi: " अपने कैमरे से बीमारियों की पहचान करें", ta: "உங்கள் கேமரா மூலம் நோய்களைக் கண்டறியவும்", te: "మీ కెమెరాతో వ్యాధులను గుర్తించండి", kn: "ನಿಮ್ಮ ಕ್ಯಾಮೆರಾದಿಂದ ರೋಗಗಳನ್ನು ಗುರುತಿಸಿ", bn: "আপনার ক্যামেরা দিয়ে রোগ সনাক্ত করুন", mr: "तुमच्या कॅमेऱ्याने रोग ओळखा", gu: "તમારા કેમેરા વડે રોગોને ઓળખો", pa: "ਆਪਣੇ ਕੈਮਰੇ ਨਾਲ ਬਿਮਾਰੀਆਂ ਦੀ ਪਛਾਣ ਕਰੋ" }), href: "/scan-crop", icon: <ScanLine className="w-8 h-8 text-primary" />, image: featureImages.scan },
    { title: t({ en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न", ta: "குரல் கேள்வி", te: "వాయిస్ ప్రశ్న", kn: "ಧ್ವನಿ ಪ್ರಶ್ನೆ", bn: "ভয়েস কোয়েরি", mr: "आवाज प्रश्न", gu: "અવાજ ક્વેરી", pa: "ਅਵਾਜ਼ ਸਵਾਲ" }), description: t({ en: "Ask questions in your language", ml: "നിങ്ങളുടെ ഭാഷയിൽ ചോദ്യങ്ങൾ ചോദിക്കുക", hi: "अपनी भाषा में प्रश्न पूछें", ta: "உங்கள் மொழியில் கேள்விகளைக் கேளுங்கள்", te: "మీ भाषाలో ప్రశ్నలు అడగండి", kn: "ನಿಮ್ಮ భాషೆಯಲ್ಲಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ", bn: "আপনার ভাষায় প্রশ্ন জিজ্ঞাসা করুন", mr: "तुमच्या भाषेत प्रश्न विचारा", gu: "તમારી ભાષામાં પ્રશ્નો પૂછો", pa: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਵਾਲ ਪੁੱਛੋ" }), href: "/voice-query", icon: <Mic className="w-8 h-8 text-primary" />, image: featureImages.voice },
    { title: t({ en: "Govt. Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं", ta: "அரசு திட்டங்கள்", te: "ప్రభుత్వ పథకాలు", kn: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", bn: "सरकारी योजना", mr: "सरकारी योजना", gu: "સરકારી યોજનાઓ", pa: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ" }), description: t({ en: "Check your eligibility for schemes", ml: "പദ്ധതികൾക്ക് നിങ്ങളുടെ യോഗ്യത പരിശോധിക്കുക", hi: "योजनाओं के लिए अपनी पात्रता जांचें", ta: "திட்டங்களுக்கான உங்கள் தகுதியை சரிபார்க்கவும்", te: "పథకాలకు మీ అర్హతను తనిఖీ చేయండి", kn: "ಯೋਜನೆಗಳಿಗೆ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ", bn: "স্কیمগুলির জন্য আপনার যোগ্যতা जांचুন", mr: "योजनांसाठी तुमची पात्रता तपासा", gu: "યોજનાઓ માટે તમારી યોગ્યતા તપાસો", pa: "ਯੋਜਨਾਵਾਂ ਲਈ ਆਪਣੀ ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ" }), href: "/govt-schemes", icon: <ScrollText className="w-8 h-8 text-primary" />, image: featureImages.schemes },
    { title: t({ en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका", ta: "அதிகாரி டைரக்டरी", te: "అధికారి డైరెక్టరీ", kn: "ಅధికಾರಿ ಡೈರೆಕ್ಟರಿ", bn: "কর্মকর্তা निर्देशिका", mr: "अधिकारी निर्देशिका", gu: "અધિકारी નિર્દેશિકા", pa: "ਅਧਿਕਾਰੀ ਡਾਇਰੈਕਟਰੀ" }), description: t({ en: "Connect with local officers", ml: "പ്രാദേശിക ഉദ്യോഗസ്ഥരുമായി ബന്ധപ്പെടുക", hi: "स्थानीय अधिकारियों से जुड़ें", ta: "உள்ளூர் அதிகாரிகளுடன் இணையுங்கள்", te: "స్థానిక அதிகாரులతో కనెక్ట్ అవ్వండి", kn: "ಸ್ಥಳೀಯ ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ", bn: "স্থানীয় அதிகாரীদের সাথে সংযোগ স্থাপন করুন", mr: "स्थानिक अधिकाऱ्यांशी संपर्क साधा", gu: "સ્થાનિક અધિકારીઓ સાથે જોડાઓ", pa: "ਸਥਾਨਕ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਜੁੜੋ" }), href: "/officer-directory", icon: <Users className="w-8 h-8 text-primary" />, image: featureImages.directory },
  ]

  const handleFeedbackSubmit = () => {
    if (typeof window.tidioChat !== 'undefined') {
        window.tidioChat.open();
        window.tidioChat.message(`Feedback: ${feedback}`);
    }
    toast({
      title: t({ en: "Feedback Submitted", hi: "प्रतिक्रिया सबमिट की गई" }),
      description: t({ en: "Thank you for your feedback!", hi: "आपकी प्रतिक्रिया के लिए धन्यवाद!" }),
    })
    setFeedback("")
    setFeedbackOpen(false)
  }

  const handleQuerySubmit = () => {
    if (typeof window.tidioChat !== 'undefined') {
        window.tidioChat.open();
        window.tidioChat.message(`Query: ${query}`);
    }
    toast({
      title: t({ en: "Query Submitted", hi: "प्रश्न सबमिट किया गया" }),
      description: t({ en: "Your query has been submitted. We will notify you on your provided email.", hi: "आपका प्रश्न सबमिट कर दिया गया है। हम आपको आपके दिए गए ईमेल पर सूचित करेंगे।" }),
    })
    setQuery("")
    setQueryOpen(false)
  }


  return (
    <>
      <Header 
        title={t({ en: "Dashboard", ml: "ഡാഷ്ബോർഡ്", hi: "डैशबोर्ड", ta: "டாஷ்போர்டு", te: "డాష్‌బోర్డ్", kn: "ഡാഷ്ബോർഡ്", bn: "ড্যাশবোর্ড", mr: "डॅशबोर्ड", gu: "ડેશબોર્ડ", pa: "ਡੈਸ਼ਬੋਰਡ" })} 
        description={t({ en: "Welcome to Krishi Mitra, your smart farming assistant.", ml: "കൃഷി മിത്രയിലേക്ക് സ്വാഗതം, നിങ്ങളുടെ സ്മാർട്ട് ഫാമിംഗ് അസിസ്റ്റന്റ്.", hi: "कृषि मित्र में आपका स्वागत है, आपका स्मार्ट खेती सहायक।", ta: "கிருஷி மித்ராவுக்கு வரவேற்கிறோம், உங்கள் ஸ்மார்ட் விவசாய உதவியாளர்.", te: "కృషి మిత్రకు స్వాగతం, మీ స్మార్ట్ వ్యవసాయ సహాయకుడు.", kn: "ಕೃಷಿ ಮಿತ್ರಾಗೆ ಸ್ವಾಗತ, ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮಿಂಗ್ ಸಹಾಯಕ.", bn: "কৃষি মিত্র-তে স্বাগতম, আপনার স্মার্ট চাষের সহায়ক।", mr: "कृषि मित्रामध्ये आपले स्वागत आहे, तुमचा स्मार्ट शेती सहाय्यक.", gu: "કૃષિ મિત્રામાં આપનું સ્વાગત છે, તમારો સ્માર્ટ ખેતી સહાયક.", pa: "ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ, ਤੁਹਾਡਾ ਸਮਾਰਟ ਖੇਤੀ ਸਹਾਇਕ।" })}
      />
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-8 sm:py-6 md:gap-8">
        <Card className="overflow-hidden shadow-lg">
          <div className="relative h-60 w-full">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h2 className="text-3xl font-bold text-white font-headline">
                {t({ en: "Empowering Indian Farmers with AI", ml: "AI ഉപയോഗിച്ച് ഇന്ത്യൻ കർഷകരെ ശാക്തീകരിക്കുന്നു", hi: "AI के साथ भारतीय किसानों को सशक्त बनाना", ta: "AI மூலம் இந்திய விவசாயிகளை மேம்படுத்துதல்", te: "AI తో భారతీయ రైతులను सशक्तం చేయడం", kn: "AI ಯೊಂದಿಗೆ ಭಾರತೀಯ ರೈತರನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು", bn: "এআই দিয়ে भारतीय किसानोंকে सशक्त করা", mr: "एआय सह भारतीय शेतकऱ्यांना सक्षम करणे", gu: "AI વડે ભારતીય ખેડૂતોને સશક્તિકरण", pa: "AI ਨਾਲ ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ" })}
              </h2>
              <p className="text-lg text-gray-200">
                {t({ en: "Get instant advice, market data, and weather updates.", ml: "തൽക്ഷണ ഉപദേശം, മാർക്കറ്റ് ഡാറ്റ, കാലാവസ്ഥാ അപ്‌ഡേറ്റുകൾ എന്നിവ നേടുക.", hi: "तुरंत सलाह, बाजार डेटा और मौसम अपडेट प्राप्त करें।", ta: "உடனடி ஆலோசனை, சந்தை தரவு மற்றும் வானிலை புதுப்பிப்புகளைப் பெறுங்கள்.", te: "తక్షణ సలహా, మార్కెట్ డేటా మరియు వాతావరణ నవీకరణలను పొందండి.", kn: "ತక్షణ ಸಲಹೆ, ಮಾರುಕಟ್ಟೆ ಡೇಟਾ ಮತ್ತು ಹವಾಮಾನ ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ.", bn: "तत्काल পরামর্শ, বাজার ডেটা এবং আবহাওয়ার আপডেট পান।", mr: "त्वरित सल्ला, बाजार डेटा आणि हवामान अद्यतने मिळवा.", gu: "તાત્કાલિક સલાહ, બજાર ડેટા અને હવામાન અપડેટ્સ મેળવો.", pa: "ਤੁਰੰਤ ਸਲਾਹ, ਮਾਰਕੀਟ ਡੇਟਾ, ਅਤੇ ਮੌਸਮ ਅਪਡੇਟਸ ਪ੍ਰਾਪਤ ਕਰੋ।" })}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title}>
                <Card className="group h-full flex flex-col hover:border-primary hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="font-headline">{feature.title}</CardTitle>
                            {feature.icon}
                        </div>
                        <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                       <div className="relative aspect-video w-full overflow-hidden rounded-md">
                         {feature.image && (
                           <Image
                             src={feature.image.imageUrl}
                             alt={feature.image.description}
                             fill
                             className="object-cover transition-transform duration-300 group-hover:scale-105"
                             data-ai-hint={feature.image.imageHint}
                           />
                         )}
                       </div>
                    </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </main>

       <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="rounded-full w-16 h-16 shadow-lg" aria-label="Submit Feedback">
                    <MessageSquareHeart className="w-8 h-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t({ en: "Submit Feedback", hi: "प्रतिक्रिया सबमिट करें" })}</DialogTitle>
                    <DialogDescription>
                        {t({ en: "Help us improve Krishi Mitra by sharing your thoughts.", hi: "अपने विचार साझा करके कृषि मित्र को बेहतर बनाने में हमारी मदद करें।" })}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Textarea 
                        placeholder={t({ en: "Type your feedback here...", hi: "अपनी प्रतिक्रिया यहाँ लिखें..." })}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleFeedbackSubmit} disabled={!feedback.trim()}>
                        {t({ en: "Submit", hi: "सबमिट करें" })}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
        <Dialog open={queryOpen} onOpenChange={setQueryOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="rounded-full w-16 h-16 shadow-lg" aria-label="Submit a Query">
                    <MessageSquarePlus className="w-8 h-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t({ en: "Submit a Query", hi: "एक प्रश्न सबमिट करें" })}</DialogTitle>
                    <DialogDescription>
                        {t({ en: "Have a question for our experts? Ask away!", hi: "हमारे विशेषज्ञों के लिए कोई प्रश्न है? पूछें!" })}
                    </DialogDescription>
                </DialogHeader>
                 <div className="py-4">
                    <Textarea 
                        placeholder={t({ en: "Type your query here...", hi: "अपना प्रश्न यहाँ लिखें..." })}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleQuerySubmit} disabled={!query.trim()}>
                        {t({ en: "Send Query", hi: "प्रश्न भेजें" })}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

    