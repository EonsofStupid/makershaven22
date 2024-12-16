import type { Settings } from './settings';
import type { Theme, ThemeMode } from './theme';

export type UserRole = 'subscriber' | 'maker' | 'admin' | 'super_admin';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'template' | 'page' | 'component' | 'workflow';

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface BaseContent extends BaseEntity {
  title: string;
  type: ContentType;
  status: ContentStatus;
  created_by: string;
  content: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface GlobalState {
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  theme: Theme | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;
}