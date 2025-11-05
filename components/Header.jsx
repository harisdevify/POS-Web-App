"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toogle"

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-background shadow-sm">
      {/* 🔹 Left side: Sidebar toggle + title */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Hello Header</h1>
      </div>

      {/* 🔹 Right side: Dark/Light mode toggle */}
      <div className="flex items-center gap-3">
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
