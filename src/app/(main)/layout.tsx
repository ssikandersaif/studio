"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarFooter
} from "@/components/ui/sidebar"
import { Sprout } from "lucide-react"
import { motion } from "framer-motion"
import { WelcomeDialog } from "@/components/welcome-dialog";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
           <div className="flex items-center gap-2 p-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap transition-all group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:delay-0 delay-200 text-2xl font-bold text-primary font-headline">
              Krishi Mitra
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          {/* UserNav was here */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex min-h-screen flex-col bg-background/95 supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur-xl">
         <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-grow flex flex-col"
          >
            {children}
          </motion.div>
          {isClient && <WelcomeDialog />}
      </SidebarInset>
    </SidebarProvider>
  )
}
