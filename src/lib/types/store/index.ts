import { AuthUser, AuthSession } from '../auth';
import { Settings, Theme } from '../settings';
import { BaseContent } from './content';

export interface GlobalState {
  // Theme state
  theme: Theme | null;
  settings: Settings | null;
  mode: 'light' | 'dark' | 'system';
  
  // Auth state
  user: AuthUser | null;
  session: AuthSession | null;
  
  // Content state
  activeContent: BaseContent | null;
  contentHistory: Record<string, BaseContent[]>;
}

export * from './auth';
export * from './content';