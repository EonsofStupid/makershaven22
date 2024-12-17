import { useSettingsStore } from '@/lib/store/settings-store';
import type { Settings } from '@/components/admin/settings/types/settings';

export const useSettings = () => {
  const { settings, isLoading, error, updateSettings } = useSettingsStore();

  return {
    settings,
    isLoading,
    error,
    updateSettings,
  };
};
