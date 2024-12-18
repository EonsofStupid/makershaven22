import React from "react";
import { AuthError } from "@/lib/auth/types/errors";
import { ErrorRecoveryHandler } from "./ErrorRecoveryHandler";
import { useAuthStore } from "@/lib/store/auth-store";

interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: AuthError; reset: () => void }>;
}

interface AuthErrorBoundaryState {
  hasError: boolean;
  error: AuthError | null;
}

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
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleRetry = async () => {
    const { initialize } = useAuthStore.getState();
    await initialize();
    this.handleReset();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} reset={this.handleReset} />;
      }

      return (
        <ErrorRecoveryHandler
          error={this.state.error!}
          onRetry={this.handleRetry}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default AuthErrorBoundary;