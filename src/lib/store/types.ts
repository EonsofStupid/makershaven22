import type { Settings, Theme, ThemeMode } from '@/lib/types/settings';
import type { AuthUser, AuthSession } from '@/lib/types/auth';
import type { WorkflowTemplate } from '@/lib/types/workflow';
import type { BaseContent } from '@/lib/types/store/content';

export interface GlobalState {
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