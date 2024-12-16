import type { Settings } from "@/components/admin/settings/types";
import type { Json } from "@/integrations/supabase/types";
import type { AuthSession, AuthUser } from "./auth-types";
import type { WorkflowStage, WorkflowTemplate } from "./workflow";

export interface RedisState {
  config: {
    enabled: boolean;
    host: string;
    port: number;
    password?: string;
    ttl: number;
    maxMemory: number;
    restrictedMode: boolean;
    features: {
      sessionManagement: boolean;
      caching: boolean;
      realTimeUpdates: boolean;
      rateLimit: boolean;
    };
  };
  updateConfig: (updates: Partial<RedisState['config']>) => void;
  toggleFeature: (feature: keyof RedisState['config']['features']) => void;
}

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  hasAccess: boolean;
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
  setActiveWorkflow: (id: string, workflow: WorkflowTemplate) => void;
  addToHistory: (id: string, entry: { type: string; timestamp: string }) => void;
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