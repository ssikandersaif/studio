
"use client";

import Link from "next/link";
import { Sprout, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./ui/button";

const socialIcons = [
  { name: "Facebook", icon: "fab fa-facebook-f", href: "#" },
  { name: "Twitter", icon: "fab fa-twitter", href: "#" },
  { name: "Instagram", icon: "fab fa-instagram", href: "#" },
  { name: "LinkedIn", icon: "fab fa-linkedin-in", href: "#" },
];

export function Footer() {
  const { t } = useLanguage();

  const links = {
    about: t({ en: "About Us", hi: "हमारे बारे में", ml: "ഞങ്ങളെക്കുറിച്ച്", ta: "எங்களைப் பற்றி", te: "మా గురించి", kn: "ನಮ್ಮ ಬಗ್ಗೆ", bn: "আমাদের সম্পর্কে", mr: "आमच्याबद्दल", gu: "અમારા વિશે", pa: "ਸਾਡੇ ਬਾਰੇ" }),
    features: t({ en: "Features", hi: "विशेषताएँ", ml: "സവിശേഷതകൾ", ta: "அம்சங்கள்", te: "ఫీచర్లు", kn: "ವೈಶಿಷ್ಟ್ಯಗಳು", bn: "বৈশিষ্ট্য", mr: "वैशिष्ट्ये", gu: "વિશેષતા", pa: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ" }),
    contact: t({ en: "Contact", hi: "संपर्क करें", ml: "ബന്ധപ്പെടുക", ta: "தொடர்பு", te: "సంప్రదించండి", kn: "ಸಂಪರ್ಕಿಸಿ", bn: "যোগাযোগ", mr: "संपर्क", gu: "સંપર્ક", pa: "ਸੰਪਰਕ" }),
    faq: t({ en: "FAQ", hi: "सामान्य प्रश्न", ml: "പതിവുചോദ്യങ്ങൾ", ta: "அடிக்கடி கேட்கப்படும் கேள்விகள்", te: "తరచుగా అడిగే ప్రశ్నలు", kn: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು", bn: "সাধারণ জিজ্ঞাসিত প্রশ্ন", mr: "वारंवार विचारले जाणारे प्रश्न", gu: "વારંવાર પૂછાતા પ્રશ્નો", pa: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ" }),
    terms: t({ en: "Terms of Service", hi: "सेवा की शर्तें", ml: "സേവന നിബന്ധനകൾ", ta: "சேவை விதிமுறைகள்", te: "సేవా నిబంధనలు", kn: "ಸೇವಾ ನಿಯಮಗಳು", bn: "সেবার শর্তাবলী", mr: "सेवा अटी", gu: "સેવાની શરતો", pa: "ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ" }),
    privacy: t({ en: "Privacy Policy", hi: "गोपनीयता नीति", ml: "സ്വകാര്യതാ നയം", ta: "தனியுரிமைக் கொள்கை", te: "గోప్యతా విధానం", kn: "ಗೌಪ್ಯತಾ ನೀತಿ", bn: "গোপনীয়তা নীতি", mr: "गोपनीयता धोरण", gu: "ગોપનીયતા નીતિ", pa: "ਪਰਦੇਦਾਰੀ ਨੀਤੀ" }),
  };

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <Sprout className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary font-headline">
                  Krishi Mitra
                </h1>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                {t({
                  en: "Empowering Indian farmers with AI-driven insights and real-time data for a prosperous future.",
                  hi: "एआई-संचालित अंतर्दृष्टि और वास्तविक समय डेटा के साथ भारतीय किसानों को एक समृद्ध भविष्य के लिए सशक्त बनाना।",
                  ml: "ഐഐ-യുടെ ഉൾക്കാഴ്ചകളും തത്സമയ ഡാറ്റയും ഉപയോഗിച്ച് ഇന്ത്യൻ കർഷകരെ സമ്പന്നമായ ഭാവിക്കായി ശാക്തീകരിക്കുന്നു.",
                  ta: "ஒரு வளமான எதிர்காலத்திற்காக AI-இயக்கப்பட்ட நுண்ணறிவு மற்றும் நிகழ்நேர தரவுகளுடன் இந்திய விவசாயிகளை மேம்படுத்துதல்.",
                  te: "సంపన్నమైన భవిష్యత్తు కోసం AI-ఆధారిత అంతర్దృష్టులు మరియు నిజ-సమయ డేటాతో భారతీయ రైతులకు సాధికారత కల్పించడం.",
                  kn: "ಸಮೃದ್ಧ ಭವಿಷ್ಯಕ್ಕಾಗಿ AI-ಚಾಲಿತ ಒಳನೋಟಗಳು ಮತ್ತು ನೈಜ-ಸಮಯದ ಡೇಟಾದೊಂದಿಗೆ ಭಾರತೀಯ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.",
                  bn: "একটি সমৃদ্ধ ভবিষ্যতের জন্য এআই-চালিত অন্তর্দৃষ্টি এবং রিয়েল-টাইম ডেটা দিয়ে ভারতীয় কৃষকদের ক্ষমতায়ন।",
                  mr: "एआय-चालित अंतर्दृष्टी आणि रिअल-टाइम डेटासह भारतीय शेतकऱ्यांना समृद्ध भविष्यासाठी सक्षम करणे.",
                  gu: "સમૃદ્ધ ભવિષ્ય માટે AI-સંચાલિત આંતરદૃષ્ટિ અને રીઅલ-ટાઇમ ડેટા સાથે ભારતીય ખેડૂતોને સશક્ત બનાવવું.",
                  pa: "ਇੱਕ ਖੁਸ਼ਹਾਲ ਭਵਿੱਖ ਲਈ ਏਆਈ-ਸੰਚਾਲਿਤ ਸੂਝ ਅਤੇ ਰੀਅਲ-ਟਾਈਮ ਡੇਟਾ ਨਾਲ ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ ਸ਼ਕਤੀਕਰਨ ਕਰਨਾ।"
                })}
              </p>
              <div className="flex space-x-1">
                {socialIcons.map((social) => (
                  <Link key={social.name} href={social.href} passHref>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                      <i className={social.icon}></i>
                      <span className="sr-only">{social.name}</span>
                    </Button>
                  </Link>
                ))}
              </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-sm tracking-wide">
                {t({ en: "Quick Links", hi: "त्वरित लिंक", ml: "ദ്രുത ലിങ്കുകൾ", ta: "விரைவு இணைப்புகள்", te: "త్వరిత లింకులు", kn: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು", bn: "দ্রুত লিঙ্ক", mr: "जलद लिंक्स", gu: "ઝડપી લિંક્સ", pa: "ਤੁਰੰਤ ਲਿੰਕ" })}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">{t({ en: "Dashboard", hi: "डैशबोर्ड", ml: "ഡാഷ്ബോർഡ്", ta: "டாஷ்போர்டு", te: "డాష్‌బోర్డ్", kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", bn: "ড্যাশবোর্ড", mr: "डॅशबोर्ड", gu: "ડેશબોર્ડ", pa: "ਡੈਸ਼ਬੋਰਡ" })}</Link></li>
                <li><Link href="/market-prices" className="text-muted-foreground hover:text-primary transition-colors">{t({ en: "Market Prices", hi: "बाजार मूल्य", ml: "വിപണി വിലകൾ", ta: "சந்தை விலைகள்", te: "మార్కెట్ ధరలు", kn: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", bn: "বাজারদর", mr: "बाजारभाव", gu: "બજારભાવ", pa: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ" })}</Link></li>
                <li><Link href="/weather" className="text-muted-foreground hover:text-primary transition-colors">{t({ en: "Weather", hi: "मौसम", ml: "കാലാവസ്ഥ", ta: "வானிலை", te: "వాతావరణం", kn: "ಹವಾಮಾನ", bn: "আবহাওয়া", mr: "हवामान", gu: "હવામાન", pa: "ਮੌਸਮ" })}</Link></li>
                <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">{links.faq}</Link></li>
              </ul>
            </div>
            <div>
               <h3 className="font-semibold mb-3 text-sm tracking-wide">
                {t({ en: "Legal", hi: "कानूनी", ml: "നിയമപരമായ", ta: "சட்டപരമായ", te: "చట్టపరమైన", kn: "ಕಾನೂನು", bn: "আইনি", mr: "कायदेशीर", gu: "કાનૂની", pa: "ਕਾਨੂੰਨੀ" })}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">{links.terms}</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">{links.privacy}</Link></li>
              </ul>
            </div>
            <div>
               <h3 className="font-semibold mb-3 text-sm tracking-wide">
                {t({ en: "Contact Us", hi: "हमसे संपर्क करें", ml: "ഞങ്ങളെ ബന്ധപ്പെടുക", ta: "எங்களை தொடர்பு கொள்ள", te: "మమ్మల్ని సంప్రదించండి", kn: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", bn: "আমাদের সাথে যোগাযোগ করুন", mr: "आमच्याशी संपर्क साधा", gu: "અમારો સંપર્ક કરો", pa: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ" })}
              </h3>
              <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 shrink-0"/>
                      <a href="tel:+911234567890">+91 12345 67890</a>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 shrink-0"/>
                      <a href="mailto:contact@krishimitra.app">contact@krishimitra.app</a>
                  </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Krishi Mitra.{" "}
            {t({ en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।", ml: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.", ta: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.", te: "అన్ని హక్కులు ప్రత్యేకించబడినవి.", kn: "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.", bn: "সর্বস্বত্ব সংরক্ষিত।", mr: "सर्व हक्क राखीव.", gu: "સર્વાધિકાર સુરક્ષિત.", pa: "ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।" })}
          </p>
        </div>
      </div>
    </footer>
  );
}
