
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
import { WelcomeDialog } from "@/components/welcome-dialog";
import {
    CloudSun,
    DollarSign,
    Stethoscope,
    ScanLine,
    Mic,
    MessageCircle,
    ScrollText,
    Users,
    HelpCircle,
    NotebookPen
} from "lucide-react";


const features = [
  {
    title: { en: "Market Prices", ml: "വിപണി വിലകൾ", hi: "बाजार मूल्य" },
    description: { en: "Get real-time crop prices.", ml: "തത്സമയ വിള വിലകൾ നേടുക.", hi: "वास्तविक समय में फसल की कीमतें प्राप्त करें।" },
    href: "/market-prices",
    icon: DollarSign,
    image: placeholderImages.find(img => img.id === 'market-prices'),
  },
  {
    title: { en: "Weather", ml: "കാലാവസ്ഥ", hi: "मौसम" },
    description: { en: "5-day forecast & advice.", ml: "5 ദിവസത്തെ പ്രവചനവും ഉപദേശവും.", hi: "5-दिन का पूर्वानुमान और सलाह।" },
    href: "/weather",
    icon: CloudSun,
    image: placeholderImages.find(img => img.id === 'weather-forecast'),
  },
  {
    title: { en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर" },
    description: { en: "AI advice for crop issues.", ml: "വിള പ്രശ്നങ്ങൾക്ക് AI ഉപദേശം.", hi: "फसल की समस्याओं के लिए एआई सलाह।" },
    href: "/crop-doctor",
    icon: Stethoscope,
    image: placeholderImages.find(img => img.id === 'crop-doctor'),
  },
  {
    title: { en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन" },
    description: { en: "Identify diseases with your camera.", ml: "ക്യാമറ ഉപയോഗിച്ച് രോഗങ്ങൾ കണ്ടെത്തുക.", hi: "अपने कैमरे से बीमारियों की पहचान करें।" },
    href: "/scan-crop",
    icon: ScanLine,
    image: placeholderImages.find(img => img.id === 'scan-crop'),
  },
   {
    title: { en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न" },
    description: { en: "Ask questions in your language.", ml: "നിങ്ങളുടെ ഭാഷയിൽ ചോദ്യങ്ങൾ ചോദിക്കുക.", hi: "अपनी भाषा में प्रश्न पूछें।" },
    href: "/voice-query",
    icon: Mic,
    image: placeholderImages.find(img => img.id === 'voice-query'),
  },
  {
    title: { en: "Talk to AI", hi: "एआई से बात करें" },
    description: { en: "General chat with AI assistant.", hi: "एआई सहायक के साथ सामान्य चैट।" },
    href: "/talk-to-ai",
    icon: MessageCircle,
    image: placeholderImages.find(img => img.id === 'talk-to-ai'),
  },
   {
    title: { en: "Farm Diary", hi: "फार्म डायरी" },
    description: { en: "Log your farming activities.", hi: "अपनी खेती की गतिविधियों को लॉग करें।" },
    href: "/farm-diary",
    icon: NotebookPen,
    image: placeholderImages.find(img => img.id === 'farm-diary'),
  },
  {
    title: { en: "Govt. Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं" },
    description: { en: "Find eligible government schemes.", ml: "യോഗ്യമായ സർക്കാർ പദ്ധതികൾ കണ്ടെത്തുക.", hi: "योग्य सरकारी योजनाएं खोजें।" },
    href: "/govt-schemes",
    icon: ScrollText,
    image: placeholderImages.find(img => img.id === 'govt-schemes'),
  },
  {
    title: { en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका" },
    description: { en: "Connect with local officers.", ml: "പ്രാദേശിക ഉദ്യോഗസ്ഥരുമായി ബന്ധപ്പെടുക.", hi: "स्थानीय अधिकारियों से जुड़ें।" },
    href: "/officer-directory",
    icon: Users,
    image: placeholderImages.find(img => img.id === 'officer-directory'),
  },
  {
    title: { en: "FAQ", ml: "പതിവുചോദ്യങ്ങൾ", hi: "सामान्य प्रश्न" },
    description: { en: "Find answers to common questions.", ml: "പൊതുവായ ചോദ്യങ്ങൾക്ക് ഉത്തരം കണ്ടെത്തുക.", hi: "सामान्य प्रश्नों के उत्तर खोजें।" },
    href: "/faq",
    icon: HelpCircle,
    image: placeholderImages.find(img => img.id === 'faq'),
  },
];


export default function DashboardPage() {
  const { t } = useLanguage();
  const heroImage = placeholderImages.find(img => img.id === 'farmer-hero');


  return (
    <>
      <Header
        title={t({ en: "Dashboard", ml: "ഡാഷ്ബോർഡ്", hi: "डैशबोर्ड" })}
        description={t({
          en: "Welcome to your AI-powered farming companion.",
          ml: "നിങ്ങളുടെ AI- പവർ ചെയ്യുന്ന കാർഷിക കൂട്ടാളിയിലേക്ക് സ്വാഗതം.",
          hi: "आपके AI-संचालित खेती सहयोगी में आपका स्वागत है।",
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
                        {t({ en: "Empowering Indian Agriculture", hi: "भारतीय कृषि को सशक्त बनाना" })}
                        </h1>
                        <p className="text-white/90 mt-1 sm:mt-2 max-w-2xl">
                        {t({ en: "Your one-stop solution for smart farming decisions.", hi: "स्मार्ट खेती के निर्णयों के लिए आपका वन-स्टॉप समाधान।" })}
                        </p>
                    </div>
                </div>
            </Card>
           )}

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t({ en: "Quick Actions", ml: "ദ്രുത പ്രവർത്തനങ്ങൾ", hi: "त्वरित कार्रवाइयां" })}</CardTitle>
              <CardDescription>
                {t({
                    en: "Navigate to key features of the application.",
                    ml: "ആപ്ലിക്കേഷൻ്റെ പ്രധാന ഫീച്ചറുകളിലേക്ക് നാവിഗേറ്റ് ചെയ്യുക.",
                    hi: "एप्लिकेशन की प्रमुख विशेषताओं पर नेविगेट करें।",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
                 <AnimatedGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {features.map((feature) => (
                   <Link href={feature.href} key={feature.href} className="block group">
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      {feature.image && (
                        <div className="relative h-24">
                          <Image
                            src={feature.image.imageUrl}
                            alt={feature.image.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={feature.image.imageHint}
                          />
                        </div>
                      )}
                      <div className="p-3 text-center">
                        <h3 className="font-semibold text-sm">{t(feature.title)}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{t(feature.description)}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </AnimatedGrid>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="font-headline">{t({ en: "Major Crop Production Trends (India)", hi: "प्रमुख फसल उत्पादन रुझान (भारत)"})}</CardTitle>
                <CardDescription>{t({en: "Production data in million tonnes for key crops over the last 5 years.", hi: "पिछले 5 वर्षों में प्रमुख फसलों के लिए मिलियन टन में उत्पादन डेटा।"})}</CardDescription>
            </CardHeader>
            <CardContent>
                <DashboardChart />
            </CardContent>
          </Card>

        </div>
      </main>
      <WelcomeDialog />
    </>
  );
}
