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
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Sprout className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary font-headline">AgriMitra</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
