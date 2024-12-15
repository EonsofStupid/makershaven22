import type { AuthUser, AuthSession } from '../types/auth';
import type { Settings, Theme, ThemeMode } from '../types/settings';
import type { BaseContent } from '../types/content';
import type { WorkflowTemplate } from '../types/workflow';

// Core state interfaces that will be shared between Zustand and Jotai
export interface CoreState {
  isReady: boolean;
  isMaintenanceMode: boolean;
  error: Error | null;
}

export interface ThemeState {
  theme: Theme | null;
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

// Combined global state type for Zustand store
export interface GlobalState extends 
  CoreState,
  ThemeState, 
  AuthState,
  ContentState,
  WorkflowState {}

// Action types for each state slice
export interface CoreActions {
  setReady: (isReady: boolean) => void;
  setMaintenanceMode: (isMaintenanceMode: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export interface ThemeActions {
  updateTheme: (theme: Theme) => void;
  updateSettings: (settings: Settings) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeLoading: (isLoading: boolean) => void;
  setThemeError: (error: Error | null) => void;
  resetTheme: () => void;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setSession: (session: AuthSession | null) => void;
  setAuthLoading: (isLoading: boolean) => void;
  setAuthError: (error: Error | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  resetAuth: () => void;
}

export interface ContentActions {
  setActiveContent: (content: BaseContent | null) => void;
  addToHistory: (contentId: string, content: BaseContent) => void;
  clearHistory: (contentId: string) => void;
  setContentLoading: (isLoading: boolean) => void;
  setContentError: (error: Error | null) => void;
  resetContent: () => void;
}

export interface WorkflowActions {
  setActiveWorkflow: (workflowId: string, workflow: WorkflowTemplate) => void;
  addToWorkflowHistory: (workflowId: string, historyEntry: any) => void;
  clearWorkflowHistory: (workflowId: string) => void;
  setWorkflowLoading: (isLoading: boolean) => void;
  setWorkflowError: (error: Error | null) => void;
  resetWorkflow: () => void;
}

// Combined store type with state and actions
export interface Store extends GlobalState {
  actions: CoreActions & ThemeActions & AuthActions & ContentActions & WorkflowActions;
}

// Type guard functions
export const isAuthUser = (user: any): user is AuthUser => {
  return user && typeof user.id === 'string' && typeof user.email === 'string';
};

export const isAuthSession = (session: any): session is AuthSession => {
  return session && 
    typeof session.access_token === 'string' && 
    isAuthUser(session.user);
};

export const isTheme = (theme: any): theme is Theme => {
  return theme && 
    typeof theme.mode === 'string' && 
    typeof theme.settings === 'object';
};

export const isSettings = (settings: any): settings is Settings => {
  return settings && 
    typeof settings.site_title === 'string' && 
    typeof settings.font_family_heading === 'string' && 
    typeof settings.font_family_body === 'string';
};