import { AuthUser, AuthSession } from '../types/base';
import { Settings, ThemeMode } from '../types/base';
import { BaseContent } from '../types/content';
import { WorkflowTemplate } from '../types/workflow';

// Core state interfaces
export interface CoreState {
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
  isLoading: boolean;
}

export interface ThemeState {
  theme: Settings | null;
  settings: Settings | null;
  mode: ThemeMode;
  isThemeLoading: boolean;
  themeError: Error | null;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthLoading: boolean;
  authError: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;
}

export interface ContentState {
  activeContent: BaseContent | null;
  contentHistory: Record<string, BaseContent[]>;
  isContentLoading: boolean;
  contentError: Error | null;
}

export interface WorkflowState {
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, any[]>;
  isWorkflowLoading: boolean;
  workflowError: Error | null;
}

// Combined global state type
export interface GlobalState extends 
  CoreState,
  ThemeState, 
  AuthState,
  ContentState,
  WorkflowState {
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