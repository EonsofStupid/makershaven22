import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { 
  themeModeAtom, 
  systemThemeAtom, 
  effectiveThemeAtom,
  themeStateAtom,
  cssVariablesAtom,
  updateThemeAtom
} from '../atoms/theme/theme-atoms';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState(themeModeAtom);
  const [, setSystemTheme] = useState(systemThemeAtom);
  const effectiveTheme = useAtomValue(effectiveThemeAtom);
  const cssVariables = useAtomValue(cssVariablesAtom);
  const [themeState] = useState(themeStateAtom);
  const [, updateTheme] = useState(updateThemeAtom);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setSystemTheme]);

  useEffect(() => {
    // Apply CSS variables to document root
    const root = document.documentElement;
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(effectiveTheme);
  }, [cssVariables, effectiveTheme]);

  return {
    mode: themeMode,
    setMode: setThemeMode,
    effectiveTheme,
    settings: themeState.settings,
    isLoading: themeState.isLoading,
    error: themeState.error,
    updateTheme
  };
};