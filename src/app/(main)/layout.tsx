
"use client";

import { usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Sprout } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { WelcomeDialog } from "@/components/welcome-dialog";
import { PageTransition } from "@/components/page-transition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary font-headline">Krishi Mitra</h1>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow flex flex-col"
            >
              <PageTransition />
              <WelcomeDialog />
              <div className="flex-grow">
                {children}
              </div>
            </motion.div>
         </AnimatePresence>
      </SidebarInset>
    </SidebarProvider>
  )
}
