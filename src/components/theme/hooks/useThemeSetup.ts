import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { useAtom } from 'jotai';
import { themeSettingsAtom, themeModeAtom } from '@/lib/store/atoms/theme';
import { applyThemeToDocument } from '../utils/themeUtils';

export const useThemeSetup = () => {
  const [themeSettings] = useAtom(themeSettingsAtom);
  const [mode] = useAtom(themeModeAtom);
  const { settings: zustandSettings } = useThemeStore();

  useEffect(() => {
    // Apply theme from either store
    const themeToApply = themeSettings || { settings: zustandSettings, mode };
    if (themeToApply?.settings) {
      applyThemeToDocument(themeToApply);
    }
  }, [themeSettings, zustandSettings, mode]);

  return { settings: themeSettings?.settings || zustandSettings, mode };
};