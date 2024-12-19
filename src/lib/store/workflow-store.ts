import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WorkflowState, WorkflowTemplate } from '@/lib/types/database/tables/workflow';
import { supabase } from '@/integrations/supabase/client';

const initialState: WorkflowState = {
  workflows: [],
  activeWorkflow: null,
  isLoading: false,
  error: null
};

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setWorkflows: (workflows: WorkflowTemplate[]) => set({ workflows }),
      setActiveWorkflow: (workflow: WorkflowTemplate | null) => set({ activeWorkflow: workflow }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: Error | null) => set({ error }),
      
      fetchWorkflows: async () => {
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
          })) as WorkflowTemplate[];
          
          set({ workflows, error: null });
        } catch (error) {
          set({ error: error as Error });
        } finally {
          set({ isLoading: false });
        }
      },
      
      reset: () => set(initialState)
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
