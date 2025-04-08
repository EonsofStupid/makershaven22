
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { AuthGuard } from "@/lib/auth/AuthGuard";
import { useAuthStore } from '@/lib/store/auth-store';
import { publicRoutes } from "./public-routes";
import { makerSpaceRoutes } from "./maker-space-routes";
import { adminRoutes } from "./admin-routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import Dashboard from "@/pages/admin/dashboard";

// Lazy load admin-specific layouts
const AdminLayout = lazy(() => import('@/components/admin/layout/AdminLayout'));

export const AppRoutes = () => {
  const { isLoading } = useAuthStore();
  
  return (
    <ErrorBoundary>
      <PageTransition>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes - Always Accessible */}
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ErrorBoundary>{route.element}</ErrorBoundary>}
              />
            ))}

            {/* Protected Maker Space Routes */}
            {makerSpaceRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ErrorBoundary>
                    <AuthGuard 
                      requireAuth={true}
                      fallbackPath="/login"
                    >
                      {route.element}
                    </AuthGuard>
                  </ErrorBoundary>
                }
              />
            ))}

            {/* Admin Dashboard Route */}
            <Route 
              path="/admin/*" 
              element={
                <ErrorBoundary>
                  <AuthGuard 
                    requireAuth={true}
                    requiredRole={["admin", "super_admin"]}
                    fallbackPath="/login"
                  >
                    <Routes>
                      {/* Default admin dashboard */}
                      <Route index element={<Dashboard />} />
                      
                      {/* Admin sub-routes */}
                      {adminRoutes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                    </Routes>
                  </AuthGuard>
                </ErrorBoundary>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </ErrorBoundary>
  );
};
