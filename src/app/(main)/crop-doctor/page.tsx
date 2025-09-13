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
import { useLanguage } from "@/contexts/language-context";

export default function CropDoctorPage() {
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: "Question is empty",
        description: "Please enter a question about your farming problem.",
      });
      return;
    }
    setLoading(true);
    setAdvice("");
    try {
      const result = await getCropAdvice({ question });
      setAdvice(result.advice);
    } catch (error) {
      console.error("Error getting crop advice:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to get advice from AI. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title={t("Crop Doctor", "വിള ഡോക്ടർ")}
        description={t("Get AI-driven advice for your farming problems.", "നിങ്ങളുടെ കാർഷിക പ്രശ്നങ്ങൾക്ക് AI-യുടെ സഹായത്തോടെ ഉപദേശം നേടുക.")}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>{t("Ask a Question", "ചോദ്യം ചോദിക്കുക")}</CardTitle>
                <CardDescription>
                  {t("Describe your farming problem, and our AI expert will provide a solution.", "നിങ്ങളുടെ കാർഷിക പ്രശ്നം വിവരിക്കുക, ഞങ്ങളുടെ AI വിദഗ്ദ്ധൻ ഒരു പരിഹാരം നൽകും.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">In English:</h3>
                    <Textarea
                      placeholder="e.g., 'My tomato plants have yellow leaves with brown spots. What should I do?'"
                      className="min-h-[100px]"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">In {t('Malayalam','മലയാളം')}:</h3>
                     <Textarea
                      placeholder={t("e.g., 'എന്റെ തക്കാളി ചെടികൾക്ക് മഞ്ഞ ഇലകളും തവിട്ടുനിറത്തിലുള്ള പാടുകളും ഉണ്ട്. ഞാൻ എന്തുചെയ്യണം?'", "ഉദാ: 'എന്റെ തക്കാളി ചെടികൾക്ക് മഞ്ഞ ഇലകളും തവിട്ടുനിറത്തിലുള്ള പാടുകളും ഉണ്ട്. ഞാൻ എന്തുചെയ്യണം?'")}
                      className="min-h-[100px]"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? t("Getting Advice...", "ഉപദേശം നേടുന്നു...") : t("Get AI Advice", "AI ഉപദേശം നേടുക")}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                {t("AI Recommendation", "AI ശുപാർശ")}
              </CardTitle>
              <CardDescription>
                {t("The AI's advice will appear here.", "AI-യുടെ ഉപദേശം ഇവിടെ ദൃശ്യമാകും.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
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
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
                  {advice}
                </div>
              )}
              {!loading && !advice && (
                <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                    <p>{t("Your expert advice will be generated here.", "നിങ്ങളുടെ വിദഗ്ദ്ധ ഉപദേശം ഇവിടെ ജനറേറ്റ് ചെയ്യും.")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
