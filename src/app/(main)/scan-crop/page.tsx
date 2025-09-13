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
import { identifyDiseaseOrPest } from "@/ai/flows/image-based-disease-id";
import { Camera, ListChecks, Loader2, Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ScanCropPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
          toast({
            variant: "destructive",
            title: "Image too large",
            description: "Please upload an image smaller than 4MB.",
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
      setIssues([]); // Clear previous results
    }
  };

  const handleAnalyze = async () => {
    if (!imageData) {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please upload an image of your crop to analyze.",
      });
      return;
    }
    setLoading(true);
    setIssues([]);
    try {
      const result = await identifyDiseaseOrPest({ photoDataUri: imageData });
      setIssues(result.possibleIssues);
    } catch (error) {
      console.error("Error identifying disease:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to analyze image. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Scan Crop"
        description="Upload a crop image for AI-driven disease and pest identification."
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Crop Image</CardTitle>
              <CardDescription>
                Choose a clear photo of the affected plant part.
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
                    <p>Click to upload or drag & drop</p>
                    <p className="text-xs">PNG, JPG, WEBP up to 4MB</p>
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
                {loading ? "Analyzing..." : "Analyze Crop Image"}
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="text-primary" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                Potential diseases or pests will be listed here.
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
              {issues.length > 0 && (
                <ul className="space-y-2">
                  {issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-md">
                      <div className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-primary" />
                      <span className="font-medium">{issue}</span>
                    </li>
                  ))}
                </ul>
              )}
              {!loading && issues.length === 0 && (
                 <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                    <p>Your analysis results will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
