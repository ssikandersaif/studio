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
      label: t({en: "Dashboard", ml: "ഡാഷ്ബോർഡ്", hi: "डैशबोर्ड"}),
      icon: <LayoutGrid />,
    },
    {
      href: "/market-prices",
      label: t({en: "Market Prices", ml: "വിപണി വിലകൾ", hi: "बाजार मूल्य"}),
      icon: <DollarSign />,
    },
    {
      href: "/weather",
      label: t({en: "Weather", ml: "കാലാവസ്ഥ", hi: "मौसम"}),
      icon: <CloudSun />,
    },
    {
      href: "/crop-doctor",
      label: t({en: "Crop Doctor", ml: "വിള ഡോക്ടർ", hi: "फ़सल डॉक्टर"}),
      icon: <Stethoscope />,
    },
    {
      href: "/scan-crop",
      label: t({en: "Scan Crop", ml: "വിള സ്കാൻ", hi: "फ़सल स्कैन"}),
      icon: <ScanLine />,
    },
    {
      href: "/voice-query",
      label: t({en: "Voice Query", ml: "ശബ്ദ ചോദ്യം", hi: "आवाज प्रश्न"}),
      icon: <Mic />,
    },
    {
      href: "/govt-schemes",
      label: t({en: "Govt. Schemes", ml: "സർക്കാർ പദ്ധതികൾ", hi: "सरकारी योजनाएं"}),
      icon: <ScrollText />,
    },
    {
      href: "/officer-directory",
      label: t({en: "Officer Directory", ml: "ഓഫീസർ ഡയറക്ടറി", hi: "अधिकारी निर्देशिका"}),
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
