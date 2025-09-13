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
  ArrowRight,
  CloudSun,
  DollarSign,
  LayoutGrid,
  Mic,
  ScanLine,
  ScrollText,
  Stethoscope,
  Users,
} from "lucide-react"
import { Header } from "@/components/header"

export default function DashboardPage() {
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
    { title: "Market Prices", description: "Get real-time crop prices", href: "/market-prices", icon: <DollarSign className="w-8 h-8 text-primary" />, image: featureImages.market },
    { title: "Weather Forecast", description: "Plan ahead with accurate forecasts", href: "/weather", icon: <CloudSun className="w-8 h-8 text-primary" />, image: featureImages.weather },
    { title: "Crop Doctor", description: "Get AI advice for your crops", href: "/crop-doctor", icon: <Stethoscope className="w-8 h-8 text-primary" />, image: featureImages.doctor },
    { title: "Scan Crop", description: "Identify diseases with your camera", href: "/scan-crop", icon: <ScanLine className="w-8 h-8 text-primary" />, image: featureImages.scan },
    { title: "Voice Query", description: "Ask questions in your language", href: "/voice-query", icon: <Mic className="w-8 h-8 text-primary" />, image: featureImages.voice },
    { title: "Govt. Schemes", description: "Check your eligibility for schemes", href: "/govt-schemes", icon: <ScrollText className="w-8 h-8 text-primary" />, image: featureImages.schemes },
    { title: "Officer Directory", description: "Connect with local officers", href: "/officer-directory", icon: <Users className="w-8 h-8 text-primary" />, image: featureImages.directory },
  ]

  return (
    <>
      <Header title="Dashboard" description="Welcome to AgriMitra, your smart farming assistant."/>
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
                Empowering Indian Farmers with AI
              </h2>
              <p className="text-lg text-gray-200">
                Get instant advice, market data, and weather updates.
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
