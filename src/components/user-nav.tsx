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

export function UserNav() {
  const { t } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{t({ en: "Farmer", ml: "കർഷകൻ", hi: "किसान", ta: "விவசாயி", te: "రైతు", kn: "ರైತ", bn: "কৃষক", mr: "शेतकरी", gu: "ખેડૂત", pa: "ਕिसान" })}</p>
            <p className="text-xs leading-none text-muted-foreground">
              farmer@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {t({ en: "Profile", ml: "പ്രൊഫൈல்", hi: "प्रोफ़ाइल", ta: "சுயவிவரം", te: "ప్రൊഫൈల్", kn: "ಪ್ರೊಫైಲ್", bn: "প্রোফাইল", mr: "प्रोफाइल", gu: "પ્રોફाइल", pa: "ਪ੍ਰੋਫਾਈਲ" })}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {t({ en: "Settings", ml: "ക്രമീകരണങ്ങൾ", hi: "सेटिंग्स", ta: "அமைப்புகள்", te: "सेटिंग्स", kn: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", bn: "সেটিংস", mr: "सेटिंग्ज", gu: "સેટિંગ્સ", pa: "ਸੈਟਿੰਗਾਂ" })}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {t({ en: "Log out", ml: "ലോഗ് ഔട്ട്", hi: "लॉग आउट", ta: "வெளியேறு", te: "లాగ్ అవుట్", kn: "ಲಾಗ് ಔట్", bn: "লగ్ আউট", mr: "लॉग आउट", gu: "લૉગ આઉટ", pa: "ਲਾਗ ਆਊਟ" })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
