"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getCropAdvice } from "@/ai/flows/ai-crop-advice";
import { Lightbulb, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage, languageNameMap } from "@/contexts/language-context";

export default function CropDoctorPage() {
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState<{ english: string; translated: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: t({ en: "Question is empty", ml: "ചോദ്യം ശൂന്യമാണ്" }),
        description: t({ en: "Please enter a question about your farming problem.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നത്തെക്കുറിച്ച് ഒരു ചോദ്യം നൽകുക." }),
      });
      return;
    }
    setLoading(true);
    setAdvice(null);
    try {
      const result = await getCropAdvice({ question, language });
      setAdvice({
        english: result.englishAdvice,
        translated: result.translatedAdvice
      });
    } catch (error) {
      console.error("Error getting crop advice:", error);
      toast({
        variant: "destructive",
        title: t({ en: "AI Error", ml: "AI പിശക്" }),
        description: t({ en: "Failed to get advice from AI. Please try again later.", ml: "AI-യിൽ നിന്ന് ഉപദേശം ലഭിക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക." }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Crop Doctor", ml: "വിള ഡോക്ടർ" })}
        description={t({ en: "Get AI-driven advice for your farming problems.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നങ്ങൾക്ക് AI-യുടെ സഹായത്തോടെ ഉപദേശം നേടുക." })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>{t({ en: "Ask a Question", ml: "ചോദ്യം ചോദിക്കുക" })}</CardTitle>
                <CardDescription>
                  {t({ en: "Describe your farming problem, and our AI expert will provide a solution.", ml: "നിങ്ങളുടെ കാർഷിക പ്രശ്നം വിവരിക്കുക, ഞങ്ങളുടെ AI വിദഗ്ദ്ധൻ ഒരു പരിഹാരം നൽകും." })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t(
                    {
                      en: "e.g., 'My tomato plants have yellow leaves with brown spots. What should I do?'", 
                      ml: "ഉദാ: 'എന്റെ തക്കാളി ചെടികൾക്ക് മഞ്ഞ ഇലകളും തവിട്ടുനിറത്തിലുള്ള പാടുകളും ഉണ്ട്. ഞാൻ എന്തുചെയ്യണം?'"
                    }
                  )}
                  className="min-h-[150px]"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={loading}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? t({ en: "Getting Advice...", ml: "ഉപദേശം നേടുന്നു..." }) : t({ en: "Get AI Advice", ml: "AI ഉപദേശം നേടുക" })}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                {t({ en: "AI Recommendation", ml: "AI ശുപാർശ" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "The AI's advice will appear here.", ml: "AI-യുടെ ഉപദേശം ഇവിടെ ദൃശ്യമാകും." })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              {loading && (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-3/4" />
                </div>
              )}
              {advice && (
                <div className="grid gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">In English:</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                      {advice.english}
                    </div>
                  </div>
                   {language !== 'en' && (
                    <div>
                      <h3 className="font-semibold mb-2">In {languageNameMap[language]}:</h3>
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                        {advice.translated}
                      </div>
                    </div>
                   )}
                </div>
              )}
              {!loading && !advice && (
                <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                    <p>{t({ en: "Your expert advice will be generated here.", ml: "നിങ്ങളുടെ വിദഗ്ദ്ധ ഉപദേശം ഇവിടെ ജനറേറ്റ് ചെയ്യും." })}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
