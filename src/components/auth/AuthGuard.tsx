import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useSyncedAuth } from "@/lib/store/hooks/useSyncedStore";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string | string[];
  fallbackPath?: string;
}

export const AuthGuard = ({
  children,
  requireAuth = true,
  requiredRole,
  fallbackPath = "/login",
}: AuthGuardProps) => {
  const { user, session, isAuthLoading } = useSyncedAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Not authenticated but authentication required
  if (requireAuth && !session) {
    toast.error("Please sign in to access this page");
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Authenticated but authentication not allowed (e.g., login page)
  if (!requireAuth && session) {
    return <Navigate to="/" replace />;
  }

  // Role check if required
  if (requireAuth && requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      toast.error("You don't have permission to access this page");
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};