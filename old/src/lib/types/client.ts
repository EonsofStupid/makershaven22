import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error('VITE_SUPABASE_URL is required');
if (!supabaseAnonKey) throw new Error('VITE_SUPABASE_ANON_KEY is required');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Utility function for retrying Supabase operations
export const withRetry = async <T>(
  operation: () => Promise<{ data: T | null; error: any }>,
  maxAttempts = 3,
  delay = 1000
): Promise<{ data: T | null; error: any }> => {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const result = await operation();
      if (!result.error) return result;
      
      attempts++;
      if (attempts === maxAttempts) return result;
      
      await new Promise(resolve => setTimeout(resolve, delay * attempts));
    } catch (error) {
      if (attempts === maxAttempts - 1) return { data: null, error };
      attempts++;
      await new Promise(resolve => setTimeout(resolve, delay * attempts));
    }
  }
  
  return { data: null, error: new Error('Max retry attempts reached') };
};

export const uploadMedia = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('media')
    .upload(path, file);

  if (error) throw error;
  return data;
};