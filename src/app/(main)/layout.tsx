
"use client";

import { usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Sprout } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { WelcomeDialog } from "@/components/welcome-dialog";
import { Footer } from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
           <div className="flex items-center gap-2 p-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary font-headline group-data-[collapsible=icon]:hidden">
              Krishi Mitra
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col bg-background/95 supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur-xl">
         <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex-grow flex flex-col"
            >
              <WelcomeDialog />
              {children}
            </motion.div>
         </AnimatePresence>
        {pathname === '/dashboard' && <Footer />}
      </SidebarInset>
    </SidebarProvider>
  )
}
