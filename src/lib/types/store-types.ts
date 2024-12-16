import type { Settings } from "@/components/admin/settings/types";
import type { Json } from "@/integrations/supabase/types";
import type { WorkflowStage, WorkflowTemplate } from "./workflow";
import type { Session, User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  role?: string;
}

export interface AuthSession extends Session {
  user: AuthUser | null;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  setSession: (session: AuthSession | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  reset: () => void;
  signOut: () => Promise<void>;
}

export interface WorkflowState {
  templates: WorkflowTemplate[];
  currentTemplate: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  setTemplates: (templates: WorkflowTemplate[]) => void;
  setCurrentTemplate: (template: WorkflowTemplate | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  fetchTemplates: () => Promise<void>;
}

export interface ThemeState {
  settings: Settings | null;
  isLoading: boolean;
  error: Error | null;
  mode: 'light' | 'dark' | 'system';
  setSettings: (settings: Settings) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  updateTheme: (settings: Settings) => Promise<void>;
}