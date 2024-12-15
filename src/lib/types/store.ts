import { AuthUser, AuthSession } from './auth';
import { Settings, ThemeMode } from './settings';
import { BaseContent } from './content';
import { WorkflowTemplate } from './workflow';

export interface GlobalState {
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  
  // Theme state
  theme: Settings | null;
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
  workflowHistory: Record<string, any[]>;
  isWorkflowLoading: boolean;
  workflowError: Error | null;

  // Actions
  setState: (state: Partial<GlobalState>) => void;
  updateSettings: (settings: Settings) => void;
  setMode: (mode: ThemeMode) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

// Re-export types
export * from './auth';
export * from './content';