export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: any[];
}

export interface WorkflowStage {
  id: string;
  name: string;
  type: string;
  order: number;
}