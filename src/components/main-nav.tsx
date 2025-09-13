"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import {
  CloudSun,
  DollarSign,
  LayoutGrid,
  Mic,
  ScanLine,
  ScrollText,
  Stethoscope,
  Users,
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function MainNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const menuItems = [
    {
      href: "/dashboard",
      label: t({en: "Dashboard", ml: "ഡാഷ്ബോർഡ്", hi: "डैशबोर्ड", ta: "டாஷ்போர்டு", te: "డాష్‌బోర్ഡ്", kn: "ഡാഷ്ബോർഡ്", bn: "ড্যাশবোর্ড", mr: "डॅशबोर्ड", gu: "ડેશબોર્ડ", pa: "ਡੈਸ਼ਬੋਰਡ"}),
      icon: <LayoutGrid />,
    },
    {
      href: "/market-prices",
      label: t({en: "Market Prices", ml: "വിപണി വിലകൾ", hi: "बाजार मूल्य", ta: "சந்தை விலைகள்", te: "మార్కెట్ ధరలు", kn: "ಮಾರುಕಟ್ಟೆ ధరಗಳು", bn: "বাজারদর", mr: "बाजारभाव", gu: "બજારભાવ", pa: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ"}),
      icon: <DollarSign />,
    },
    {
      href: "/weather",
      label: t({en: "Weather", ml: "കാലാവസ്ഥ", hi: "मौसम", ta: "வானிலை", te: "వాతావरणం", kn: "ಹವಾಮಾನ", bn: "আবহাওয়া", mr: "हवामान", gu: "હવામાન", pa: "ਮੌਸم"}),
      icon: <CloudSun />,
    },
    {
      href: "/crop-doctor",
      label: t({en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर", ta: "பயிர் மருத்துவர்", te: "పంట மருத்துவர்", kn: "ಬೆಳೆ ವೈದ್ಯ", bn: "ফसल ডাক্তার", mr: "पीक डॉक्टर", gu: "પાક ડોક્ટર", pa: "ਫਸਲ ਡਾਕਟਰ"}),
      icon: <Stethoscope />,
    },
    {
      href: "/scan-crop",
      label: t({en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन", ta: "பயிர் స్కాన్", te: "పంట స్కాన్", kn: "ಬೆಳೆ స్కాన్", bn: "ফसल স্ক্যান", mr: "पीक स्कॅन", gu: "પાક સ્કેન", pa: "ਫਸਲ ਸਕੈਨ"}),
      icon: <ScanLine />,
    },
    {
      href: "/voice-query",
      label: t({en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न", ta: "குரல் கேள்வி", te: "వాయిస్ ప్రశ్న", kn: "ಧ್vni ಪ್ರಶ್ನೆ", bn: "ভয়েস কোয়েরি", mr: "आवाज प्रश्न", gu: "અવાજ ક્વેरी", pa: "ਅਵਾਜ਼ ਸਵਾਲ"}),
      icon: <Mic />,
    },
    {
      href: "/govt-schemes",
      label: t({en: "Govt. Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं", ta: "அரசு திட்டங்கள்", te: "ప్రభుత్వ పథకాలు", kn: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", bn: "सरकारी योजना", mr: "सरकारी योजना", gu: "સરકારી યોજનાઓ", pa: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ"}),
      icon: <ScrollText />,
    },
    {
      href: "/officer-directory",
      label: t({en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका", ta: "அதிகாரி డైరెక్టరీ", te: "అధికారి డైరెక్టరీ", kn: "ಅధికಾರಿ ಡೈರೆಕ್ಟರಿ", bn: "কর্মকর্তা निर्देशिका", mr: "अधिकारी निर्देशिका", gu: "અધિકारी નિર્દેશિકા", pa: "ਅਧਿਕਾਰੀ ਡਾਇਰੈਕਟਰੀ"}),
      icon: <Users />,
    },
  ]

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
         <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            className="font-semibold"
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
