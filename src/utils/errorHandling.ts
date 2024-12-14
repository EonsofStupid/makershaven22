import { toast } from 'sonner';

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

export const handlePromiseError = async <T>(
  promise: Promise<T>,
  errorMessage: string = 'An error occurred'
): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    console.error('Promise error:', error);
    toast.error(errorMessage, {
      description: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
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