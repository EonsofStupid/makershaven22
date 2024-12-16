import type { Settings, Theme, ThemeMode } from './settings';
import type { AuthUser, AuthSession } from './auth';
import type { BaseContent } from '../content';
import type { WorkflowTemplate } from '../workflow';

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