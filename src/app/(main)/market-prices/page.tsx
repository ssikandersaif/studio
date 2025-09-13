"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { mockCropPrices } from "@/lib/data";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/language-context";
import { Search } from "lucide-react";

export default function MarketPricesPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const lastUpdated = format(new Date(), "MMMM d, yyyy");

  const filteredPrices = useMemo(() => {
    if (!searchTerm) {
      return mockCropPrices;
    }
    return mockCropPrices.filter(
      (price) =>
        price.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.mandi.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <>
      <Header
        title={t({ en: "Market Prices", ml: "വിപണി വിലകൾ", hi: "बाजार मूल्य", ta: "சந்தை விலைகள்", te: "మార్కెట్ ధరలు", kn: "ಮಾರುಕಟ್ಟೆ ధరಗಳು", bn: "বাজারদর", mr: "बाजारभाव", gu: "બજારભાવ", pa: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ" })}
        description={t({ en: "Real-time prices from eNAM and local mandis.", ml: "eNAM, ലോക്കൽ മണ്ടികളിൽ നിന്നുള്ള തത്സമയ വിലകൾ.", hi: "ई-नाम और स्थानीय मंडियों से वास्तविक समय की कीमतें।", ta: "eNAM மற்றும் உள்ளூர் மండిகளில் இருந்து நிகழ் நேர விலைகள்.", te: "eNAM మరియు స్థానిక मंडीల నుండి నిజ-समय ధరలు.", kn: "eNAM మరియు ಸ್ಥಳೀಯ ಮಂಡಿಗಳಿಂದ ನೈಜ-സമಯದ ಬೆಲೆಗಳು.", bn: "eNAM এবং স্থানীয় मंडी থেকে রিয়েল-টাইম نرخ।", mr: "eNAM आणि स्थानिक मंडीतून वास्तविक वेळेचे भाव.", gu: "eNAM અને સ્થાનિક મંડીઓમાંથી વાસ્તવિક-સમયના ભાવો.", pa: "ਈਨਾਮ ਅਤੇ ਸਥਾਨਕ ਮੰਡੀਆਂ ਤੋਂ ਅਸਲ-ਸਮੇਂ ਦੀਆਂ ਕੀਮਤਾਂ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <CardTitle>{t({ en: "Today's Commodity Prices", ml: "ഇന്നത്തെ ചരക്ക് വിലകൾ", hi: "आज की वस्तु कीमतें", ta: "இன்றைய சரக்கு விலைகள்", te: "ఈరోజు వస్తువుల ధరలు", kn: "ಇಂದಿನ ಸರಕುಗಳ ಬೆಲೆಗಳು", bn: "আজকের পণ্যের দাম", mr: "आजचे वस्तूंचे भाव", gu: "આજના કોમોડિટીના ભાવ", pa: "ਅੱਜ ਦੀਆਂ ਵਸਤਾਂ ਦੀਆਂ ਕੀਮਤਾਂ" })}</CardTitle>
                <CardDescription>{t({ en: "Last updated", ml: "അവസാനമായി അപ്ഡേറ്റ് ചെയ്തത്", hi: "अंतिम अपडेट", ta: "கடைசியாக புதுப்பிக்கப்பட்டது", te: "చివరిగా నవీకరించబడింది", kn: "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ", bn: "শেষ আপডেট", mr: "शेवटचे अपडेट", gu: "છેલ્લે અપડેટ થયું", pa: "ਆਖਰੀ ਅੱਪਡੇਟ" })}: {lastUpdated}</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t({ en: "Search commodity, variety, or mandi...", ml: "ചരക്ക്, ഇനം, അല്ലെങ്കിൽ മണ്ടി തിരയുക...", hi: "वस्तु, किस्म, या मंडी खोजें...", ta: "பண்டம், வகை, அல்லது மண்டி தேடவும்...", te: "వస్తువు, వెరైటీ, లేదా మండి శోధించండి...", kn: "ಸರಕು, ವೈವಿಧ್ಯ, ಅಥವಾ ಮಂಡಿ ಹುಡುಕಿ...", bn: "পণ্য, প্রকার, বা मंडी অনুসন্ধান করুন...", mr: "वस्तू, प्रकार, किंवा मंडी शोधा...", gu: "કોમોડિટી, વિવિધતા, અથવા મંડી શોધો...", pa: "ਵਸਤੂ, ਕਿਸਮ, ਜਾਂ ਮੰਡੀ ਖੋਜੋ..." })}
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t({ en: "Commodity", ml: "ചരക്ക്", hi: "वस्तु", ta: "சரக்கு", te: "వస్తువు", kn: "ಸರಕು", bn: "পণ্য", mr: "वस्तू", gu: "કોમોડિટી", pa: "ਵਸਤੂ" })}</TableHead>
                    <TableHead>{t({ en: "Mandi", ml: "മണ്ടി", hi: "मंडी", ta: "மண்டி", te: "మंडी", kn: "ಮಂಡಿ", bn: "मंडी", mr: "मंडी", gu: "મंडी", pa: "ਮੰडी" })}</TableHead>
                    <TableHead className="text-right">{t({ en: "Min Price (₹/Quintal)", ml: "കുറഞ്ഞ വില (₹/ക്വിന്റൽ)", hi: "न्यूनतम मूल्य (₹/क्विंटल)", ta: "குறைந்தபட்ச விலை (₹/ குவிண்டால்)", te: "కనీస ధర (₹/క్వింటాల్)", kn: "ಕನಿಷ್ಠ ಬೆಲೆ (₹/ಕ್ವಿಂಟಾಲ್)", bn: "সর্বনিম্ন মূল্য (₹/কুইন্টাল)", mr: "किमान किंमत (₹/क्विंटल)", gu: "ન્યૂનતમ ભાવ (₹/ક્વિंटલ)", pa: "ਘੱਟੋ-ਘੱਟ ਕੀਮਤ (₹/ਕ्वਿੰਟਲ)" })}</TableHead>
                    <TableHead className="text-right">{t({ en: "Max Price (₹/Quintal)", ml: " കൂടിയ വില (₹/ക്വിന്റൽ)", hi: "अधिकतम मूल्य (₹/क्विंटल)", ta: "அதிகபட்ச விலை (₹/ குவிண்டால்)", te: "గరిష్ట ధర (₹/క్వింటాల్)", kn: "ಗರಿಷ್ಠ ಬೆಲೆ (₹/ಕ್ವಿಂಟಲ್)", bn: "সর্বোচ্চ মূল্য (₹/কুইন্টাল)", mr: "कमाल किंमत (₹/क्uintal)", gu: "મહત્તમ ભાવ (₹/ક્વિंटલ)", pa: "ਵੱਧ ਤੋਂ ਵੱਧ ਕੀਮਤ (₹/ਕ्वਿੰਟਲ)" })}</TableHead>
                    <TableHead className="text-right">{t({ en: "Modal Price (₹/Quintal)", ml: "मोடல் വില (₹/ക്വിന്റൽ)", hi: "मॉडल मूल्य (₹/क्विंटल)", ta: "மாதிரி விலை (₹/ குவிண்டால்)", te: "మోడల్ ధర (₹/క్వింటాల్)", kn: "ಮಾದರಿ ಬೆಲೆ (₹/ಕ್ವಿಂಟಲ್)", bn: "মডেল মূল্য (₹/কুইন্টাল)", mr: "मॉडेल किंमत (₹/क्विंटल)", gu: "મોડેલ ભાવ (₹/ક્વિंटal)", pa: "ਮਾਡਲ ਕੀਮਤ (₹/ਕ्वਿੰਟਲ)" })}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrices.length > 0 ? (
                    filteredPrices.map((price) => (
                      <TableRow key={price.id}>
                        <TableCell>
                          <div className="font-medium">{price.name}</div>
                          <div className="text-sm text-muted-foreground">{price.variety}</div>
                        </TableCell>
                        <TableCell>{price.mandi}</TableCell>
                        <TableCell className="text-right text-red-600 dark:text-red-400">{price.minPrice.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="text-right text-green-600 dark:text-green-400">{price.maxPrice.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="text-right font-bold text-primary">{price.modalPrice.toLocaleString('en-IN')}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">
                        {t({ en: "No matching results found.", ml: "പൊരുത്തപ്പെടുന്ന ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.", hi: "कोई मेल नहीं मिला।", ta: "பொருத்தமான முடிவுகள் எதுவும் கிடைக்கவில்லை.", te: "సరిపోలే ఫలితాలు కనుగొనబడలేదు.", kn: "ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.", bn: "কোনো মিলে যাওয়া ফলাফল পাওয়া যায়নি।", mr: "कोणतेही जुळणारे परिणाम आढळले नाहीत.", gu: "કોઈ મેળ ખાતા પરિણામો મળ્યા નથી.", pa: "ਕੋਈ ਮੇਲ ਖਾਂਦੇ ਨਤੀਜੇ ਨਹੀਂ ਮਿਲੇ।" })}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
