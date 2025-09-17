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
    // This effect should only run on the client-side
    const welcomeShown = sessionStorage.getItem(WELCOME_KEY);
    if (!welcomeShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(WELCOME_KEY, "true");
      }, 500); // Delay to allow the page to render first
      
      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="flex justify-center items-center mb-4">
            <Sprout className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold font-headline text-primary">
            {t({ en: "Welcome to Krishi Mitra!", hi: "कृषि मित्र में आपका स्वागत है!", ml: "കൃഷി മിത്രയിലേക്ക് സ്വാഗതം!", ta: "கிருஷி மித்ராவுக்கு வரவேற்கிறோம்!", te: "కృషి మిత్రకు స్వాగతం!", kn: "ಕೃಷಿ ಮಿತ್ರಕ್ಕೆ ಸ್ವಾಗತ!", bn: "কৃষি মিত্র-এ স্বাগতম!", mr: "कृषी मित्र मध्ये आपले स्वागत आहे!", gu: "કૃષિ મિત્રમાં આપનું સ્વાગત છે!", pa: "ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ!" })}
          </DialogTitle>
          <DialogDescription className="mt-2 text-muted-foreground">
            {t({ en: "Your AI-powered smart farming assistant.", hi: "आपका AI-संचालित स्मार्ट खेती सहायक।", ml: "നിങ്ങളുടെ AI-പവർ ചെയ്യുന്ന സ്മാർട്ട് ഫാമിംഗ് അസിസ്റ്റന്റ്.", ta: "உங்கள் AI-இயங்கும் ஸ்மார்ட் விவசாய உதவியாளர்.", te: "మీ AI-ఆధారిత స్మార్ట్ వ్యవసాయ సహాయకుడు.", kn: "ನಿಮ್ಮ AI-ಚಾಲಿತ ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮಿಂಗ್ ಸಹಾಯಕ.", bn: "আপনার এআই-চালিত স্মার্ট ফার্মিং সহকারী।", mr: "तुमचा AI-चालित स्मार्ट शेती सहाय्यक.", gu: "તમારા AI-સંચાલિત સ્માર્ટ ફાર્મિંગ સહાયક.", pa: "ਤੁਹਾਡਾ AI-ਸੰਚਾਲਿਤ ਸਮਾਰਟ ਖੇਤੀ ਸਹਾਇਕ।" })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            {t({ en: "Get instant advice on crops, weather, market prices, and more. Let's grow together!", hi: "फसलों, मौसम, बाजार कीमतों, और बहुत कुछ पर तुरंत सलाह प्राप्त करें। आइए मिलकर आगे बढ़ें!", ml: "വിളകൾ, കാലാവസ്ഥ, വിപണി വിലകൾ എന്നിവയെക്കുറിച്ച് തൽക്ഷണ ഉപദേശം നേടുക. നമുക്ക് ഒരുമിച്ച് വളരാം!", ta: "பயிர்கள், வானிலை, சந்தை விலைகள் மற்றும் பலவற்றில் உடனடி ஆலோசனையைப் பெறுங்கள். ஒன்றாக வளர்வோம்!", te: "పంటలు, వాతావరణం, మార్కెట్ ధరలు మరియు మరిన్నింటిపై తక్షణ సలహా పొందండి. కలిసి పెరుగుదాం!", kn: "ಬೆಳೆಗಳು, ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಹೆಚ್ಚಿನವುಗಳ ಬಗ್ಗೆ ತ್ವರಿತ ಸಲಹೆ ಪಡೆಯಿರಿ. ಒಟ್ಟಿಗೆ ಬೆಳೆಯೋಣ!", bn: "ফসল, আবহাওয়া, বাজার দর এবং আরও অনেক কিছুর উপর তাত্ক্ষণিক পরামর্শ পান। আসুন একসাথে বেড়ে উঠি!", mr: "पिके, हवामान, बाजारभाव आणि बरेच काही यावर त्वरित सल्ला मिळवा. चला एकत्र वाढूया!", gu: "પાક, હવામાન, બજાર ભાવ અને વધુ પર ત્વરિત સલાહ મેળવો. ચાલો સાથે મળીને વિકાસ કરીએ!", pa: "ਫਸਲਾਂ, ਮੌਸਮ, ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਅਤੇ ਹੋਰ ਬਹੁਤ ਕੁਝ ਬਾਰੇ ਤੁਰੰਤ ਸਲਾਹ ਲਓ। ਆਓ ਇਕੱਠੇ ਵਧੀਏ!" })}
          </p>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={() => setIsOpen(false)}>
            {t({ en: "Get Started", hi: "शुरू करें", ml: "തുടങ്ങാം", ta: "தொடங்கவும்", te: "ప్రారంభించండి", kn: "ಪ್ರಾರಂಭಿಸಿ", bn: "শুরু করুন", mr: "सुरु करा", gu: "શરૂ કરો", pa: "ਸ਼ੁਰੂ ਕਰੋ" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
