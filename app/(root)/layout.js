import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

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
          <div className="flex flex-col flex-1 transition-all duration-300 ease-in-out h-screen overflow-hidden">
            <Header />
            <div className="flex-1 overflow-y-auto body">
              <main className="min-h-[calc(100vh-100px)] p-4">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default Layout;
