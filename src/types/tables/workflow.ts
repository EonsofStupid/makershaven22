import type { Json } from '../base/json';

export interface WorkflowTemplatesTable {
  Row: {
    id: string;
    name: string;
    description: string | null;
    steps: Json;
    is_active: boolean;
    created_by: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
  Insert: Partial<WorkflowTemplatesTable['Row']>;
  Update: Partial<WorkflowTemplatesTable['Row']>;
}