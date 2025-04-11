
import type { ThemeMode, TransitionType, GlassEffectLevel } from '../core/enums';
import type { JsonObject } from '../core/json';

/**
 * Core theme settings interface
 */
export interface ThemeCore {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  transitionDuration: string;
  transitionType: TransitionType;
  glassEffect: GlassEffectLevel;
  neonCyan: string;
  neonPink: string;
  neonPurple: string;
  customCss?: string;
  metadata?: JsonObject;
}
