
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { QueryProvider } from "@/components/auth/providers/QueryProvider";
import { AuthProvider } from "@/components/auth/providers/AuthProvider";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { ToastProvider } from "@/components/toast/ToastProvider";
import { KeyboardNavigationProvider } from "@/components/providers/KeyboardNavigationProvider";

const App = () => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <BrowserRouter>
          <ThemeProvider>
            <TooltipProvider>
              <ToastProvider>
                <AuthProvider>
                  <AdminSidebarProvider>
                    <KeyboardNavigationProvider>
                      <RootLayout>
                        <AppRoutes />
                      </RootLayout>
                    </KeyboardNavigationProvider>
                  </AdminSidebarProvider>
                </AuthProvider>
              </ToastProvider>
            </TooltipProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default App;
