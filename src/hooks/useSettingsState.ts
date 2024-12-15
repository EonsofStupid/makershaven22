import { useAtom } from 'jotai';
import { settingsAtom } from '@/lib/store/atoms/theme';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useSettingsState = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const updateSettings = async (newSettings: typeof settings) => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .update(newSettings)
        .eq('id', settings?.id)
        .single();

      if (error) throw error;

      setSettings(data);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast.error('Failed to update settings');
    }
  };

  const resetSettings = async () => {
    try {
      const { data, error } = await supabase.rpc('reset_site_settings');
      
      if (error) throw error;

      setSettings(data);
      toast.success('Settings reset to defaults');
    } catch (error) {
      console.error('Failed to reset settings:', error);
      toast.error('Failed to reset settings');
    }
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};