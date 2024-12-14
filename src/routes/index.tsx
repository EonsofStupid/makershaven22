import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAtom } from 'jotai';
import { sessionAtom, userAtom, loadingStateAtom } from '@/lib/store/atoms/auth';
import { toast } from "sonner";
import { publicRoutes } from "./public-routes";
import { makerSpaceRoutes } from "./maker-space-routes";
import { adminRoutes } from "./admin-routes";
import LandingPage from "@/pages/site/landing";
import Index from "@/pages/Index";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

export const AppRoutes = () => {
  const [session] = useAtom(sessionAtom);
  const [user] = useAtom(userAtom);
  const [loadingState] = useAtom(loadingStateAtom);
  
  if (loadingState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageTransition>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Landing page for non-authenticated users */}
          <Route 
            path="/" 
            element={
              !session ? (
                <LandingPage />
              ) : (
                <Index />
              )
            } 
          />

          {/* Public Routes - Always Accessible */}
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}

          {/* Protected Maker Space Routes */}
          {makerSpaceRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}

          {/* Admin Routes - Restricted to admin/super_admin */}
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={`/admin/${route.path}`}
              element={
                <AuthGuard 
                  requireAuth={true}
                  requiredRole={["admin", "super_admin"]}
                  fallbackPath="/"
                >
                  {route.element}
                </AuthGuard>
              }
            />
          ))}

          {/* Auth routes */}
          <Route 
            path="/login" 
            element={
              <AuthGuard requireAuth={false} fallbackPath="/">
                <Login />
              </AuthGuard>
            } 
          />
          <Route 
            path="/register" 
            element={
              <AuthGuard requireAuth={false} fallbackPath="/">
                <Register />
              </AuthGuard>
            } 
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
};