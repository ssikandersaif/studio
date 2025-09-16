"use client";

import { MainNav } from "@/components/main-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Sprout } from "lucide-react"
import { motion } from "framer-motion"
import { WelcomeDialog } from "@/components/welcome-dialog";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

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
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          <WelcomeDialog />
          {children}
        </motion.div>
      </SidebarInset>
    </SidebarProvider>
  )
}
