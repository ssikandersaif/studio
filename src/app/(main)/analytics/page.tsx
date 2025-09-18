"use client";

import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardChart } from "@/components/dashboard-chart";
import { useLanguage } from "@/contexts/language-context";
import { BarChart } from "lucide-react";

export default function AnalyticsPage() {
    const { t } = useLanguage();

    return (
        <>
            <Header
                title={t({ en: "Crop Analytics", ml: "വിള വിശകലനം", hi: "फसल विश्लेषण" })}
                description={t({ en: "Visualize agricultural production trends across India.", ml: "ഇന്ത്യയിലുടനീളമുള്ള കാർഷിക ഉൽപാദന പ്രവണതകൾ കാണുക.", hi: "भारत भर में कृषि उत्पादन प्रवृत्तियों की कल्पना करें।" })}
            />
            <main className="flex-1 p-4 sm:px-8 sm:py-6">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <BarChart className="w-6 h-6 text-primary" />
                            <div>
                                <CardTitle className="font-headline">{t({ en: "Major Crop Production Trends (India)", hi: "प्रमुख फसल उत्पादन रुझान (भारत)", ml: "പ്രധാന വിള ഉത്പാദന പ്രവണതകൾ (ഇന്ത്യ)", ta: "முக்கிய பயிர் உற்பத்தி போக்குகள் (இந்தியா)", te: "ప్రధాన పంట ఉత్పత్తి ధోరణులు (భారతదేశం)", kn: "ಪ್ರಮುಖ ಬೆಳೆ ಉತ್ಪಾದನಾ ಪ್ರವೃತ್ತಿಗಳು (ಭಾರತ)", bn: "প্রধান ফসল উৎপাদন প্রবণতা (ভারত)", mr: "प्रमुख पीक उत्पादन ट्रेंड (भारत)", gu: "મુખ્ય પાક ઉત્પાદન વલણો (ભારત)", pa: "ਮੁੱਖ ਫਸਲ ਉਤਪਾਦਨ ਰੁਝਾਨ (ਭਾਰਤ)"})}</CardTitle>
                                <CardDescription>{t({en: "Production data in million tonnes for key crops over the last 5 years.", hi: "पिछले 5 वर्षों में प्रमुख फसलों के लिए मिलियन टन में उत्पादन डेटा।", ml: "കഴിഞ്ഞ 5 വർഷമായി പ്രധാന വിളകളുടെ ഉത്പാദന ഡാറ്റ (മില്ല്യൺ ടണ്ണിൽ).", ta: "கடந்த 5 ஆண்டுகளில் முக்கிய பயிர்களுக்கான உற்பத்தி தரவு (மில்லியன் டன்களில்).", te: "గత 5 సంవత్సరాలలో ముఖ్యమైన పంటల ఉత్పత్తి డేటా (మిలియన్ టన్నులలో).", kn: "ಕಳೆದ 5 ವರ್ಷಗಳಲ್ಲಿ ಪ್ರಮುಖ ಬೆಳೆಗಳಿಗೆ ಉತ್ಪಾದನಾ ಡೇಟಾ (ಮಿಲಿಯನ್ ಟನ್‌ಗಳಲ್ಲಿ).", bn: "গত 5 বছরে মূল ফসলের উৎপাদন তথ্য (মিলিয়ন টনে)।", mr: "मागील ५ वर्षातील महत्त्वाच्या पिकांसाठी उत्पादन डेटा (दशलक्ष टनांमध्ये).", gu: "છેલ્લા 5 વર્ષમાં મુખ્ય પાકો માટે ઉત્પાદન ડેટા (મિલિયન ટનમાં).", pa: "ਪਿਛਲੇ 5 ਸਾਲਾਂ ਵਿੱਚ ਮੁੱਖ ਫਸਲਾਂ ਲਈ ਉਤਪਾਦਨ ਡੇਟਾ (ਮਿਲੀਅਨ ਟਨ ਵਿੱਚ)।"})}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[450px]">
                        <DashboardChart />
                    </CardContent>
                </Card>
            </main>
        </>
    )
}
