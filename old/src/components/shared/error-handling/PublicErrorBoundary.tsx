
import React, { ErrorInfo, Component } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class PublicErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by PublicErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
    
    // Log the error to a service or analytics
    toast.error('Something went wrong', {
      description: 'An error occurred while loading this component.'
    });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error state when props change if enabled
    if (
      this.state.hasError &&
      this.props.resetOnPropsChange &&
      prevProps.children !== this.props.children
    ) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI that will work on public routes
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-6 p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
          <AlertTriangle className="w-16 h-16 text-[#ff0abe]" />
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="text-white/70 max-w-md">
            We encountered an error while loading this component. Try refreshing the page or coming back later.
          </p>
          <Button
            onClick={this.resetErrorBoundary}
            className="bg-[#ff0abe] hover:bg-[#ff0abe]/80 text-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
