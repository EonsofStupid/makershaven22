import { type Settings } from "@/components/admin/settings/types";
import { type Json } from "@/integrations/supabase/types";

export interface RedisConfig {
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
}

export interface AuthState {
  session: any | null;
  user: any | null;
  isLoading: boolean;
  error: Error | null;
  isTransitioning: boolean;
  setSession: (session: any | null) => void;
  setUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setIsTransitioning: (transitioning: boolean) => void;
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
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description?: string;
  stages: WorkflowStage[];
  is_active: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export type WorkflowStageType = 'APPROVAL' | 'REVIEW' | 'TASK' | 'NOTIFICATION' | 'CONDITIONAL';

export interface WorkflowStage {
  id: string;
  name: string;
  type: WorkflowStageType;
  order: number;
  config: WorkflowStageConfig;
  description?: string;
}

export interface WorkflowStageConfig {
  assignees?: string[];
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  notifications?: {
    email?: boolean;
    inApp?: boolean;
  };
  conditions?: {
    type: 'AND' | 'OR';
    rules: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
  };
  requiredApprovers?: number;
}