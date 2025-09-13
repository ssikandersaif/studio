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
import { Camera, ListChecks, Loader2, Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
            title: t({ en: "Image too large", ml: "ചിത്രം വളരെ വലുതാണ്" }),
            description: t({ en: "Please upload an image smaller than 4MB.", ml: "4MB-യിൽ താഴെയുള്ള ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യുക." }),
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
        title: t({ en: "No image selected", ml: "ചിത്രം തിരഞ്ഞെടുത്തിട്ടില്ല" }),
        description: t({ en: "Please upload an image of your crop to analyze.", ml: "വിശകലനം ചെയ്യാൻ ദയവായി നിങ്ങളുടെ വിളയുടെ ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യുക." }),
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
        title: t({ en: "AI Error", ml: "AI പിശക്" }),
        description: t({ en: "Failed to analyze image. Please try again later.", ml: "ചിത്രം വിശകലനം ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക." }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Scan Crop", ml: "വിള സ്കാൻ" })}
        description={t({ en: "Upload a crop image for AI-driven disease and pest identification.", ml: "AI- ഉപയോഗിച്ചുള്ള രോഗ, കീട തിരിച്ചറിയലിനായി വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക." })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t({ en: "Upload Crop Image", ml: "വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക" })}</CardTitle>
              <CardDescription>
                {t({ en: "Choose a clear photo of the affected plant part.", ml: "രോഗബാധിതമായ ചെടിയുടെ ഭാഗത്തിന്റെ വ്യക്തമായ ഫോട്ടോ തിരഞ്ഞെടുക്കുക." })}
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
                    alt="Crop preview"
                    width={400}
                    height={225}
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Camera className="mx-auto h-12 w-12" />
                    <p>{t({ en: "Click to upload or drag & drop", ml: "അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക്കുചെയ്യുക അല്ലെങ്കിൽ വലിച്ചിടുക" })}</p>
                    <p className="text-xs">{t({ en: "PNG, JPG, WEBP up to 4MB", ml: "PNG, JPG, WEBP 4MB വരെ" })}</p>
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
                {loading ? t({ en: "Analyzing...", ml: "വിശകലനം ചെയ്യുന്നു..." }) : t({ en: "Analyze Crop Image", ml: "വിളയുടെ ചിത്രം വിശകലനം ചെയ്യുക" })}
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="text-primary" />
                {t({ en: "Analysis Results", ml: "വിശകലന ഫലങ്ങൾ" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "Potential diseases or pests and their solutions will be listed here.", ml: "സാധ്യമായ രോഗങ്ങൾ അല്ലെങ്കിൽ കീടങ്ങളും അവയുടെ പരിഹാരങ്ങളും ഇവിടെ പട്ടികപ്പെടുത്തും." })}
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
                 <Accordion type="single" collapsible className="w-full">
                  {analysisResult.possibleIssues.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="font-medium text-left">{item.issue}</AccordionTrigger>
                      <AccordionContent className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                        {item.recommendation}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
              {!loading && (!analysisResult || analysisResult.possibleIssues.length === 0) && (
                 <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                    <p>{t({ en: "Your analysis results will appear here.", ml: "നിങ്ങളുടെ വിശകലന ഫലങ്ങൾ ഇവിടെ ദൃശ്യമാകും." })}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
