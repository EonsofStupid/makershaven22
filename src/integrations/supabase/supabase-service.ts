import { supabase } from '@/integrations/supabase/client';

/** Invokes a Supabase function */
export const invokeSupabaseFunction = async (functionName, options) => {
  try {
    const { data, error } = await supabase.functions.invoke(functionName, options);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error invoking ${functionName}:`, error);
    throw error;
  }
};

/** Uploads media to Supabase storage */
export const uploadMedia = async (file, path = 'uploads') => {
  const { data, error } = await supabase.storage.from('media').upload(`${path}/${file.name}`, file);
  if (error) {
    console.error('Media upload failed:', error);
    throw error;
  }
  return data;
};