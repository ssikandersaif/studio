
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
    ScanLine
} from "lucide-react";
import { WeatherSummaryCard } from "@/components/weather-summary-card";
import { PriceTrendCard } from "@/components/price-trend-card";
import { Button } from "@/components/ui/button";

const secondaryFeatures = [
   {
    title: { en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न" },
    description: { en: "Ask questions in your language.", ml: "നിങ്ങളുടെ ഭാഷയിൽ ചോദ്യങ്ങൾ ചോദിക്കുക.", hi: "अपनी भाषा में प्रश्न पूछें।" },
    href: "/voice-query",
    icon: Mic,
    imageId: "voice-query"
  },
  {
    title: { en: "Talk to AI", hi: "एआई से बात करें" },
    description: { en: "General chat with AI assistant.", hi: "एआई सहायक के साथ सामान्य चैट।" },
    href: "/talk-to-ai",
    icon: MessageCircle,
    imageId: "talk-to-ai"
  },
   {
    title: { en: "Farm Diary", hi: "फार्म डायरी" },
    description: { en: "Log your farming activities.", hi: "अपनी खेती की गतिविधियों को लॉग करें।" },
    href: "/farm-diary",
    icon: NotebookPen,
    imageId: "farm-diary"
  },
  {
    title: { en: "Govt. Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं" },
    description: { en: "Find eligible government schemes.", ml: "യോഗ്യമായ സർക്കാർ പദ്ധതികൾ കണ്ടെത്തുക.", hi: "योग्य सरकारी योजनाएं खोजें।" },
    href: "/govt-schemes",
    icon: ScrollText,
    imageId: "govt-schemes"
  },
  {
    title: { en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका" },
    description: { en: "Connect with local officers.", ml: "പ്രാദേശിക ഉദ്യോഗസ്ഥരുമായി ബന്ധപ്പെടുക.", hi: "स्थानीय अधिकारियों से जुड़ें।" },
    href: "/officer-directory",
    icon: Users,
    imageId: "officer-directory"
  },
  {
    title: { en: "FAQ", ml: "പതിവുചോദ്യങ്ങൾ", hi: "सामान्य प्रश्न" },
    description: { en: "Find answers to common questions.", ml: "പൊതുവായ ചോദ്യങ്ങൾക്ക് ഉത്തരം കണ്ടെത്തുക.", hi: "सामान्य प्रश्नों के उत्तर खोजें।" },
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
                  <CardTitle className="font-headline">{t({ en: "Major Crop Production Trends (India)", hi: "प्रमुख फसल उत्पादन रुझान (भारत)"})}</CardTitle>
                  <CardDescription>{t({en: "Production data in million tonnes for key crops over the last 5 years.", hi: "पिछले 5 वर्षों में प्रमुख फसलों के लिए मिलियन टन में उत्पादन डेटा।"})}</CardDescription>
              </CardHeader>
              <CardContent>
                  <DashboardChart />
              </CardContent>
          </Card>
           
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
                                <CardTitle className="font-headline">{t({ en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन" })}</CardTitle>
                                <p className="text-white/80 mt-1">{t({ en: "Identify crop diseases and pests instantly using your phone's camera.", hi: "अपने फोन के कैमरे का उपयोग करके फसल रोगों और कीटों की तुरंत पहचान करें।"})}</p>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-white justify-start">{t({en: "Scan Now", hi: "अभी स्कैन करें"})}<ArrowRight className="ml-2 h-4 w-4" /></Button>
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
                                <CardTitle className="font-headline">{t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर" })}</CardTitle>
                                <p className="text-white/80 mt-1">{t({ en: "Get expert AI advice for any farming problem or question you have.", hi: "अपनी किसी भी कृषि समस्या या प्रश्न के लिए विशेषज्ञ एआई सलाह प्राप्त करें।"})}</p>
                            </div>
                           <Button variant="link" className="p-0 h-auto text-white justify-start">{t({en: "Ask Question", hi: "प्रश्न पूछें"})}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </div>
                    </Card>
                 </Link>
            </AnimatedGrid>

            <div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold font-headline text-primary">{t({ en: "More Tools & Resources", hi: "और उपकरण और संसाधन" })}</h2>
                    <p className="text-muted-foreground">{t({ en: "Explore other features to help you on your farm.", hi: "अपने खेत में आपकी मदद करने के लिए अन्य सुविधाओं का अन्वेषण करें।" })}</p>
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
