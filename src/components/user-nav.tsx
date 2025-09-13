"use client";

import Link from "next/link";
import {
  User,
  Tractor,
  LineChart,
  Sprout,
  DollarSign,
  Globe,
  Bell,
  Mic,
  Smartphone,
  Lock,
  Cloud,
  Users,
  Info,
  Settings,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { ThemeSwitcher } from "./theme-switcher"

export function UserNav() {
  const { t } = useLanguage();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const profileSections = [
    {
      icon: <User className="mr-2 h-4 w-4" />,
      title: t({ en: "Personal Information", hi: "व्यक्तिगत जानकारी" }),
      options: [
        t({ en: "Edit Name & Photo" }),
        t({ en: "Contact Details (Phone, Email)" }),
        t({ en: "Farmer ID/Registration Number" }),
        t({ en: "Language Preference" }),
        t({ en: "Location/Address" }),
      ],
    },
    {
      icon: <Tractor className="mr-2 h-4 w-4" />,
      title: t({ en: "Farm Details", hi: "खेत का विवरण" }),
      options: [
        t({ en: "Farm Size & Location" }),
        t({ en: "Soil Type & Quality" }),
        t({ en: "Water Source & Irrigation" }),
        t({ en: "Current Crops Growing" }),
        t({ en: "Farming Experience Level" }),
      ],
    },
    {
      icon: <LineChart className="mr-2 h-4 w-4" />,
      title: t({ en: "Dashboard", hi: "डैशबोर्ड" }),
      options: [
        t({ en: "My Query History" }),
        t({ en: "Saved Responses" }),
        t({ en: "Bookmarked Advice" }),
        t({ en: "Progress Tracking" }),
        t({ en: "Yield Records" }),
      ],
    },
    {
      icon: <Sprout className="mr-2 h-4 w-4" />,
      title: t({ en: "Crop Management", hi: "फसल प्रबंधन" }),
      options: [
        t({ en: "Active Crops List" }),
        t({ en: "Planting Calendar" }),
        t({ en: "Harvest Schedule" }),
        t({ en: "Crop Health Status" }),
        t({ en: "Pest/Disease History" }),
      ],
    },
    {
      icon: <DollarSign className="mr-2 h-4 w-4" />,
      title: t({ en: "Financial Tracking", hi: "वित्तीय ट्रैकिंग" }),
      options: [
        t({ en: "Income/Expense Records" }),
        t({ en: "Market Price Alerts" }),
        t({ en: "Government Scheme Status" }),
        t({ en: "Subsidy Applications" }),
        t({ en: "Profit/Loss Analysis" }),
      ],
    },
  ];

  const settingsSections = [
    {
      icon: <Globe className="mr-2 h-4 w-4" />,
      title: t({ en: "Location & Language", hi: "स्थान और भाषा" }),
      options: [
        t({ en: "Auto-Detect Location (ON/OFF)" }),
        t({ en: "Set Manual Location" }),
        t({ en: "Primary Language Selection" }),
        t({ en: "Secondary Language Option" }),
        t({ en: "Regional Dialect Settings" }),
      ],
    },
    {
      icon: <Bell className="mr-2 h-4 w-4" />,
      title: t({ en: "Notifications", hi: "सूचनाएं" }),
      options: [
        t({ en: "Weather Alerts (ON/OFF)" }),
        t({ en: "Market Price Updates" }),
        t({ en: "Pest Outbreak Warnings" }),
        t({ en: "Seasonal Reminders" }),
        t({ en: "Officer Messages" }),
        t({ en: "System Updates" }),
      ],
    },
    {
      icon: <Mic className="mr-2 h-4 w-4" />,
      title: t({ en: "Voice & Speech", hi: "आवाज और भाषण" }),
      options: [
        t({ en: "Voice Input (Enable/Disable)" }),
        t({ en: "Speech Language" }),
        t({ en: "Voice Sensitivity Level" }),
        t({ en: "Text-to-Speech Settings" }),
        t({ en: "Auto-Play Responses" }),
      ],
    },
    {
      icon: <Smartphone className="mr-2 h-4 w-4" />,
      title: t({ en: "App Preferences", hi: "ऐप प्राथमिकताएं" }),
      options: [
        t({ en: "Theme (Light/Dark Mode)" }),
        t({ en: "Font Size (Small/Medium/Large)" }),
        t({ en: "Data Usage (WiFi Only/Mobile Data)" }),
        t({ en: "Offline Mode Settings" }),
        t({ en: "Auto-Save Queries" }),
      ],
    },
    {
      icon: <Lock className="mr-2 h-4 w-4" />,
      title: t({ en: "Privacy & Security", hi: "गोपनीयता और सुरक्षा" }),
      options: [
        t({ en: "Data Sharing Preferences" }),
        t({ en: "Location Privacy" }),
        t({ en: "Photo Storage Settings" }),
        t({ en: "Account Security" }),
        t({ en: "Delete Account Option" }),
      ],
    },
    {
      icon: <Cloud className="mr-2 h-4 w-4" />,
      title: t({ en: "Data & Sync", hi: "डेटा और सिंक" }),
      options: [
        t({ en: "Cloud Backup (ON/OFF)" }),
        t({ en: "Auto-Sync Settings" }),
        t({ en: "Export My Data" }),
        t({ en: "Clear Cache" }),
        t({ en: "Storage Usage" }),
      ],
    },
    {
      icon: <Users className="mr-2 h-4 w-4" />,
      title: t({ en: "Officer Connection", hi: "अधिकारी कनेक्शन" }),
      options: [
        t({ en: "Nearby Officers List" }),
        t({ en: "Preferred Contact Method" }),
        t({ en: "Availability Hours" }),
        t({ en: "Emergency Contact Priority" }),
        t({ en: "Consultation History" }),
      ],
    },
  ];


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
            <DropdownMenuLabel>{t({en: "Profile", hi: "प्रोफ़ाइल"})}</DropdownMenuLabel>
            {profileSections.map((section, index) => (
                <DropdownMenuSub key={index}>
                    <DropdownMenuSubTrigger>
                        {section.icon}
                        <span>{section.title}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-56">
                            {section.options.map((option, i) => (
                                <DropdownMenuItem key={i}>{option}</DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            ))}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t({en: "Settings", hi: "सेटिंग्स"})}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-64">
                         {settingsSections.map((section, index) => (
                            <DropdownMenuSub key={index}>
                                <DropdownMenuSubTrigger>
                                    {section.icon}
                                    <span>{section.title}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="w-56">
                                        {section.options.map((option, i) => (
                                            <DropdownMenuItem key={i}>{option}</DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        ))}
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Info className="mr-2 h-4 w-4" />
                    <span>{t({ en: "Support & Info", hi: "सहायता और जानकारी" })}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-56">
                        <Link href="/faq"><DropdownMenuItem>{t({ en: "Help & Tutorials", hi: "सहायता और ट्यूटोरियल" })}</DropdownMenuItem></Link>
                        <DropdownMenuItem>{t({ en: "Contact Support", hi: "समर्थन से संपर्क करें" })}</DropdownMenuItem>
                        <DropdownMenuItem>{t({ en: "App Version Info", hi: "ऐप संस्करण जानकारी" })}</DropdownMenuItem>
                        <DropdownMenuItem>{t({ en: "Terms & Privacy Policy", hi: "नियम और गोपनीयता नीति" })}</DropdownMenuItem>
                        <DropdownMenuItem>{t({ en: "Feedback & Ratings", hi: "प्रतिक्रिया और रेटिंग" })}</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>

        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <ThemeSwitcher />

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

    