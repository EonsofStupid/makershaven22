import { GlobalState } from '../types';

export const selectThemeSettings = (state: GlobalState) => state.settings;
export const selectThemeMode = (state: GlobalState) => state.mode;
export const selectThemeError = (state: GlobalState) => state.error;
export const selectIsThemeLoading = (state: GlobalState) => state.isLoading;

export const selectEffectiveTheme = (state: GlobalState) => {
  const mode = state.mode;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return mode === 'system' ? systemTheme : mode;
};