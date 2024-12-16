import { Json } from './base';

export interface WorkflowTables {
  workflow_templates: {
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
    Insert: Partial<WorkflowTables['workflow_templates']['Row']>;
    Update: Partial<WorkflowTables['workflow_templates']['Row']>;
  };
}