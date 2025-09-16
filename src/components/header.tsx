import { SidebarTrigger } from "@/components/ui/sidebar"
import { LanguageSwitcher } from "./language-switcher"
import { Separator } from "./ui/separator"
import { ThemeSwitcher } from "./theme-switcher"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface HeaderProps {
  title: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-8">
            <SidebarTrigger />
            <div className="flex-1 overflow-hidden">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary font-headline truncate">{title}</h1>
              {description && <p className="text-sm text-muted-foreground truncate">{description}</p>}
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                <LanguageSwitcher />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>
        <Separator />
    </header>
  )
}
