import { Session, User } from '@supabase/supabase-js';
import { ThemeSettings, WorkflowTemplate } from '@/integrations/supabase/types/database/core';

export interface AuthUser extends Omit<User, 'user_metadata'> {
  user_metadata?: Record<string, any>;
  role?: string;
}

export interface AuthSession extends Omit<Session, 'user'> {
  user: AuthUser;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
}

export interface ThemeState {
  settings: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
}

export interface WorkflowState {
  workflows: WorkflowTemplate[];
  activeWorkflow: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
}