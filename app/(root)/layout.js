import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"

const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />

          <main className="flex-1">
            {/* ✅ Header already contains SidebarTrigger & ModeToggle */}
            <Header />
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}

export default Layout
