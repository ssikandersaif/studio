"use client";

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
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { ThemeSwitcher } from "./theme-switcher"

export function UserNav() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

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
      <DropdownMenuContent className="w-56" align="end" forceMount>
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
          <DropdownMenuItem>
            {t({ en: "Profile", ml: "പ്രൊഫൈൽ", hi: "प्रोफ़ाइल", ta: "சுயவிவரம்", te: "ప్రొఫైల్", kn: "ಪ್ರೊಫೈಲ್", bn: "প্রোফাইল", mr: "प्रोफाइल", gu: "પ્રોફાઇલ", pa: "ਪ੍ਰੋਫਾਈਲ" })}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {t({ en: "Settings", ml: "ക്രമീകരണങ്ങൾ", hi: "सेटिंग्स", ta: "அமைப்புகள்", te: "సెట్టింగ్స్", kn: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", bn: "সেটিংস", mr: "सेटिंग्ज", gu: "સેટિંગ્સ", pa: "ਸੈਟਿੰਗਾਂ" })}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ThemeSwitcher />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          {t({ en: "Log out", ml: "ലോഗ് ഔട്ട്", hi: "लॉग आउट", ta: "வெளியேறு", te: "లాగ్ అవుట్", kn: "ಲಾಗ್ ಔట్", bn: "লగ్ আউট", mr: "लॉग आउट", gu: "લૉગ આઉટ", pa: "ਲਾਗ ਆਊਟ" })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
