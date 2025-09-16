"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import PlaceHolderImagesData from "@/lib/placeholder-images.json"
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
  HelpCircle,
  MessageCircle,
} from "lucide-react"
import { Header } from "@/components/header"
import { useLanguage } from "@/contexts/language-context"
import { AnimatedGrid } from "@/components/animated-grid"
import { DashboardChart } from "@/components/dashboard-chart"
import { Footer } from "@/components/footer"

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

  const { placeholderImages: PlaceHolderImages } = PlaceHolderImagesData;

  const heroImage = PlaceHolderImages.find((img) => img.id === "farmer-hero")
  const featureImages = {
      market: PlaceHolderImages.find((img) => img.id === "market-prices"),
      weather: PlaceHolderImages.find((img) => img.id === "weather-forecast"),
      doctor: PlaceHolderImages.find((img) => img.id === "crop-doctor"),
      scan: PlaceHolderImages.find((img) => img.id === "scan-crop"),
      voice: PlaceHolderImages.find((img) => img.id === "voice-query"),
      schemes: PlaceHolderImages.find((img) => img.id === "govt-schemes"),
      directory: PlaceHolderImages.find((img) => img.id === "officer-directory"),
      faq: PlaceHolderImages.find((img) => img.id === "faq"),
      ai: PlaceHolderImages.find((img) => img.id === "talk-to-ai"),
  }

  const features = [
    { title: t({ en: "Market Prices", ml: "വിപണി വിലകൾ", hi: "बाजार मूल्य" }), description: t({ en: "Get real-time crop prices", ml: "തത്സമയ വിള വിലകൾ നേടുക", hi: "वास्तविक समय में फसल की कीमतें प्राप्त करें" }), href: "/market-prices", icon: <DollarSign className="w-8 h-8 text-primary" />, image: featureImages.market },
    { title: t({ en: "Weather Forecast", ml: "കാലാവസ്ഥാ പ്രവചനം", hi: "मौसम पूर्वानुमान" }), description: t({ en: "Plan ahead with accurate forecasts", ml: "കൃത്യമായ പ്രവചനങ്ങൾ ഉപയോഗിച്ച് മുൻകൂട്ടി ആസൂത്രണം ചെയ്യുക", hi: "सटीक पूर्वानुमानों के साथ आगे की योजना बनाएं" }), href: "/weather", icon: <CloudSun className="w-8 h-8 text-primary" />, image: featureImages.weather },
    { title: t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर" }), description: t({ en: "Get AI advice for your crops", ml: "നിങ്ങളുടെ വിളകൾക്ക് AI ഉപദേശം നേടുക", hi: "अपनी फसलों के लिए AI सलाह प्राप्त करें" }), href: "/crop-doctor", icon: <Stethoscope className="w-8 h-8 text-primary" />, image: featureImages.doctor },
    { title: t({ en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन" }), description: t({ en: "Identify diseases with your camera", ml: "നിങ്ങളുടെ ക്യാമറ ഉപയോഗിച്ച് രോഗങ്ങൾ തിരിച്ചറിയുക", hi: " अपने कैमरे से बीमारियों की पहचान करें" }), href: "/scan-crop", icon: <ScanLine className="w-8 h-8 text-primary" />, image: featureImages.scan },
    { title: t({ en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न" }), description: t({ en: "Ask questions in your language", ml: "നിങ്ങളുടെ ഭാഷയിൽ ചോദ്യങ്ങൾ ചോദിക്കുക", hi: "अपनी भाषा में प्रश्न पूछें" }), href: "/voice-query", icon: <Mic className="w-8 h-8 text-primary" />, image: featureImages.voice },
    { title: t({ en: "Govt. Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं" }), description: t({ en: "Check your eligibility for schemes", ml: "പദ്ധതികൾക്ക് നിങ്ങളുടെ യോഗ്യത പരിശോധിക്കുക", hi: "योजनाओं के लिए अपनी पात्रता जांचें" }), href: "/govt-schemes", icon: <ScrollText className="w-8 h-8 text-primary" />, image: featureImages.schemes },
    { title: t({ en: "Talk to AI", hi: "एआई से बात करें" }), description: t({ en: "Have a general chat with the AI", hi: "एआई के साथ सामान्य चैट करें" }), href: "/talk-to-ai", icon: <MessageCircle className="w-8 h-8 text-primary" />, image: featureImages.ai },
    { title: t({ en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका" }), description: t({ en: "Connect with local officers", ml: "പ്രാദേശിക ഉദ്യോഗസ്ഥരുമായി ബന്ധപ്പെടുക", hi: "स्थानीय अधिकारियों से जुड़ें" }), href: "/officer-directory", icon: <Users className="w-8 h-8 text-primary" />, image: featureImages.directory },
    { title: t({ en: "FAQ", ml: "പതിവുചോദ്യങ്ങൾ", hi: "सामान्य प्रश्न" }), description: t({ en: "Find answers to common questions", ml: "സാധാരണ ചോദ്യങ്ങൾക്ക് ഉത്തരം കണ്ടെത്തുക", hi: "सामान्य प्रश्नों के उत्तर खोजें" }), href: "/faq", icon: <HelpCircle className="w-8 h-8 text-primary" />, image: featureImages.faq },
  ]

  const handleFeedbackSubmit = () => {
    if (typeof window.tidioChat !== 'undefined' && window.tidioChat) {
        window.tidioChat.open();
        setTimeout(() => {
          window.tidioChat.message(`Feedback: ${feedback}`);
        }, 500);
    }
    toast({
      title: t({ en: "Feedback Submitted", hi: "प्रतिक्रिया सबमिट की गई" }),
      description: t({ en: "Thank you for your feedback!", hi: "आपकी प्रतिक्रिया के लिए धन्यवाद!" }),
    })
    setFeedback("")
    setFeedbackOpen(false)
  }

  const handleQuerySubmit = () => {
    if (typeof window.tidioChat !== 'undefined' && window.tidioChat) {
        window.tidioChat.open();
        setTimeout(() => {
            window.tidioChat.message(`Query: ${query}`);
        }, 500);
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
      <div className="flex-grow">
        <Header 
          title={t({ en: "Dashboard", ml: "ഡാഷ്ബോർഡ്", hi: "डैशबोर्ड" })} 
          description={t({ en: "Welcome to Krishi Mitra, your smart farming assistant.", ml: "കൃഷി മിത്രയിലേക്ക് സ്വാഗതം, നിങ്ങളുടെ സ്മാർട്ട് ഫാമിംഗ് അസിസ്റ്റന്റ്.", hi: "कृषि मित्र में आपका स्वागत है, आपका स्मार्ट खेती सहायक।" })}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-8 sm:py-6 md:gap-8">
           <div className="grid gap-6 md:grid-cols-5">
            <Card className="group overflow-hidden shadow-lg border-none md:col-span-3 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative h-60 sm:h-72 md:h-full w-full">
                {heroImage && (
                    <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    data-ai-hint={heroImage.imageHint}
                    priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-headline" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
                    {t({ en: "Empowering Indian Farmers with AI", ml: "AI ഉപയോഗിച്ച് ഇന്ത്യൻ കർഷകരെ ശാക്തീകരിക്കുന്നു", hi: "AI के साथ भारतीय किसानों को सशक्त बनाना" })}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    {t({ en: "Get instant advice, market data, and weather updates.", ml: "തൽക്ഷണ ഉപദേശം, മാർക്കറ്റ് ഡാറ്റ, കാലാവസ്ഥാ അപ്‌ഡേറ്റുകൾ എന്നിവ നേടുക.", hi: "तुरंत सलाह, बाजार डेटा और मौसम अपडेट प्राप्त करें।" })}
                    </p>
                </div>
                </div>
            </Card>
             <Card className="group md:col-span-2 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader>
                    <CardTitle className="font-headline">{t({ en: "Crop Yield Analytics", hi: "फसल उपज विश्लेषण" })}</CardTitle>
                    <CardDescription>{t({ en: "Yield data from the last 5 years", hi: "पिछले 5 वर्षों का उपज डेटा" })}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-105">
                    <DashboardChart />
                </CardContent>
            </Card>
          </div>

          <AnimatedGrid className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, i) => (
              <Link href={feature.href} key={feature.title} className="block group">
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                      <CardHeader className="p-4">
                          <div className="flex items-start justify-between">
                              <CardTitle className="font-headline text-lg">{feature.title}</CardTitle>
                              <div className="transform transition-transform duration-300 group-hover:rotate-12">
                                  {feature.icon}
                              </div>
                          </div>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-end p-0">
                         <div className="relative aspect-video w-full overflow-hidden">
                           {feature.image && (
                             <Image
                               src={feature.image.imageUrl}
                               alt={feature.image.description}
                               fill
                               className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                               data-ai-hint={feature.image.imageHint}
                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                             />
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70"></div>
                           <div className="absolute bottom-0 left-0 p-4 transition-all duration-300 ease-in-out group-hover:-translate-y-1">
                              <p className="text-sm text-white/90 font-medium transform-gpu translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">{feature.description}</p>
                           </div>
                         </div>
                      </CardContent>
                  </Card>
              </Link>
            ))}
          </AnimatedGrid>
        </main>
      </div>

       <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex flex-col gap-3">
        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg hover:scale-110 transition-transform" aria-label="Submit Feedback">
                    <MessageSquareHeart className="w-6 h-6 sm:w-7 sm:h-7" />
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
                <Button variant="secondary" className="rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg hover:scale-110 transition-transform" aria-label="Submit a Query">
                    <MessageSquarePlus className="w-6 h-6 sm:w-7 sm:h-7" />
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
      <Footer />
    </>
  )
}
