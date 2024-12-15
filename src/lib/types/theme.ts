export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeSettings {
  // Core colors
  primary: string;
  secondary: string;
  accent: string;
  
  // Text colors  
  textPrimary: string;
  textSecondary: string;
  textHeading: string;
  
  // Neon effects
  neonCyan: string;
  neonPink: string; 
  neonPurple: string;

  // Typography
  fontFamilyHeading: string;
  fontFamilyBody: string;
  fontSize: string;
  fontWeightNormal: string;
  fontWeightBold: string;
  lineHeight: string;
  letterSpacing: string;

  // Layout
  borderRadius: string;
  spacing: string;
  transitionDuration: string;
  backdropBlur: string;
}

export interface Theme {
  mode: ThemeMode;
  settings: ThemeSettings;
}