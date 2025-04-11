
import React, { Component, ErrorInfo } from 'react';
import { ErrorRecoveryHandler } from './ErrorRecoveryHandler';
import { AuthError as LibAuthError } from '@/lib/auth/types/errors';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: LibAuthError | null;
}

export class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Convert standard Error to AuthError format
    const authError: LibAuthError = {
      type: 'unknown',
      message: error.message,
      code: 'UNKNOWN_ERROR',
      stack: error.stack
    };

    return {
      hasError: true,
      error: authError
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Auth Error Boundary caught an error:', error, errorInfo);
    
    // You could log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  resetErrorState = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorRecoveryHandler 
          error={this.state.error as LibAuthError} 
          resetError={this.resetErrorState}
        />
      );
    }

    return this.props.children;
  }
}
