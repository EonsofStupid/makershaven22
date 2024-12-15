import { AuthUser, AuthSession } from './auth';
import { Settings, Theme } from './settings';
import { BaseContent } from './content';
import { WorkflowTemplate } from './workflow';

export interface GlobalState {
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  
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
  
  // Workflow state
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, any[]>;
}