import { Session, User } from '@supabase/supabase-js';

export interface AuthSession extends Session {
  user: User & {
    user_metadata: {
      avatar_url?: string;
      full_name?: string;
      name?: string;
    };
  };
}

export interface AuthState {
  session: AuthSession | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export interface ThemeState {
  mode: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
}

export interface WorkflowState {
  workflows: any[];
  activeWorkflow: any | null;
  isLoading: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
  setActiveWorkflow: (workflow: any) => void;
  handleWorkflowUpdate: (workflow: any) => Promise<void>;
}