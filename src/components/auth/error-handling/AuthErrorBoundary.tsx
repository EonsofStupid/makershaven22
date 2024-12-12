import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { AuthError, AuthErrorBoundaryProps, AuthErrorBoundaryState } from "@/lib/auth/types/errors";
import { useAuthStore } from "@/lib/store/auth-store";

export class AuthErrorBoundary extends React.Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  public state: AuthErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return { 
      hasError: true, 
      error: error as AuthError 
    };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Auth error caught:", error, errorInfo);
    
    toast.error("Authentication Error", {
      description: error.message,
      duration: 5000,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleRetry = async () => {
    const { reset } = useAuthStore();
    await reset();
    this.handleReset();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} reset={this.handleReset} />;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[200px] flex items-center justify-center p-4"
        >
          <Alert variant="destructive" className="max-w-xl bg-destructive/5 border-destructive/20">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription className="mt-2">
              <div className="text-sm text-destructive/90 mb-4">
                {this.state.error?.message || "An unexpected authentication error occurred"}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/50 hover:bg-background/80"
                  onClick={this.handleRetry}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/50 hover:bg-background/80"
                  onClick={() => window.location.href = '/auth/login'}
                >
                  Sign In Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default AuthErrorBoundary;