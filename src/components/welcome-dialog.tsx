"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const WELCOME_KEY = "krishi_mitra_welcome_shown";

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const welcomeShown = sessionStorage.getItem(WELCOME_KEY);
    if (!welcomeShown) {
      // Use a short delay to allow the page to render before showing the dialog
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(WELCOME_KEY, "true");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="flex justify-center items-center mb-4">
            <Sprout className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold font-headline text-primary">
            {t({ en: "Welcome to Krishi Mitra!", hi: "कृषि मित्र में आपका स्वागत है!" })}
          </DialogTitle>
          <DialogDescription className="mt-2 text-muted-foreground">
            {t({ en: "Your AI-powered smart farming assistant.", hi: "आपका AI-संचालित स्मार्ट खेती सहायक।" })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            {t({ en: "Get instant advice on crops, weather, market prices, and more. Let's grow together!", hi: "फसलों, मौसम, बाजार कीमतों, और बहुत कुछ पर तुरंत सलाह प्राप्त करें। आइए मिलकर आगे बढ़ें!" })}
          </p>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={() => setIsOpen(false)}>
            {t({ en: "Get Started", hi: "शुरू करें" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
