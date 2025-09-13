"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
     <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <div className="flex items-center justify-between w-full">
        <span>Theme</span>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setTheme("light")}><Sun /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setTheme("dark")}><Moon /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setTheme("system")}><Monitor /></Button>
        </div>
      </div>
    </DropdownMenuItem>
  )
}
