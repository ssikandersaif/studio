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
      label: t("Dashboard", "ഡാഷ്ബോർഡ്"),
      icon: <LayoutGrid />,
    },
    {
      href: "/market-prices",
      label: t("Market Prices", "വിപണി വിലകൾ"),
      icon: <DollarSign />,
    },
    {
      href: "/weather",
      label: t("Weather", "കാലാവസ്ഥ"),
      icon: <CloudSun />,
    },
    {
      href: "/crop-doctor",
      label: t("Crop Doctor", "വിള ഡോക്ടർ"),
      icon: <Stethoscope />,
    },
    {
      href: "/scan-crop",
      label: t("Scan Crop", "വിള സ്കാൻ"),
      icon: <ScanLine />,
    },
    {
      href: "/voice-query",
      label: t("Voice Query", "ശബ്ദ ചോദ്യം"),
      icon: <Mic />,
    },
    {
      href: "/govt-schemes",
      label: t("Govt. Schemes", "സർക്കാർ പദ്ധതികൾ"),
      icon: <ScrollText />,
    },
    {
      href: "/officer-directory",
      label: t("Officer Directory", "ഓഫീസർ ഡയറക്ടറി"),
      icon: <Users />,
    },
  ]

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              className="font-semibold"
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
