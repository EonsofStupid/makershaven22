import { useAtom, useAtomValue } from 'jotai';
import { 
  settingsAtom,
  settingsLoadingAtom,
  settingsErrorAtom,
  updateSettingsAtom
} from '../atoms/theme/settings-atoms';
import type { Settings } from '@/components/admin/settings/types/settings';

export const useSettings = () => {
  const [settings] = useAtom(settingsAtom);
  const isLoading = useAtomValue(settingsLoadingAtom);
  const error = useAtomValue(settingsErrorAtom);
  const [, updateSettings] = useAtom(updateSettingsAtom);

  return {
    settings,
    isLoading,
    error,
    updateSettings
  };
};