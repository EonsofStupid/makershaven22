import { AuthUser, AuthSession } from './auth';
import { SiteSettings } from './database/tables';
import { WorkflowTemplate } from './workflow';

export interface GlobalState {
  // Core state
  isReady: boolean;
  isMaintenanceMode: boolean;
  isLoading: boolean;
  error: Error | null;

  // Auth state
  user: AuthUser | null;
  session: AuthSession | null;

  // Settings state
  settings: SiteSettings | null;

  // Workflow state
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, any[]>;
}