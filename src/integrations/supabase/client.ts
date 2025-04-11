
import { createSupabaseClient, supabase } from '@/lib/supabase';

// Export the default client
export { supabase };

// Export auth and storage modules for convenience
export const auth = supabase.auth;
export const storage = supabase.storage;

/**
 * Create a client with custom options
 */
export function createCustomClient(options = {}) {
  return createSupabaseClient(options);
}

/**
 * Helper function to handle retries
 */
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
};
