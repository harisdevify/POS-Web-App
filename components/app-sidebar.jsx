"use client"

import {
  LayoutDashboard,
  Frame,
  PieChart,
  Map,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  ChevronDown,
  NotebookPen,
  Warehouse,
  Layers,
  Users,
  BookOpenText,
} from "lucide-react"
import * as React from "react"
import Link from "next/link"

import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Tayyab",
    email: "tayyabdevify@gmail.com",
    avatar: "/table.jpg",
  },
  teams: [
    { name: "POS", logo: GalleryVerticalEnd, plan: "Web App" },
    
  ],
  pages: [
    {
      title: "POS",
      url: "/pos",
      icon: Warehouse,
    },
    {
      title: "Stock",
      url: "/stock",
      icon: Layers,
    },
    {
      title: "Roles Manage",
      icon: BookOpenText,
      items: [
        { title: "Roles", url: "/roles-manage/roles" },
        { title: "Role Madules", url: "/roles-manage/role-madules" },
        { title: "Assign Roles", url: "/roles-manage/assign-roles" },
        { title: "All Staff", url: "/roles-manage/all-staff" },
      ],
    },
    {
      title: "Products",
      icon: NotebookPen,
      items: [
        { title: "Products", url: "/products" },
        { title: "Add Product", url: "/products/add-product" },
        { title: "Categories", url: "/products/categories" },
      ],
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
    },
    {
      title: "Suppliers",
      url: "/suppliers",
      icon: Users,
    },
    {
      title: "Employees",
      url: "/employees",
      icon: Users,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
  ],
}

export function AppSidebar(props) {
  const { state } = useSidebar()
  const [openDropdown, setOpenDropdown] = React.useState(null)

  const toggleDropdown = (title) => {
    setOpenDropdown((prev) => (prev === title ? null : title))
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      {/* Main content */}
      <SidebarContent>
        {/* Dashboard */}
        <Link
          href="/"
          className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors
          ${state === "collapsed" ? "justify-center" : "gap-2"}`}
        >
          <LayoutDashboard className="h-4 w-4" />
          {state !== "collapsed" && <span>Dashboard</span>}
        </Link>

        {/* Divider */}
        <div className="my-2 border-t border-border" />

        {/* Pages */}
        {data.pages.map((page) => (
          <div key={page.title}>
            {!page.items ? (
              <Link
                href={page.url}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors
                ${state === "collapsed" ? "justify-center" : "gap-2"}`}
              >
                <page.icon className="h-4 w-4" />
                {state !== "collapsed" && <span>{page.title}</span>}
              </Link>
            ) : (
              <>
                {/* Dropdown */}
                <button
                  onClick={() => toggleDropdown(page.title)}
                  className={`w-full flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors
                  ${state === "collapsed" ? "justify-center" : "gap-2"}`}
                >
                  <page.icon className="h-4 w-4" />
                  {state !== "collapsed" && (
                    <>
                      <span className="flex-1 text-left">{page.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === page.title ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                {openDropdown === page.title && state !== "collapsed" && (
                  <div className="ml-6 mt-1 space-y-1">
                    {page.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className="block rounded-md px-3 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
