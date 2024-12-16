import type { Settings } from './settings';
import type { Theme, ThemeMode } from './theme';
import type { AuthUser, AuthSession } from './auth/base';
import type { WorkflowTemplate } from './workflow';
import type { BaseContent } from './content';

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
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  isLoading: boolean;

  // Theme state
  theme: Theme | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;

  // Auth state
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthLoading: boolean;
  authError: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;

  // Content state
  activeContent: BaseContent | null;
  contentHistory: Record<string, BaseContent[]>;
  isContentLoading: boolean;
  contentError: Error | null;

  // Workflow state
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, Array<{ action: string; timestamp: string }>>;
  isWorkflowLoading: boolean;
  workflowError: Error | null;

  // Actions
  setState: (state: Partial<GlobalState>) => void;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}