"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toogle"
import Link from "next/link"

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-3 border-b bg-background shadow-sm md:flex-nowrap">
      {/* 🔹 Left: Sidebar trigger + title */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-base sm:text-lg font-semibold">Hello Header</h1>
        </div>

        {/* 👇 Small screen right icons */}
        <div className="flex items-center gap-3 md:hidden">
          <ModeToggle />
        </div>
      </div>

      {/* 🔹 Right: Mode toggle (hidden on small, visible on md+) */}
      <div className="hidden md:flex items-center gap-3">
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
