"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockSchemes } from "@/lib/data";
import { GovernmentScheme } from "@/lib/types";
import { ExternalLink, HandHelping } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const allStates = Array.from(new Set(mockSchemes.flatMap(s => s.eligibility.states.includes("All") ? ["Kerala", "Maharashtra", "Punjab", "Gujarat"] : s.eligibility.states)));
const allCrops = Array.from(new Set(mockSchemes.flatMap(s => s.eligibility.crops.includes("All") ? ["Paddy", "Wheat", "Tomato", "Onion", "Potato"] : s.eligibility.crops)));


export default function GovtSchemesPage() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [eligibleSchemes, setEligibleSchemes] = useState<GovernmentScheme[]>([]);
  const { t } = useLanguage();

  const handleCheckEligibility = () => {
    const schemes = mockSchemes.filter(scheme => {
      const stateMatch = scheme.eligibility.states.includes("All") || scheme.eligibility.states.includes(selectedState);
      const cropMatch = scheme.eligibility.crops.includes("All") || scheme.eligibility.crops.includes(selectedCrop);
      return stateMatch && cropMatch;
    });
    setEligibleSchemes(schemes);
  };

  return (
    <>
      <Header
        title={t({ en: "Government Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं", ta: "அரசு திட்டங்கள்", te: "ప్రభుత్వ పథకాలు", kn: "ಸರ್ਕਾਰੀ ಯೋಜನೆಗಳು", bn: "সরকারি योजना", mr: "सरकारी योजना", gu: "સરકારી યોજનાઓ", pa: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ" })}
        description={t({ en: "Check your eligibility for beneficial schemes.", ml: "പ്രയോജനകരമായ പദ്ധതികൾക്ക് നിങ്ങളുടെ യോഗ്യത പരിശോധിക്കുക.", hi: "लाभकारी योजनाओं के लिए अपनी पात्रता जांचें।", ta: "பயனுள்ள திட்டங்களுக்கான உங்கள் தகுதியை சரிபார்க்கவும்.", te: "ప్రయోజనకరమైన పథకాలకు మీ అర్హతను తనిఖీ చేయండి.", kn: "ಪ್ರಯോജനಕಾರಿ યોજનાಗಳಿಗೆ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.", bn: " উপকারী યોજનાগুলির জন্য আপনার যোগ্যতা পরীক্ষা করুন।", mr: "फायदेशीर योजनांसाठी तुमची पात्रता तपासा.", gu: "લાભદાયી યોજનાઓ માટે તમારી યોગ્યતા તપાસો.", pa: "ਲਾਭਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲਈ ਆਪਣੀ ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{t({ en: "Check Eligibility", ml: "യോഗ്യത പരിശോധിക്കുക", hi: "पात्रता जांचें", ta: "தகுதியை சரிபார்க்கவும்", te: "అర్హతను తనిఖీ చేయండి", kn: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ", bn: "যোগ্যতা পরীক্ষা করুন", mr: "पात्रता तपासा", gu: "योग्यता તપાસો", pa: "ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ" })}</CardTitle>
              <CardDescription>{t({ en: "Select your state and crop to find schemes.", ml: "പദ്ധതികൾ കണ്ടെത്താൻ നിങ്ങളുടെ സംസ്ഥാനവും വിളയും തിരഞ്ഞെടുക്കുക.", hi: "योजनाएं खोजने के لیے اپنا રાજ્ય اور فصل منتخب کریں۔", ta: "திட்டங்களைக் கண்டுபிடிக்க உங்கள் மாநிலം மற்றும் பயிரைத் தேர்ந்தெடுக்கவும்.", te: "పథకాలను కనుగొనడానికి మీ రాష్ట్రం మరియు పంటను ఎంచుకోండి.", kn: "ಯੋਜನೆಗಳನ್ನು શોધಲು ನಿಮ್ಮ રાજ્ય ಮತ್ತು ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.", bn: "স্কیمগুলি খুঁজে পেতে আপনার রাজ্য এবং ফসল নির্বাচন করুন।", mr: "योजना शोधण्यासाठी तुमचे राज्य आणि पीक निवडा.", gu: "યોजनाઓ શોધવા માટે તમારું રાજ્ય અને પાક પસંદ કરો.", pa: "ਯੋਜਨਾਵਾਂ ਲੱਭਣ ਲਈ ਆਪਣਾ ਰਾਜ ਅਤੇ ਫसल ਚੁਣੋ।" })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t({ en: "State", ml: "സംസ്ഥാനം", hi: "राज्य", ta: "மாநிலம்", te: "రాష్ట్రం", kn: "ರಾಜ್ಯ", bn: "রাজ্য", mr: "राज्य", gu: "રાજ્ય", pa: "ਰਾਜ" })}</label>
                <Select onValueChange={setSelectedState} value={selectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder={t({ en: "Select a state", ml: "ഒരു സംസ്ഥാനം തിരഞ്ഞെടുക്കുക", hi: "एक राज्य चुनें", ta: "ஒரு மாநிலத்தைத் தேர்ந்தெடுக்கவும்", te: "ఒక రాష్ట్రాన్ని ఎంచుకోండి", kn: "ಒಂದು ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ", bn: "একটি রাজ্য নির্বাচন করুন", mr: "एक રાજ્ય निवडा", gu: "એક રાજ્ય પસંદ કરો", pa: "ਇੱਕ ਰਾਜ ਚੁਣੋ" })} />
                  </SelectTrigger>
                  <SelectContent>
                    {allStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">{t({ en: "Crop", ml: "വിള", hi: "फ़सल", ta: "பயிர்", te: "పంట", kn: "ಬೆಳೆ", bn: "فসল", mr: "पीक", gu: "પાક", pa: "ਫਸਲ" })}</label>
                <Select onValueChange={setSelectedCrop} value={selectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder={t({ en: "Select a crop", ml: "ഒരു വിള തിരഞ്ഞെടുക്കുക", hi: "एक फसल चुनें", ta: "ஒரு பயிரைத் தேர்ந்தெடுக்கவும்", te: "ఒక పంటను ఎంచుకోండి", kn: "ಒಂದು ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", bn: "একটি ফসল নির্বাচন করুন", mr: "एक पीक निवडा", gu: "એક પાક પસંદ કરો", pa: "ਇੱਕ ਫसल ਚੁਣੋ" })} />
                  </SelectTrigger>
                  <SelectContent>
                     {allCrops.map(crop => <SelectItem key={crop} value={crop}>{crop}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCheckEligibility} className="w-full" disabled={!selectedState || !selectedCrop}>
                {t({ en: "Find Schemes", ml: "പദ്ധതികൾ കണ്ടെത്തുക", hi: "योजनाएं खोजें", ta: "திட்டங்களைக் கண்டறியவும்", te: "పథకాలను కనుగొనండి", kn: "ಯੋਜನೆಗಳನ್ನು ಹುಡುಕಿ", bn: "স্কیم খুঁজুন", mr: "योजना शोधा", gu: "યોजनाઓ શોધો", pa: "ਯੋਜਨਾਵਾਂ ਲੱਭੋ" })}
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t({ en: "Eligible Schemes", ml: "യോഗ്യമായ പദ്ധതികൾ", hi: "योग्य योजनाएं", ta: "தகுதியான திட்டங்கள்", te: "అర్హతగల పథకాలు", kn: "ಅರ್ಹ ಯೋಜನೆಗಳು", bn: "যোগ্য স্কিম", mr: "पात्र योजना", gu: "योग्य યોજનાઓ", pa: "ਯੋਗ ਯੋਜਨਾਵਾਂ" })}</CardTitle>
            </CardHeader>
            <CardContent>
              {eligibleSchemes.length > 0 ? (
                <div className="space-y-4">
                  {eligibleSchemes.map(scheme => (
                    <div key={scheme.id} className="p-4 border rounded-lg bg-secondary/50">
                        <div className="flex justify-between items-start">
                           <h3 className="font-bold text-lg text-primary">{scheme.name}</h3>
                           <Link href={scheme.link} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm"><ExternalLink className="mr-2 h-4 w-4"/>{t({ en: "Learn More", ml: "കൂടുതലറിയുക", hi: "और जानें", ta: "மேலும் அறிக", te: "మరింత తెలుసుకోండి", kn: "மேலும் ತಿಳಿಯಿರಿ", bn: "আরও জানুন", mr: "अधिक जाणून घ्या", gu: "વધુ શીખો", pa: "ਹੋਰ ਜਾਣੋ" })}</Button>
                           </Link>
                        </div>
                      <p className="text-muted-foreground mt-1">{scheme.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                  <HandHelping className="w-16 h-16 mb-4"/>
                  <p>{t({ en: "Your eligible schemes will be shown here.", ml: "നിങ്ങളുടെ യോഗ്യമായ പദ്ധതികൾ ഇവിടെ കാണിക്കും.", hi: "आपकी योग्य योजनाएं यहां दिखाई जाएंगी।", ta: "உங்கள் தகுதியான திட்டங்கள் இங்கே காட்டப்படும்.", te: "మీ అర్హతగల పథకాలు ఇక్కడ చూపబడతాయి.", kn: "ನಿಮ್ಮ ಅರ್ಹ ಯೋಜನೆಗಳು ಇಲ್ಲಿ ತೋರಿಸಲ್ಪಡುತ್ತವೆ.", bn: "আপনার योग्य স্কিমগুলি এখানে দেখানো হবে।", mr: "तुमच्या पात्र योजना येथे दर्शविल्या जातील.", gu: "તમારી યોગ્ય યોજનાઓ અહીં બતાવવામાં આવશે.", pa: "ਤੁਹਾਡੀਆਂ ਯੋਗ ਯੋਜਨਾਵਾਂ ਇੱਥੇ ਦਿਖਾਈਆਂ ਜਾਣਗੀਆਂ।" })}</p>
                  <p className="text-sm">{t({ en: "Please select a state and crop to get started.", ml: "ആരംഭിക്കുന്നതിന് ഒരു സംസ്ഥാനവും വിളവും തിരഞ്ഞെടുക്കുക.", hi: "शुरू करने के لیے براہ کرم ایک ریاست اور فصل منتخب کریں۔", ta: "தொடங்குவதற்கு ഒരു மாநிலம் மற்றும் பயிரைத் தேர்ந்தெடுக்கவும்.", te: "ప్రారంभించడానికి ദയവായി ഒരു రాష్ట్రం మరియు పంటను ఎంచుకోండి.", kn: "ಪ್ರారంభಿಸಲು ದಯವಿಟ್ಟು ಒಂದು રાજ્ય ಮತ್ತು ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.", bn: "শروع කිරීමට অনুগ্রহ করে একটি राज्य এবং ফসল নির্বাচন করুন।", mr: "सुरुवात करण्यासाठी कृपया एक રાજ્ય आणि पीक निवडा.", gu: "શੁਰુ કરવા માટે કૃપા કરીને એક રાજ્ય અને પાક પસંદ કરો.", pa: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਰਾਜ ਅਤੇ ਫਸਲ ਚੁਣੋ।" })}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
