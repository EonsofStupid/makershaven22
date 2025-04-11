
import { createClient } from '@supabase/supabase-js';

// Environment variables with fallbacks
const SUPABASE_URL = 'https://vvtfumqyznrtzhhqzvgu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dGZ1bXF5em5ydHpoaHF6dmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDA0NTcsImV4cCI6MjA0OTYxNjQ1N30.M1CxmjKZZAusFRQqy7qT2NIKxOmOdrsuGvZd5CaWhc8';

/**
 * Create a Supabase client with the given options
 */
export function createSupabaseClient(options = {}) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    ...options
  });
}

/**
 * Default Supabase client instance
 */
export const supabase = createSupabaseClient();
