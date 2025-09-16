
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Sprout, Loader2 } from "lucide-react";
import { GoogleIcon } from "./google-icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


export function AuthDialog() {
  const { isAuthDialogOpen, setAuthDialogOpen, signInWithGoogle } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: t({ en: "Signed In", hi: "साइन इन" }),
        description: t({ en: "Welcome back!", hi: "वापसी पर स्वागत है!" }),
      });
      setAuthDialogOpen(false);
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        variant: "destructive",
        title: t({ en: "Sign-in Failed", hi: "साइन-इन विफल" }),
        description: t({ en: "Could not sign in with Google. Please try again.", hi: "Google से साइन इन नहीं हो सका। कृपया पुनः प्रयास करें।" }),
      });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="flex justify-center items-center mb-4">
            <Sprout className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold font-headline text-primary">
            {t({ en: "Sign In to Continue", hi: "जारी रखने के लिए साइन इन करें" })}
          </DialogTitle>
          <DialogDescription className="mt-2 text-muted-foreground">
            {t({ en: "Create an account to save your diary entries and get personalized alerts.", hi: "अपनी डायरी प्रविष्टियों को सहेजने और व्यक्तिगत अलर्ट प्राप्त करने के लिए एक खाता बनाएं।" })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
             <Button 
                className="w-full" 
                variant="outline"
                onClick={handleSignIn}
                disabled={loading}
            >
                {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                <GoogleIcon className="mr-2 h-5 w-5" />
                )}
                {t({ en: "Sign in with Google", hi: "Google के साथ साइन इन करें" })}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
