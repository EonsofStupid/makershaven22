import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const uploadMedia = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('media')
    .upload(path, file);

  if (error) throw error;
  return data;
};