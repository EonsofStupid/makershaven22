import { useStore } from '@/lib/store/store';
import { 
  selectThemeSettings,
  selectThemeMode,
  selectThemeError,
  selectIsThemeLoading,
  selectEffectiveTheme
} from '@/lib/store/selectors/theme-selectors';

export const useThemeStore = () => {
  const store = useStore();
  
  return {
    settings: selectThemeSettings(store),
    mode: selectThemeMode(store),
    error: selectThemeError(store),
    isLoading: selectIsThemeLoading(store),
    effectiveTheme: selectEffectiveTheme(store),
    updateSettings: store.updateSettings,
    setMode: store.setMode,
    setError: store.setError,
    reset: store.reset
  };
};