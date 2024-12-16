import { useAtom } from 'jotai';
import { navigationSettingsAtom, navigationLoadingAtom, navigationErrorAtom } from '@/lib/store/atoms/navigation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { NavigationSettings } from '@/lib/types/navigation';

export const useNavigationState = () => {
  const [settings, setSettings] = useAtom(navigationSettingsAtom);
  const [isLoading, setLoading] = useAtom(navigationLoadingAtom);
  const [error, setError] = useAtom(navigationErrorAtom);
  const { user } = useAuth();

  const updateSettings = async (newSettings: Partial<NavigationSettings>) => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error: updateError } = await supabase
        .from('navigation_settings')
        .upsert({
          user_id: user.id,
          ...newSettings
        })
        .select()
        .single();

      if (updateError) throw updateError;

      setSettings(data);
      toast.success('Navigation settings updated successfully');
    } catch (err) {
      console.error('Failed to update navigation settings:', err);
      setError(err instanceof Error ? err : new Error('Failed to update settings'));
      toast.error('Failed to update navigation settings');
    } finally {
      setLoading(false);
    }
  };

  return {
    settings,
    isLoading,
    error,
    updateSettings
  };
};