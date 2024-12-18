import { uploadMedia } from '@/integrations/supabase/supabase-service';
import { useSettingsStore } from '@/lib/store/settings-store';
import { toast } from 'sonner';
import { Settings } from '../../types';

export const useSettingsUpdateHandlers = () => {
  const { updateSetting } = useSettingsStore();

  const handleMediaUpload = async (file: File, key: keyof Settings) => {
    try {
      const url = await uploadMedia(file, 'settings-media');
      updateSetting(key, url);
      toast.success('Media uploaded successfully.');
    } catch (error) {
      console.error('Media upload failed:', error);
      toast.error('Failed to upload media.');
    }
  };

  return { handleMediaUpload };
};