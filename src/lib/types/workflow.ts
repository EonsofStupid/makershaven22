import { Json } from '@/integrations/supabase/types';

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  config: Json;
  order: number;
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