
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { PublicErrorBoundary } from "@/components/shared/error-handling/PublicErrorBoundary";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { QueryProvider } from "@/components/auth/providers/QueryProvider";
import { AuthProvider } from "@/components/auth/providers/AuthProvider";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { ToastProvider } from "@/components/toast/ToastProvider";
import { KeyboardNavigationProvider } from "@/components/providers/KeyboardNavigationProvider";
import { StoreProvider } from "@/lib/store/providers/StoreProvider";

const App = () => {
  return (
    <PublicErrorBoundary>
      <QueryProvider>
        <BrowserRouter>
          <StoreProvider>
            <ThemeProvider>
              <TooltipProvider>
                <ToastProvider>
                  <AuthProvider>
                    <AdminSidebarProvider>
                      <KeyboardNavigationProvider>
                        <RootLayout>
                          <ErrorBoundary>
                            <AppRoutes />
                          </ErrorBoundary>
                        </RootLayout>
                      </KeyboardNavigationProvider>
                    </AdminSidebarProvider>
                  </AuthProvider>
                </ToastProvider>
              </TooltipProvider>
            </ThemeProvider>
          </StoreProvider>
        </BrowserRouter>
      </QueryProvider>
    </PublicErrorBoundary>
  );
};

export default App;
