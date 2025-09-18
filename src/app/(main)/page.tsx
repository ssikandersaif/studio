
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { useLanguage } from "@/contexts/language-context";
import { placeholderImages } from '@/lib/placeholder-images.json';
import { DashboardChart } from "@/components/dashboard-chart";
import { AnimatedGrid } from "@/components/animated-grid";
import { Footer } from "@/components/footer";
import {
    Mic,
    MessageCircle,
    ScrollText,
    Users,
    HelpCircle,
    NotebookPen,
    ArrowRight,
    Stethoscope,
    ScanLine,
    BarChart
} from "lucide-react";
import { WeatherSummaryCard } from "@/components/weather-summary-card";
import { PriceTrendCard } from "@/components/price-trend-card";
import { Button } from "@/components/ui/button";

const secondaryFeatures = [
   {
    title: { en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न", ta: "குரல் கேள்வி", te: "వాయిస్ క్వెరీ", kn: "ಧ್ವನಿ ಪ್ರಶ್ನೆ", bn: "ভয়েস ক্যোয়ারী", mr: "व्हॉइस क्वेरी", gu: "વોઇસ ક્વેરી", pa: "ਵੌਇਸ ਸਵਾਲ" },
    description: { en: "Ask questions in your language.", ml: "നിങ്ങളുടെ ഭാഷയിൽ ചോദ്യങ്ങൾ ചോദിക്കുക.", hi: "अपनी भाषा में प्रश्न पूछें।", ta: "உங்கள் மொழியில் கேள்விகளைக் கேளுங்கள்.", te: "మీ భాషలో ప్రశ్నలు అడగండి.", kn: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.", bn: "আপনার ভাষায় প্রশ্ন জিজ্ঞাসা করুন।", mr: "तुमच्या भाषेत प्रश्न विचारा.", gu: "તમારી ભાષામાં પ્રશ્નો પૂછો.", pa: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਵਾਲ ਪੁੱਛੋ।" },
    href: "/voice-query",
    icon: Mic,
    imageId: "voice-query"
  },
  {
    title: { en: "Talk to AI", hi: "एआई से बात करें", ml: "AI-യോട് സംസാരിക്കുക", ta: "AI உடன் பேசுங்கள்", te: "AIతో మాట్లాడండి", kn: "AI ಜೊತೆ ಮಾತನಾಡಿ", bn: "এআই এর সাথে কথা বলুন", mr: "एआयशी बोला", gu: "AI સાથે વાત કરો", pa: "AI ਨਾਲ ਗੱਲ ਕਰੋ" },
    description: { en: "General chat with AI assistant.", hi: "एआई सहायक के साथ सामान्य चैट।", ml: "AI അസിസ്റ്റന്റുമായി പൊതുവായ ചാറ്റ്.", ta: "AI உதவியாளருடன் பொதுவான அரட்டை.", te: "AI సహాయకుడితో సాధారణ చాట్.", kn: "AI ಸಹಾಯಕರೊಂದಿಗೆ ಸಾಮಾನ್ಯ ಚಾಟ್.", bn: "এআই সহকারীর সাথে সাধারণ চ্যাট।", mr: "एआय सहाय्यकाशी सामान्य गप्पा.", gu: "AI સહાયક સાથે સામાન્ય ચેટ.", pa: "AI ਸਹਾਇਕ ਨਾਲ ਆਮ ਗੱਲਬਾਤ।" },
    href: "/talk-to-ai",
    icon: MessageCircle,
    imageId: "talk-to-ai"
  },
   {
    title: { en: "Farm Diary", hi: "फार्म डायरी", ml: "ഫാം ഡയറി", ta: "பண்ணை நாட்குறிப்பு", te: "ఫార్మ్ డైరీ", kn: "ಫಾರ್ಮ್ ಡೈರಿ", bn: "খামার ডায়েরি", mr: "फार्म डायरी", gu: "ફાર્મ ડાયરી", pa: "ਫਾਰਮ ਡਾਇਰੀ" },
    description: { en: "Log your farming activities.", hi: "अपनी खेती की गतिविधियों को लॉग करें।", ml: "നിങ്ങളുടെ കാർഷിക പ്രവർത്തനങ്ങൾ രേഖപ്പെടുത്തുക.", ta: "உங்கள் விவசாய நடவடிக்கைகளை பதிவு செய்யவும்.", te: "మీ వ్యవసాయ కార్యకలాపాలను లాగ్ చేయండి.", kn: "ನಿಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಲಾಗ್ ಮಾಡಿ.", bn: "আপনার কৃষি কার্যক্রম লগ করুন।", mr: "तुमच्या शेतीच्या कामांची नोंद करा.", gu: "તમારી ખેતીની પ્રવૃત્તિઓ લોગ કરો.", pa: "ਆਪਣੀਆਂ ਖੇਤੀ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਨੂੰ ਲੌਗ ਕਰੋ।" },
    href: "/farm-diary",
    icon: NotebookPen,
    imageId: "farm-diary"
  },
  {
    title: { en: "Analytics", ml: "വിശകലനം", hi: "विश्लेषण" },
    description: { en: "View crop production trends.", ml: "വിള ഉത്പാദന പ്രവണതകൾ കാണുക.", hi: "फसल उत्पादन के रुझान देखें।" },
    href: "/analytics",
    icon: BarChart,
    imageId: "market-prices" // Re-using an image for now
  },
  {
    title: { en: "Govt. Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं", ta: "அரசு திட்டங்கள்", te: "ప్రభుత్వ పథకాలు", kn: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", bn: "সরকারি প্রকল্প", mr: "सरकारी योजना", gu: "સરકારી યોજનાઓ", pa: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ" },
    description: { en: "Find eligible government schemes.", ml: "യോഗ്യമായ സർക്കാർ പദ്ധതികൾ കണ്ടെത്തുക.", hi: "योग्य सरकारी योजनाएं खोजें।", ta: "தகுதியான அரசாங்க திட்டங்களைக் கண்டறியவும்.", te: "అర్హతగల ప్రభుత్వ పథకాలను కనుగొనండి.", kn: "ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ.", bn: "যোগ্য সরকারি প্রকল্প খুঁজুন।", mr: "पात्र सरकारी योजना शोधा.", gu: "યોગ્ય સરકારી યોજનાઓ શોધો.", pa: "ਯੋਗ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭੋ।" },
    href: "/govt-schemes",
    icon: ScrollText,
    imageId: "govt-schemes"
  },
  {
    title: { en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका", ta: "அதிகாரி அடைவு", te: "అధికారి డైరెక్టరీ", kn: "ಅಧಿಕಾರಿ ಡೈರೆಕ್ಟರಿ", bn: "অফিসার ডিরেক্টরি", mr: "अधिकारी निर्देशिका", gu: "અધિકારી ડિરેક્ટરી", pa: "ਅਫਸਰ ਡਾਇਰੈਕਟਰੀ" },
    description: { en: "Connect with local officers.", ml: "പ്രാദേശിക ഉദ്യോഗസ്ഥരുമായി ബന്ധപ്പെടുക.", hi: "स्थानीय अधिकारियों से जुड़ें।", ta: "உள்ளூர் அதிகாரிகளுடன் இணையுங்கள்.", te: "స్థానిక అధికారులతో కనెక్ట్ అవ్వండి.", kn: "ಸ್ಥಳೀಯ ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.", bn: "স্থানীয় அதிகாரীদের সাথে সংযোগ করুন।", mr: "स्थानिक अधिकाऱ्यांशी संपर्क साधा.", gu: "સ્થાનિક અધિકારીઓ સાથે જોડાઓ.", pa: "ਸਥਾਨਕ ਅਫਸਰਾਂ ਨਾਲ ਜੁੜੋ।" },
    href: "/officer-directory",
    icon: Users,
    imageId: "officer-directory"
  },
  {
    title: { en: "FAQ", ml: "പതിവുചോദ്യങ്ങൾ", hi: "सामान्य प्रश्न", ta: "அடிக்கடி கேட்கப்படும் கேள்விகள்", te: "తరచుగా అడిగే ప్రశ్నలు", kn: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು", bn: "সাধারণ জিজ্ঞাসিত প্রশ্ন", mr: "वारंवार विचारले जाणारे प्रश्न", gu: "વારંવાર પૂછાતા પ્રશ્નો", pa: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ" },
    description: { en: "Find answers to common questions.", ml: "പൊതുവായ ചോദ്യങ്ങൾക്ക് ഉത്തരം കണ്ടെത്തുക.", hi: "सामान्य प्रश्नों के उत्तर खोजें।", ta: "பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியவும்.", te: "సాధారణ ప్రశ్నలకు సమాధానాలను కనుగొనండి.", kn: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಹುಡುಕಿ.", bn: "সাধারণ প্রশ্নের উত্তর খুঁজুন।", mr: "सामान्य प्रश्नांची उत्तरे शोधा.", gu: "સામાન્ય પ્રશ્નોના જવાબ શોધો.", pa: "ਆਮ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਲੱਭੋ।" },
    href: "/faq",
    icon: HelpCircle,
    imageId: "faq"
  },
];


export default function DashboardPage() {
  const { t } = useLanguage();
  const heroImage = placeholderImages.find(img => img.id === 'farmer-hero');
  const featureImages = new Map(placeholderImages.map(img => [img.id, img]));


  return (
    <>
      <Header
        title={t({ en: "Dashboard", ml: "ഡാഷ്ബോർഡ്", hi: "डैशबोर्ड", ta: "டாஷ்போர்டு", te: "డాష్‌బోర్డ్", kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", bn: "ড্যাশবোর্ড", mr: "डॅशबोर्ड", gu: "ડેશબોર્ડ", pa: "ਡੈਸ਼ਬੋਰਡ" })}
        description={t({
          en: "Welcome to your AI-powered farming companion.",
          ml: "നിങ്ങളുടെ AI- പവർ ചെയ്യുന്ന കാർഷിക കൂട്ടാളിയിലേക്ക് സ്വാഗതം.",
          hi: "आपके AI-संचालित खेती सहयोगी में आपका स्वागत है।",
          ta: "உங்கள் AI-இயங்கும் விவசாய துணைக்கு வரவேற்கிறோம்.",
          te: "మీ AI-ఆధారిత వ్యవసాయ సహచరునికి స్వాగతం.",
          kn: "ನಿಮ್ಮ AI-ಚಾಲಿತ ಕೃಷಿ ಸಂಗಾತಿಗೆ ಸ್ವಾಗತ.",
          bn: "আপনার এআই-চালিত কৃষি সঙ্গীতে স্বাগতম।",
          mr: "तुमच्या AI-चालित शेती साथीदाराकडे स्वागत आहे.",
          gu: "તમારા AI-સંચાલિત ખેતી સાથીમાં આપનું સ્વાગત છે.",
          pa: "ਤੁਹਾਡੇ AI-ਸੰਚਾਲਿਤ ਖੇਤੀ ਸਾਥੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।"
        })}
      />

      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8">
           {heroImage && (
            <Card className="overflow-hidden shadow-lg border-none">
                <div className="relative h-48 sm:h-64">
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={heroImage.imageHint}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                        <h1 className="text-2xl sm:text-4xl font-bold text-white font-headline">
                        {t({ en: "Empowering Indian Agriculture", hi: "भारतीय कृषि को सशक्त बनाना", ml: "ഇന്ത്യൻ കാർഷികരംഗത്തെ ശാക്തീകരിക്കുന്നു", ta: "இந்திய விவசாயத்தை மேம்படுத்துதல்", te: "భారతీయ వ్యవసాయాన్ని శక్తివంతం చేయడం", kn: "ಭಾರತೀಯ ಕೃಷಿಯನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು", bn: "ভারতীয় কৃষি ক্ষমতায়ন", mr: "भारतीय शेतीला सक्षम बनवणे", gu: "ભારતીય કૃષિને સશક્ત બનાવવી", pa: "ਭਾਰਤੀ ਖੇਤੀਬਾੜੀ ਨੂੰ ਸ਼ਕਤੀਕਰਨ" })}
                        </h1>
                        <p className="text-white/90 mt-1 sm:mt-2 max-w-2xl">
                        {t({ en: "Your one-stop solution for smart farming decisions.", hi: "स्मार्ट खेती के निर्णयों के लिए आपका वन-स्टॉप समाधान।", ml: "സ്മാർട്ട് ഫാമിംഗ് തീരുമാനങ്ങൾക്കുള്ള നിങ്ങളുടെ ഏകജാലക പരിഹാരം.", ta: "திறமையான விவசாய முடிவுகளுக்கான உங்கள் ஒரே தீர்வு.", te: "స్మార్ట్ వ్యవసాయ నిర్ణయాల కోసం మీ వన్-స్టాప్ పరిష్కారం.", kn: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ನಿರ್ಧಾರಗಳಿಗಾಗಿ ನಿಮ್ಮ ಒಂದು-ನಿಲ್ಲುವ ಪರಿಹಾರ.", bn: "স্মার্ট কৃষি সিদ্ধান্তের জন্য আপনার ওয়ান-স্টপ সমাধান।", mr: "स्मार्ट शेतीच्या निर्णयासाठी तुमचे एक-स्टॉप समाधान.", gu: "સ્માર્ટ ખેતીના નિર્ણયો માટે તમારું વન-સ્ટોપ સોલ્યુશન.", pa: "ਸਮਾਰਟ ਖੇਤੀ ਦੇ ਫੈਸਲਿਆਂ ਲਈ ਤੁਹਾਡਾ ਇੱਕ-ਸਟਾਪ ਹੱਲ।" })}
                        </p>
                    </div>
                </div>
            </Card>
           )}

            <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <WeatherSummaryCard />
                 <PriceTrendCard />
                 <Link href="/scan-crop" className="block group">
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between relative">
                        <Image
                            src={featureImages.get("scan-crop")?.imageUrl || ''}
                            alt={featureImages.get("scan-crop")?.description || ''}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 z-0"
                            data-ai-hint={featureImages.get("scan-crop")?.imageHint}
                        />
                         <div className="absolute inset-0 bg-black/50 z-10" />
                         <div className="relative z-20 flex flex-col justify-between h-full p-6 text-white">
                            <div>
                                <div className="p-3 rounded-full bg-white/20 w-fit mb-2"><ScanLine size={24} /></div>
                                <CardTitle className="font-headline">{t({ en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन", ta: "பயிர் ஸ்கேன்", te: "పంటను స్కాన్ చేయండి", kn: "ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ", bn: "ফসল স্ক্যান করুন", mr: "पीक स्कॅन करा", gu: "પાક સ્કેન કરો", pa: "ਫਸਲ ਸਕੈਨ ਕਰੋ" })}</CardTitle>
                                <p className="text-white/80 mt-1">{t({ en: "Identify crop diseases and pests instantly using your phone's camera.", hi: "अपने फोन के कैमरे का उपयोग करके फसल रोगों और कीटों की तुरंत पहचान करें।", ml: "നിങ്ങളുടെ ഫോണിന്റെ ക്യാമറ ഉപയോഗിച്ച് വിള രോഗങ്ങളും കീടങ്ങളും തൽക്ഷണം തിരിച്ചറിയുക.", ta: "உங்கள் தொலைபேசியின் கேமராவைப் பயன்படுத்தி பயிர் நோய்கள் மற்றும் பூச்சிகளை உடனடியாக அடையாளம் காணவும்.", te: "మీ ఫోన్ కెమెరాను ఉపయోగించి పంట వ్యాధులు మరియు తెగుళ్లను తక్షణమే గుర్తించండి.", kn: "ನಿಮ್ಮ ಫೋನ್‌ನ ಕ್ಯಾಮರಾವನ್ನು ಬಳಸಿಕೊಂಡು ಬೆಳೆ ರೋಗಗಳು ಮತ್ತು ಕೀਟಗಳನ್ನು ತಕ್ಷಣವೇ ಗುರುತಿಸಿ.", bn: "আপনার ফোনের ক্যামেরা ব্যবহার করে ফসলের রোগ ও কীটপতঙ্গ সঙ্গে সঙ্গে শনাক্ত করুন।", mr: "तुमच्या फोनच्या कॅमेराचा वापर करून पिकांचे रोग आणि कीड त्वरित ओळखा.", gu: "તમારા ફોનના કેમેરાનો ઉપયોગ કરીને પાકના રોગો અને જીવાતોને તરત જ ઓળખો.", pa: "ਆਪਣੇ ਫ਼ੋਨ ਦੇ ਕੈਮਰੇ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਅਤੇ ਕੀੜਿਆਂ ਦੀ ਤੁਰੰਤ ਪਛਾਣ ਕਰੋ।"})}</p>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-white justify-start">{t({en: "Scan Now", hi: "अभी स्कैन करें", ml: "ഇപ്പോൾ സ്കാൻ ചെയ്യുക", ta: "இப்போது ஸ்கேன் செய்யவும்", te: "ఇప్పుడు స్కాన్ చేయండి", kn: "ಈಗ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ", bn: "এখন স্ক্যান করুন", mr: "आता स्कॅन करा", gu: "હમણાં સ્કેન કરો", pa: "ਹੁਣੇ ਸਕੈਨ ਕਰੋ"})}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </div>
                    </Card>
                 </Link>
                 <Link href="/crop-doctor" className="block group">
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between relative">
                         <Image
                            src={featureImages.get("crop-doctor")?.imageUrl || ''}
                            alt={featureImages.get("crop-doctor")?.description || ''}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 z-0"
                            data-ai-hint={featureImages.get("crop-doctor")?.imageHint}
                        />
                         <div className="absolute inset-0 bg-black/50 z-10" />
                         <div className="relative z-20 flex flex-col justify-between h-full p-6 text-white">
                            <div>
                                <div className="p-3 rounded-full bg-white/20 w-fit mb-2"><Stethoscope size={24} /></div>
                                <CardTitle className="font-headline">{t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर", ta: "பயிர் மருத்துவர்", te: "పంట వైద్యుడు", kn: "ಬೆಳೆ ವೈದ್ಯ", bn: "ফসল ডাক্তার", mr: "पीक डॉक्टर", gu: "પાક ડોક્ટર", pa: "ਫਸਲ ਡਾਕਟਰ" })}</CardTitle>
                                <p className="text-white/80 mt-1">{t({ en: "Get expert AI advice for any farming problem or question you have.", hi: "अपनी किसी भी कृषि समस्या या प्रश्न के लिए विशेषज्ञ एआई सलाह प्राप्त करें।", ml: "നിങ്ങൾക്കുള്ള ഏത് കാർഷിക പ്രശ്നത്തിനോ ചോദ്യത്തിനോ വിദഗ്ദ്ധ AI ഉപദേശം നേടുക.", ta: "உங்களிடம் உள்ள எந்த விவசாய பிரச்சனை அல்லது கேள்விக்கும் நிபுணர் AI ஆலோசனையைப் பெறுங்கள்.", te: "మీకున్న ఏ వ్యవసాయ సమస్య లేదా ప్రశ్నకు నిపుణులైన AI సలహా పొందండి.", kn: "ನಿಮಗಿರುವ ಯಾವುದೇ ಕೃಷಿ ಸಮಸ್ಯೆ ಅಥವಾ ಪ್ರಶ್ನೆಗೆ ತಜ್ಞ AI ಸಲಹೆ ಪಡೆಯಿರಿ.", bn: "আপনার যেকোনো কৃষি সমস্যা বা প্রশ্নের জন্য বিশেষজ্ঞ এআই পরামর্শ নিন।", mr: "तुमच्या कोणत्याही शेतीच्या समस्येसाठी किंवा प्रश्नासाठी तज्ञ एआय सल्ला मिळवा.", gu: "તમારી કોઈપણ ખેતી સમસ્યા અથવા પ્રશ્ન માટે નિષ્ણાત AI સલાહ મેળવો.", pa: "ਆਪਣੀ ਕਿਸੇ ਵੀ ਖੇਤੀ ਸਮੱਸਿਆ ਜਾਂ ਸਵਾਲ ਲਈ ਮਾਹਰ AI ਸਲਾਹ ਲਓ।"})}</p>
                            </div>
                           <Button variant="link" className="p-0 h-auto text-white justify-start">{t({en: "Ask Question", hi: "प्रश्न पूछें", ml: "ചോദ്യം ചോദിക്കുക", ta: "கேள்வி கேளுங்கள்", te: "ప్రశ్న అడగండి", kn: "ಪ್ರಶ್ನೆ ಕೇಳಿ", bn: "প্রশ্ন করুন", mr: "प्रश्न विचारा", gu: "પ્રશ્ન પૂછો", pa: "ਸਵਾਲ ਪੁੱਛੋ"})}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </div>
                    </Card>
                 </Link>
            </AnimatedGrid>

            <div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold font-headline text-primary">{t({ en: "More Tools & Resources", hi: "और उपकरण और संसाधन", ml: "കൂടുതൽ ഉപകരണങ്ങളും വിഭവങ്ങളും", ta: "மேலும் கருவிகள் & ஆதாரங்கள்", te: "మరిన్ని సాధనాలు & వనరులు", kn: "ಹೆಚ್ಚಿನ ಉಪಕರಣಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು", bn: "আরও সরঞ্জাম ও সম্পদ", mr: "अधिक साधने आणि संसाधने", gu: "વધુ સાધનો અને સંસાધનો", pa: "ਹੋਰ ਟੂਲ ਅਤੇ ਸਰੋਤ" })}</h2>
                    <p className="text-muted-foreground">{t({ en: "Explore other features to help you on your farm.", hi: "अपने खेत में आपकी मदद करने के लिए अन्य सुविधाओं का अन्वेषण करें।", ml: "നിങ്ങളുടെ ഫാമിൽ നിങ്ങളെ സഹായിക്കുന്ന മറ്റ് ഫീച്ചറുകൾ പര്യവേക്ഷണം ചെയ്യുക.", ta: "உங்கள் பண்ணையில் உங்களுக்கு உதவும் பிற அம்சங்களை ஆராயுங்கள்.", te: "మీ పొలంలో మీకు సహాయపడటానికి ఇతర లక్షణాలను అన్వేషించండి.", kn: "ನಿಮ್ಮ ಫಾರ್ಮ್‌ನಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಇತರ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.", bn: "আপনার খামারে আপনাকে সাহায্য করার জন্য অন্যান্য বৈশিষ্ট্যগুলি অন্বেষণ করুন।", mr: "तुमच्या शेतात तुम्हाला मदत करण्यासाठी इतर वैशिष्ट्ये एक्सप्लोर करा.", gu: "તમારા ફાર્મ પર તમને મદદ કરવા માટે અન્ય સુવિધાઓનું અન્વેષણ કરો.", pa: "ਆਪਣੇ ਖੇਤ 'ਤੇ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਹੋਰ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦੀ ਪੜਚੋਲ ਕਰੋ।" })}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {secondaryFeatures.map((feature) => {
                       const image = featureImages.get(feature.imageId);
                       return (
                           <Link href={feature.href} key={feature.href} className="block group">
                                <Card className="relative overflow-hidden h-40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    {image && (
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.description}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={image.imageHint}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/50" />
                                    <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                                        <div>
                                            <div className="p-2 rounded-full bg-white/20 w-fit mb-2">
                                                <feature.icon size={20} />
                                            </div>
                                            <h3 className="font-bold text-lg">{t(feature.title)}</h3>
                                        </div>
                                        <p className="text-xs text-white/80">{t(feature.description)}</p>
                                    </div>
                                    <ArrowRight className="absolute top-4 right-4 h-5 w-5 text-white/50 transition-transform duration-300 group-hover:translate-x-1" />
                                </Card>
                           </Link>
                       )
                    })}
                </div>
            </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
