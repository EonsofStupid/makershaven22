import { supabase } from './client';

export const uploadMedia = async (file: File, path = 'uploads') => {
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

export const deleteMedia = async (path: string) => {
  try {
    const { error } = await supabase.storage
      .from('media')
      .remove([path]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error in deleteMedia:', error);
    throw error;
  }
};

export const listMedia = async (path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from('media')
      .list(path);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in listMedia:', error);
    throw error;
  }
};