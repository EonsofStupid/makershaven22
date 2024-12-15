import { AuthUser, AuthSession } from '../auth';
import { Settings, Theme } from '../settings';
import { BaseContent } from './content';
import { WorkflowTemplate } from '../workflow';

export interface GlobalState {
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  
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
  
  // Workflow state
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, any[]>;
  isWorkflowLoading: boolean;
  workflowError: Error | null;
}

export * from './auth';
export * from './content';