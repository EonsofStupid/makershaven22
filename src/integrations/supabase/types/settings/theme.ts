export type ThemeMode = 'light' | 'dark' | 'system';
export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

export interface ThemeState {
  mode: ThemeMode;
  systemTheme: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  setSystemTheme: (theme: ThemeMode) => void;
}