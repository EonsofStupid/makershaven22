import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "sonner";
import type { AuthGuardProps } from "@/lib/types/auth/base";

export const AuthGuard = ({
  children,
  requireAuth = true,
  requiredRole,
  fallbackPath = "/login",
  loadingComponent,
  unauthorizedComponent,
  onError
}: AuthGuardProps) => {
  const { user, session, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && requireAuth && !session) {
      toast.error("Please sign in to access this page");
    }
  }, [isLoading, requireAuth, session]);

  if (isLoading) {
    return loadingComponent || (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Not authenticated but authentication required
  if (requireAuth && !session) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Authenticated but authentication not allowed (e.g., login page)
  if (!requireAuth && session) {
    return <Navigate to="/" replace />;
  }

  // Role check if required
  if (requireAuth && requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role!)) {
      if (onError) {
        onError(new Error("Insufficient permissions"));
      }
      toast.error("You don't have permission to access this page");
      return unauthorizedComponent || <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};