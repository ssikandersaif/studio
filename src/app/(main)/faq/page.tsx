"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { mockFaqs } from "@/lib/data";
import { useLanguage } from "@/contexts/language-context";
import { HelpCircle, Search } from "lucide-react";
import { AnimatedGrid } from "@/components/animated-grid";


export default function FAQPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) {
      return mockFaqs;
    }
    return mockFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const faqsByCategory = useMemo(() => {
    return filteredFaqs.reduce((acc, faq) => {
      (acc[faq.category] = acc[faq.category] || []).push(faq);
      return acc;
    }, {} as Record<string, typeof mockFaqs>);
  }, [filteredFaqs]);

  return (
    <>
      <Header
        title={t({ en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न", ml: "പതിവ് ചോദ്യങ്ങൾ", ta: "அடிக்கடி கேட்கப்படும் கேள்விகள்", te: "తరచుగా అడిగే ప్రశ్నలు", kn: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು", bn: "সাধারণ জিজ্ঞাসিত প্রশ্ন", mr: "वारंवार विचारले जाणारे प्रश्न", gu: "વારંવાર પૂછાતા પ્રશ્નો", pa: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ" })}
        description={t({ en: "Find answers to common questions about Krishi Mitra and farming.", hi: "कृषि मित्र और खेती के बारे में सामान्य प्रश्नों के उत्तर खोजें।", ml: "കൃഷി മിത്രയെയും കൃഷിയെയും കുറിച്ചുള്ള പൊതുവായ ചോദ്യങ്ങൾക്ക് ഉത്തരം കണ്ടെത്തുക.", ta: "கிருஷி மித்ரா மற்றும் விவசாயம் பற்றிய பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியவும்.", te: "కృషి మిత్ర మరియు వ్యవసాయం గురించి సాధారణ ప్రశ్నలకు సమాధానాలను కనుగొనండి.", kn: "ಕೃಷಿ ಮಿತ್ರ ಮತ್ತು ಕೃಷಿ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಹುಡುಕಿ.", bn: "কৃষি মিত্র এবং কৃষি সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন।", mr: "कृषी मित्र आणि शेतीबद्दलच्या सामान्य प्रश्नांची उत्तरे शोधा.", gu: "કૃષિ મિત્ર અને ખેતી વિશે સામાન્ય પ્રશ્નોના જવાબ શોધો.", pa: "ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਅਤੇ ਖੇਤੀ ਬਾਰੇ ਆਮ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਲੱਭੋ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <Card className="shadow-lg border-none">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center gap-3">
                 <HelpCircle className="w-10 h-10 text-primary hidden sm:block" />
                 <div>
                    <CardTitle className="font-headline">{t({ en: "Help & Support Center", hi: "सहायता और समर्थन केंद्र", ml: "സഹായ-പിന്തുണ കേന്ദ്രം", ta: "உதவி & ஆதரவு மையம்", te: "సహాయ & మద్దతు కేంద్రం", kn: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ ಕೇಂದ್ರ", bn: "সহায়তা ও সমর্থন কেন্দ্র", mr: "मदत आणि समर्थन केंद्र", gu: "મદદ અને સપોર્ટ કેન્દ્ર", pa: "ਮਦਦ ਅਤੇ ਸਹਾਇਤਾ ਕੇਂਦਰ" })}</CardTitle>
                    <CardDescription>{t({ en: `Total Questions: ${mockFaqs.length}`, hi: `कुल प्रश्न: ${mockFaqs.length}`, ml: `ആകെ ചോദ്യങ്ങൾ: ${mockFaqs.length}`, ta: `மொத்த கேள்விகள்: ${mockFaqs.length}`, te: `మొత్తం ప్రశ్నలు: ${mockFaqs.length}`, kn: `ಒಟ್ಟು ಪ್ರಶ್ನೆಗಳು: ${mockFaqs.length}`, bn: `মোট প্রশ্ন: ${mockFaqs.length}`, mr: `एकूण प्रश्न: ${mockFaqs.length}`, gu: `કુલ પ્રશ્નો: ${mockFaqs.length}`, pa: `ਕੁੱਲ ਸਵਾਲ: ${mockFaqs.length}`})}</CardDescription>
                 </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t({ en: "Search questions...", hi: "प्रश्न खोजें...", ml: "ചോദ്യങ്ങൾ തിരയുക...", ta: "கேள்விகளைத் தேடு...", te: "ప్రశ్నలను శోధించు...", kn: "ಪ್ರಶ್ನೆಗಳನ್ನು ಹುಡುಕಿ...", bn: "প্রশ্ন খুঁজুন...", mr: "प्रश्न शोधा...", gu: "પ્રશ્નો શોધો...", pa: "ਸਵਾਲ ਖੋਜੋ..." })}
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {Object.keys(faqsByCategory).length > 0 ? (
                <AnimatedGrid>
                {Object.entries(faqsByCategory).map(([category, faqs]) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-xl font-bold text-primary mb-4 border-b-2 border-primary/20 pb-2 font-headline">{category}</h2>
                        <Accordion type="single" collapsible className="w-full space-y-2">
                             {faqs.map((faq, index) => (
                                <AccordionItem value={`${category}-${index}`} key={`${category}-${index}`} className="bg-secondary/50 rounded-lg px-4 border-none">
                                <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
                </AnimatedGrid>
            ): (
                <div className="text-center text-muted-foreground py-16">
                    <p>{t({ en: "No matching questions found.", hi: "कोई मेल खाने वाला प्रश्न नहीं मिला।", ml: "യോജിക്കുന്ന ചോദ്യങ്ങളൊന്നും കണ്ടെത്തിയില്ല.", ta: "பொருத்தமான கேள்விகள் எதுவும் இல்லை.", te: "సరిపోలే ప్రశ్నలు కనుగొనబడలేదు.", kn: "ಹೊಂದಾಣಿಕೆಯಾಗುವ ಪ್ರಶ್ನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.", bn: "কোনো মিলে যাওয়া প্রশ্ন পাওয়া যায়নি।", mr: "जुळणारे प्रश्न आढळले नाहीत.", gu: "કોઈ મેળ ખાતા પ્રશ્નો મળ્યા નથી.", pa: "ਕੋਈ ਮੇਲ ਖਾਂਦੇ ਸਵਾਲ ਨਹੀਂ ਮਿਲੇ।" })}</p>
                    <p className="text-sm">{t({ en: "Try searching with different keywords.", hi: "विभिन्न कीवर्ड के साथ खोजने का प्रयास करें।", ml: "വ്യത്യസ്ത കീവേഡുകൾ ഉപയോഗിച്ച് തിരയാൻ ശ്രമിക്കുക.", ta: "வெவ்வேறு முக்கிய வார்த்தைகளுடன் தேட முயற்சிக்கவும்.", te: "వివిధ కీలకపదాలతో శోధించడానికి ప్రయత్నించండి.", kn: "ಬೇರೆ ಬೇರೆ ಕೀವರ್ಡ್‌ಗಳೊಂದಿಗೆ ಹುಡುಕಲು ಪ್ರಯತ್ನಿಸಿ.", bn: "ভিন্ন কীওয়ার্ড দিয়ে অনুসন্ধান করার চেষ্টা করুন।", mr: "वेगवेगळ्या कीवर्डसह शोधण्याचा प्रयत्न करा.", gu: "જુદા જુદા કીવર્ડ્સ સાથે શોધવાનો પ્રયાસ કરો.", pa: "ਵੱਖ-ਵੱਖ ਕੀਵਰਡਾਂ ਨਾਲ ਖੋਜਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ।"})}</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
