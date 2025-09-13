import { SidebarTrigger } from "@/components/ui/sidebar"
import { LanguageSwitcher } from "./language-switcher"
import { UserNav } from "./user-nav"
import { Separator } from "./ui/separator"

interface HeaderProps {
  title: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-8">
            <SidebarTrigger className="md:hidden" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">{title}</h1>
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            <div className="ml-auto flex items-center space-x-4">
                <LanguageSwitcher />
                <UserNav />
            </div>
        </div>
        <Separator />
    </header>
  )
}
