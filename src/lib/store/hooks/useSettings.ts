// Aligning useSettings hook with Zustand and auth-store.ts structure
import { useSettingsStore } from '@/lib/store/settings-store';
import type { Settings } from '@/components/admin/settings/types/settings';

export const useSettings = () => {
  const {
    settings,
    isLoading,
    error,
    updateSettings,
  } = useSettingsStore();

  // Additional logic can be added here if needed for alignment
  return {
    settings,
    isLoading,
    error,
    updateSettings,
  };
};
