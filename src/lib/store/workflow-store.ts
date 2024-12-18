import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkflowTemplate, WorkflowStage } from '@/integrations/supabase/types/core/workflow';
import { supabase } from '@/integrations/supabase/client';

interface WorkflowState {
  workflows: WorkflowTemplate[];
  activeWorkflow: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
  setWorkflows: (workflows: WorkflowTemplate[]) => void;
  setActiveWorkflow: (workflow: WorkflowTemplate | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflows: [],
      activeWorkflow: null,
      isLoading: false,
      error: null,
      initialize: async () => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase
            .from('cms_workflows')
            .select('*');

          if (error) throw error;

          const workflows = data.map(workflow => ({
            ...workflow,
            steps: Array.isArray(workflow.steps) ? workflow.steps : [],
            stages: Array.isArray(workflow.stages) ? workflow.stages : []
          }));

          set({ workflows, error: null });
        } catch (error) {
          set({ error: error as Error });
        } finally {
          set({ isLoading: false });
        }
      },
      setWorkflows: (workflows) => set({ workflows }),
      setActiveWorkflow: (workflow) => set({ activeWorkflow: workflow }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      reset: () => set({ workflows: [], activeWorkflow: null, error: null })
    }),
    {
      name: 'workflow-store',
      partialize: (state) => ({
        workflows: state.workflows,
        activeWorkflow: state.activeWorkflow
      })
    }
  )
);