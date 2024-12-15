import { toast } from 'sonner';
import type { AuthError, ErrorState } from '@/lib/types';

// Rate limiting configuration
const rateLimits: { [key: string]: { count: number; timestamp: number } } = {};
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 50; // Maximum requests per minute

export const checkRateLimit = (key: string): boolean => {
  const now = Date.now();
  const limit = rateLimits[key];

  if (!limit || (now - limit.timestamp) > RATE_LIMIT_WINDOW) {
    rateLimits[key] = { count: 1, timestamp: now };
    return true;
  }

  if (limit.count >= MAX_REQUESTS) {
    return false;
  }

  limit.count++;
  return true;
};

export const handleAuthError = (error: any): Error => {
  console.error('Auth error:', error);
  
  // Handle Supabase auth errors
  if (error?.message) {
    switch (error.message) {
      case 'Invalid login credentials':
        return new Error('Invalid email or password');
      case 'Email not confirmed':
        return new Error('Please verify your email address');
      case 'User not found':
        return new Error('No account found with this email');
      case 'Too many requests':
        return new Error('Too many attempts. Please try again later');
      default:
        return new Error(error.message);
    }
  }

  // Handle network errors
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return new Error('Network error. Please check your connection');
  }

  // Handle unexpected errors
  return new Error('An unexpected error occurred');
};

export const handlePromiseError = async <T>(
  promise: Promise<T>,
  errorMessage: string = 'An error occurred'
): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    console.error('Promise error:', error);
    const handledError = error instanceof Error ? error : new Error(errorMessage);
    toast.error(errorMessage, {
      description: handledError.message,
    });
    throw handledError;
  }
};

export const setupGlobalErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    toast.error('An unexpected error occurred', {
      description: event.reason?.message || 'Promise rejection',
    });
  });

  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    toast.error('An unexpected error occurred', {
      description: event.error?.message || 'Runtime error',
    });
  });
};

export const logError = (error: Error | ErrorState | AuthError, context?: string) => {
  const timestamp = new Date().toISOString();
  const errorDetails = {
    timestamp,
    context,
    message: error.message,
    stack: error instanceof Error ? error.stack : undefined,
    ...(error as AuthError).code && { code: (error as AuthError).code },
    ...(error as ErrorState).details && { details: (error as ErrorState).details }
  };

  console.error('Error logged:', errorDetails);

  // Here you could also send the error to your error tracking service
  // e.g., Sentry, LogRocket, etc.
};