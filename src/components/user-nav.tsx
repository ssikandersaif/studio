
"use client";

import Link from "next/link";
import {
  User,
  Settings,
  Info,
  LogOut
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { ThemeSwitcher } from "./theme-switcher"
import { useToast } from "@/hooks/use-toast";


export function UserNav() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return null;
  }
  
  const handleLogout = () => {
    // In a real app, you'd call your auth context's logout function.
    // For now, we'll just show a toast notification.
    toast({
      title: t({ en: "Logged Out", hi: "लॉग आउट" }),
      description: t({ en: "You have been successfully logged out.", hi: "आप सफलतापूर्वक लॉग आउट हो गए हैं।" }),
    });
  };


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
          <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t({ en: "Profile", hi: "प्रोफ़ाइल" })}</span>
          </DropdownMenuItem>
           <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t({en: "Settings", hi: "सेटिंग्स"})}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48">
                    <ThemeSwitcher />
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
                      <Link href="/faq">
                        <DropdownMenuItem>
                          {t({ en: "Help & FAQ", hi: "सहायता और सामान्य प्रश्न" })}
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem onClick={() => toast({ title: t({en: "Coming Soon!", hi: "जल्द आ रहा है!"})})}>
                        {t({ en: "Contact Support", hi: "समर्थन से संपर्क करें" })}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({ title: t({en: "App Version 1.0", hi: "ऐप संस्करण 1.0"})})}>
                        {t({ en: "App Version Info", hi: "ऐप संस्करण जानकारी" })}
                      </DropdownMenuItem>
                  </DropdownMenuSubContent>
              </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t({en: "Log out", hi: "लॉग आउट"})}</span>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
