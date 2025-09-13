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

export default function CropDoctorPage() {
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
        title="Crop Doctor"
        description="Get AI-driven advice for your farming problems."
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
                <CardDescription>
                  Describe your farming problem, and our AI expert will provide a solution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., 'My tomato plants have yellow leaves with brown spots. What should I do?'"
                  className="min-h-[150px]"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={loading}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Getting Advice..." : "Get AI Advice"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                AI Recommendation
              </CardTitle>
              <CardDescription>
                The AI's advice will appear here.
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
                    <p>Your expert advice will be generated here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
