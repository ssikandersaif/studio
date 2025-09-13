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
        title={t({ en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न" })}
        description={t({ en: "Find answers to common questions about AgriMitra and farming.", hi: "एग्रीमित्रा और खेती के बारे में सामान्य प्रश्नों के उत्तर खोजें।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center gap-3">
                 <HelpCircle className="w-10 h-10 text-primary hidden sm:block" />
                 <div>
                    <CardTitle>{t({ en: "Help & Support Center", hi: "सहायता और समर्थन केंद्र" })}</CardTitle>
                    <CardDescription>{t({ en: `Total Questions: ${mockFaqs.length}`, hi: `कुल प्रश्न: ${mockFaqs.length}`})}</CardDescription>
                 </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t({ en: "Search questions...", hi: "प्रश्न खोजें..." })}
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {Object.keys(faqsByCategory).length > 0 ? (
                <Accordion type="multiple" className="w-full space-y-4">
                {Object.entries(faqsByCategory).map(([category, faqs]) => (
                    <div key={category}>
                        <h2 className="text-xl font-semibold text-primary mb-4 border-b pb-2">{category}</h2>
                        <Accordion type="single" collapsible className="w-full">
                             {faqs.map((faq, index) => (
                                <AccordionItem value={`${category}-${index}`} key={`${category}-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                                    {faq.answer}
                                </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
                </Accordion>
            ): (
                <div className="text-center text-muted-foreground py-16">
                    <p>{t({ en: "No matching questions found.", hi: "कोई मेल खाने वाला प्रश्न नहीं मिला।" })}</p>
                    <p className="text-sm">{t({ en: "Try searching with different keywords.", hi: "विभिन्न कीवर्ड के साथ खोजने का प्रयास करें।"})}</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
