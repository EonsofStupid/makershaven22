
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://vvtfumqyznrtzhhqzvgu.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dGZ1bXF5em5ydHpoaHF6dmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDA0NTcsImV4cCI6MjA0OTYxNjQ1N30.M1CxmjKZZAusFRQqy7qT2NIKxOmOdrsuGvZd5CaWhc8";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper function for retrying operations
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

// Helper function for uploading media
export const uploadMedia = async (file: File, path = 'uploads'): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from('media')
      .upload(`${path}/${file.name}`, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadMedia:', error);
    throw error;
  }
};
