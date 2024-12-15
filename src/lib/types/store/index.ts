import { AuthUser, AuthSession } from '../auth';
import { Settings, Theme } from '../settings';
import { BaseContent } from './content';

export interface GlobalState {
  // Theme state
  theme: Theme | null;
  settings: Settings | null;
  mode: 'light' | 'dark' | 'system';
  isThemeLoading: boolean;
  themeError: Error | null;
  
  // Auth state
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthLoading: boolean;
  authError: Error | null;
  isTransitioning: boolean;

  // Content state
  activeContent: BaseContent | null;
  contentHistory: Record<string, BaseContent[]>;
  isContentLoading: boolean;
  contentError: Error | null;
}

export * from './auth';
export * from './content';