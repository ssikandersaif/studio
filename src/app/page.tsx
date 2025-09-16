"use client";

import Link from "next/link";
import Image from "next/image";
import { Sprout, BarChart, CloudSun, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlaceHolderImagesData from "@/lib/placeholder-images.json";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  const { placeholderImages: PlaceHolderImages } = PlaceHolderImagesData;
  const heroImage = PlaceHolderImages.find((img) => img.id === "farmer-hero");

  const features = [
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: "Market Insights",
      description: "Get real-time market prices for your crops to make informed selling decisions."
    },
    {
      icon: <CloudSun className="w-8 h-8 text-primary" />,
      title: "Weather Alerts",
      description: "Receive accurate weather forecasts to plan your farming activities effectively."
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      title: "AI Crop Doctor",
      description: "Instantly diagnose crop diseases and get expert advice by just uploading a photo."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
           <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary font-headline">
                Krishi Mitra
              </h1>
            </div>
            <nav className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button>Go to App</Button>
              </Link>
            </nav>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
           <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-green-300 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <div className="container relative text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
              Smarter Farming, Brighter Future
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Krishi Mitra is your AI-powered companion for modern Indian agriculture. Get instant advice, weather updates, and market prices to boost your yield.
            </p>
            <div className="mt-8">
              <Link href="/dashboard">
                <Button size="lg">
                  Launch Krishi Mitra <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Features at a Glance</h2>
              <p className="text-muted-foreground mt-2">Everything you need for a successful harvest.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="p-8 bg-background rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
         {/* Image Section */}
        <section className="py-20">
          <div className="container">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              {heroImage && (
                  <Image
                  src={heroImage.imageUrl}
                  alt="Indian Farmer in field"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
