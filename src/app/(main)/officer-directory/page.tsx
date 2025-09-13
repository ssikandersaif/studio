import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockOfficers } from "@/lib/data";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function OfficerDirectoryPage() {
  const officers = mockOfficers;
  const { t } = useLanguage();

  return (
    <>
      <Header
        title={t({ en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका", ta: "அதிகாரி డైరెక్టరీ", te: "అధికారి డైరెక్టరీ", kn: "ಅధికಾರಿ ಡೈರೆಕ್ಟರಿ", bn: "কর্মকর্তা निर्देशिका", mr: "अधिकारी निर्देशिका", gu: "અધિકारी નિર્દેશિકਾ", pa: "ਅਧਿਕਾਰੀ ਡਾਇਰੈਕਟਰੀ" })}
        description={t({ en: "Connect with local agricultural officers for expert guidance.", ml: "വിദഗ്ദ്ധ മാർഗ്ഗനിർദ്ദേശത്തിനായി പ്രാദേശിക കാർഷിക ഉദ്യോഗസ്ഥരുമായി ബന്ധപ്പെടുക.", hi: "विशेषज्ञ मार्गदर्शन के लिए स्थानीय कृषि अधिकारियों से जुड़ें।", ta: "நிபுணர் வழிகாட்டுதலுக்காக உள்ளூர் nông nghiệp அதிகாரிகளுடன் இணையுங்கள்.", te: "నిపుణుల మార్గదర్శకత్వం కోసం స్థానిక వ్యవసాయ అధికారులతో కనెక్ట్ అవ్వండి.", kn: "ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಸ್ಥಳೀಯ ಕೃಷಿ અધિકારીಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.", bn: "বিশেষজ্ঞদের मार्गदर्शনের জন্য স্থানীয় কৃষি அதிகாரীদের সাথে সংযোগ করুন।", mr: "तज्ञ मार्गदर्शनासाठी स्थानिक कृषी अधिकाऱ्यांशी संपर्क साधा.", gu: "નિષ્ણાત માર્ગદર્શન માટે સ્થાનિક કૃષि અધિકારીઓ સાથે જોડાઓ.", pa: "ਮਾਹਰ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਜੁੜੋ।" })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <Card>
          <CardHeader>
            <CardTitle>{t({ en: "Local Agricultural Officers", ml: "പ്രാദേശിക കാർഷിക ഉദ്യോഗസ്ഥർ", hi: "स्थानीय कृषि अधिकारी", ta: "உள்ளூர் कृषि अधिकारी", te: "స్థానిక వ్యవసాయ అధికారులు", kn: "ಸ್ಥಳೀಯ ಕೃಷಿ अधिकारी", bn: "স্থানীয় কৃষি अधिकारी", mr: "स्थानिक कृषी अधिकारी", gu: "સ્થਾਨિક કૃષि અધિકારીઓ", pa: "ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਅਫਸਰ" })}</CardTitle>
            <CardDescription>
              {t({ en: "Find contact information for officers in your region.", ml: "നിങ്ങളുടെ പ്രദേശത്തെ ഉദ്യോഗസ്ഥരുടെ കോൺടാക്റ്റ് വിവരങ്ങൾ കണ്ടെത്തുക.", hi: "अपने क्षेत्र के अधिकारियों के लिए संपर्क जानकारी प्राप्त करें।", ta: "உங்கள் பகுதியில் உள்ள அதிகாரிகளுக்கான தொடர்புத் தகவலைக் கண்டறியவும்.", te: "మీ ప్రాంతంలోని అధికారుల కోసం సంప్రదింపు సమాచారాన్ని కనుగొనండి.", kn: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿನ ಅಧಿಕಾರಿಗಳಿಗೆ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಹುಡುಕಿ.", bn: "আপনার অঞ্চলের அதிகாரীদের জন্য যোগাযোগের তথ্য খুঁজুন।", mr: "तुमच्या प्रदेशातील अधिकाऱ्यांसाठी संपर्क माहिती शोधा.", gu: "તમારા પ્રદેશના અધિકારીઓ માટે સંપર્ક માહિતી શોધો.", pa: "ਆਪਣੇ ਖੇਤਰ ਦੇ ਅਧਿਕਾਰੀਆਂ ਲਈ ਸੰਪਰਕ ਜਾਣਕਾਰੀ ਲੱਭੋ।" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {officers.map((officer) => (
                <Card key={officer.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                      <AvatarImage
                        src={officer.avatarUrl}
                        alt={officer.name}
                      />
                      <AvatarFallback>
                        {officer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-primary">
                        {officer.name}
                      </h3>
                      <p className="font-medium">{officer.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {officer.district}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col space-y-2">
                    <a href={`tel:${officer.phone}`}>
                       <Button variant="outline" className="w-full justify-start">
                        <Phone className="mr-2 h-4 w-4" />
                        {officer.phone}
                       </Button>
                    </a>
                     <a href={`mailto:${officer.email}`}>
                       <Button variant="outline" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        {officer.email}
                       </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
