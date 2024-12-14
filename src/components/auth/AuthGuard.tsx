import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/store/auth/use-auth";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";
import type { AuthGuardProps } from "@/lib/types/auth";

export const AuthGuard = ({ 
  children, 
  requireAuth = false,
  requiredRole = [],
  fallbackPath = "/login"
}: AuthGuardProps) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        toast.error("Please sign in to access this page");
        navigate(fallbackPath);
        return;
      }

      if (requiredRole.length > 0 && user?.role && !requiredRole.includes(user.role)) {
        toast.error("You don't have permission to access this page");
        navigate("/");
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, requireAuth, requiredRole, navigate, fallbackPath]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};