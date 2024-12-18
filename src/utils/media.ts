import { uploadMedia } from '@/integrations/supabase/supabase-service';

/**
 * Uploads media file and returns the URL.
 */
export const handleMediaUpload = async (file) => {
  try {
    return await uploadMedia(file, 'media-folder');
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};