
"use client"

import Image from "next/image"
import Link from "next/link"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  CloudSun,
  DollarSign,
  Mic,
  ScanLine,
  ScrollText,
  Stethoscope,
  Users,
} from "lucide-react"
import { Header } from "@/components/header"
import { useLanguage } from "@/contexts/language-context"

export default function DashboardPage() {
  const { t } = useLanguage()
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
    { title: t({ en: "Market Prices", ml: "വിപണി വിലകൾ", hi: "बाजार मूल्य" }), description: t({ en: "Get real-time crop prices", ml: "തത്സമയ വിള വിലകൾ നേടുക", hi: "वास्तविक समय में फसल की कीमतें प्राप्त करें" }), href: "/market-prices", icon: <DollarSign className="w-8 h-8 text-primary" />, image: featureImages.market },
    { title: t({ en: "Weather Forecast", ml: "കാലാവസ്ഥാ പ്രവചനം", hi: "मौसम पूर्वानुमान" }), description: t({ en: "Plan ahead with accurate forecasts", ml: "കൃത്യമായ പ്രവചനങ്ങൾ ഉപയോഗിച്ച് മുൻകൂട്ടി ആസൂത്രണം ചെയ്യുക", hi: "सटीक पूर्वानुमानों के साथ आगे की योजना बनाएं" }), href: "/weather", icon: <CloudSun className="w-8 h-8 text-primary" />, image: featureImages.weather },
    { title: t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर" }), description: t({ en: "Get AI advice for your crops", ml: "നിങ്ങളുടെ വിളകൾക്ക് AI ഉപദേശം നേടുക", hi: "अपनी फसलों के लिए AI सलाह प्राप्त करें" }), href: "/crop-doctor", icon: <Stethoscope className="w-8 h-8 text-primary" />, image: featureImages.doctor },
    { title: t({ en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन" }), description: t({ en: "Identify diseases with your camera", ml: "നിങ്ങളുടെ ക്യാമറ ഉപയോഗിച്ച് രോഗങ്ങൾ തിരിച്ചറിയുക", hi: " अपने कैमरे से बीमारियों की पहचान करें" }), href: "/scan-crop", icon: <ScanLine className="w-8 h-8 text-primary" />, image: featureImages.scan },
    { title: t({ en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न" }), description: t({ en: "Ask questions in your language", ml: "നിങ്ങളുടെ ഭാഷയിൽ ചോദ്യങ്ങൾ ചോദിക്കുക", hi: "अपनी भाषा में प्रश्न पूछें" }), href: "/voice-query", icon: <Mic className="w-8 h-8 text-primary" />, image: featureImages.voice },
    { title: t({ en: "Govt. Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं" }), description: t({ en: "Check your eligibility for schemes", ml: "പദ്ധതികൾക്ക് നിങ്ങളുടെ യോഗ്യത പരിശോധിക്കുക", hi: "योजनाओं के लिए अपनी पात्रता जांचें" }), href: "/govt-schemes", icon: <ScrollText className="w-8 h-8 text-primary" />, image: featureImages.schemes },
    { title: t({ en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका" }), description: t({ en: "Connect with local officers", ml: "പ്രാദേശിക ഉദ്യോഗസ്ഥരുമായി ബന്ധപ്പെടുക", hi: "स्थानीय अधिकारियों से जुड़ें" }), href: "/officer-directory", icon: <Users className="w-8 h-8 text-primary" />, image: featureImages.directory },
  ]

  return (
    <>
      <Header 
        title={t({ en: "Dashboard", ml: "ഡാഷ്ബോർഡ്", hi: "डैशबोर्ड" })} 
        description={t({ en: "Welcome to AgriMitra, your smart farming assistant.", ml: "അഗ്രിമിത്രയിലേക്ക് സ്വാഗതം, നിങ്ങളുടെ സ്മാർട്ട് ഫാമിംഗ് അസിസ്റ്റന്റ്.", hi: "एग्रीमित्र में आपका स्वागत है, आपका स्मार्ट खेती सहायक।" })}
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
                {t({ en: "Empowering Indian Farmers with AI", ml: "AI ഉപയോഗിച്ച് ഇന്ത്യൻ കർഷകരെ ശാക്തീകരിക്കുന്നു", hi: "AI के साथ भारतीय किसानों को सशक्त बनाना" })}
              </h2>
              <p className="text-lg text-gray-200">
                {t({ en: "Get instant advice, market data, and weather updates.", ml: "തൽക്ഷണ ഉപദേശം, മാർക്കറ്റ് ഡാറ്റ, കാലാവസ്ഥാ അപ്‌ഡേറ്റുകൾ എന്നിവ നേടുക.", hi: "तुरंत सलाह, बाजार डेटा और मौसम अपडेट प्राप्त करें।" })}
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
    </>
  )
}
