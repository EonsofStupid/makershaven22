import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";
import { publicRoutes } from "./public-routes";
import { makerSpaceRoutes } from "./maker-space-routes";
import { adminRoutes } from "./admin-routes";
import Layout from "@/components/Layout"; // Fixed import
import LandingPage from "@/pages/site/landing";
import Index from "@/pages/Index";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

export const Routes = () => {
  const { session, user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageTransition>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterRoutes>
          {/* Landing page for non-authenticated users */}
          <Route 
            path="/" 
            element={
              !session ? (
                <LandingPage />
              ) : (
                <Layout>
                  <Index />
                </Layout>
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
              element={
                <AuthGuard requireAuth={true} fallbackPath="/login">
                  <Layout>
                    {route.element}
                  </Layout>
                </AuthGuard>
              }
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
                  <Layout>
                    {route.element}
                  </Layout>
                </AuthGuard>
              }
            />
          ))}

          {/* Auth routes */}
          <Route 
            path="/login" 
            element={
              <AuthGuard requireAuth={false}>
                <Login />
              </AuthGuard>
            } 
          />
          <Route 
            path="/register" 
            element={
              <AuthGuard requireAuth={false}>
                <Register />
              </AuthGuard>
            } 
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </RouterRoutes>
      </Suspense>
    </PageTransition>
  );
};