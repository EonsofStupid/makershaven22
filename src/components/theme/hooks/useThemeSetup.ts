import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { applyThemeToDocument } from '../utils/themeUtils';

export const useThemeSetup = () => {
  const { settings, mode } = useThemeStore();

  useEffect(() => {
    console.log('Applying theme to document:', settings);
    applyThemeToDocument(settings);
  }, [settings]);

  return { settings, mode };
};