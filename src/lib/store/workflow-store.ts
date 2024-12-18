import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { WorkflowTemplate, WorkflowStage } from '@/integrations/supabase/types/workflow';
import { parseWorkflowStages } from '@/integrations/supabase/types/workflow/utils';

interface WorkflowState {
  workflows: WorkflowTemplate[];
  activeWorkflow: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
  handleWorkflowUpdate: (workflow: WorkflowTemplate) => Promise<void>;
  setWorkflows: (workflows: WorkflowTemplate[]) => void;
  setActiveWorkflow: (workflow: WorkflowTemplate | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflows: [],
      activeWorkflow: null,
      isLoading: true,
      error: null,

      initialize: async () => {
        try {
          set({ isLoading: true });
          const { data, error } = await supabase
            .from('cms_workflows')
            .select('*');

          if (error) throw error;

          const parsedWorkflows = data.map(workflow => ({
            ...workflow,
            stages: parseWorkflowStages(workflow.stages),
            steps: parseWorkflowStages(workflow.steps)
          })) as WorkflowTemplate[];

          set({ workflows: parsedWorkflows });
        } catch (error) {
          set({ error: error instanceof Error ? error : new Error('Failed to initialize workflows') });
        } finally {
          set({ isLoading: false });
        }
      },

      handleWorkflowUpdate: async (workflow) => {
        try {
          set({ isLoading: true });
          const { error } = await supabase
            .from('cms_workflows')
            .upsert({
              id: workflow.id,
              name: workflow.name,
              description: workflow.description,
              stages: workflow.stages,
              steps: workflow.steps,
              is_active: workflow.is_active
            });

          if (error) throw error;

          const { workflows } = get();
          const updatedWorkflows = workflows.map(w => 
            w.id === workflow.id ? workflow : w
          );
          set({ workflows: updatedWorkflows });
        } catch (error) {
          set({ error: error instanceof Error ? error : new Error('Failed to update workflow') });
        } finally {
          set({ isLoading: false });
        }
      },

      setWorkflows: (workflows) => set({ workflows }),
      setActiveWorkflow: (workflow) => set({ activeWorkflow: workflow }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({ workflows: [], activeWorkflow: null, isLoading: false, error: null })
    }),
    { name: 'workflow-store' }
  )
);