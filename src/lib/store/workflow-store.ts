import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { WorkflowTemplate, WorkflowState, parseWorkflowStages, serializeWorkflowStages } from '@/integrations/supabase/types/workflow';

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflows: [],
      activeWorkflow: null,
      isLoading: false,
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
            stages: parseWorkflowStages(workflow.stages as any[]),
            steps: parseWorkflowStages(workflow.steps as any[])
          })) as WorkflowTemplate[];

          set({ workflows: parsedWorkflows });
        } catch (error) {
          set({ error: error instanceof Error ? error : new Error('Failed to initialize workflows') });
        } finally {
          set({ isLoading: false });
        }
      },

      setWorkflows: (workflows) => set({ workflows }),
      setActiveWorkflow: (workflow) => set({ activeWorkflow: workflow }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      reset: () => set({ workflows: [], activeWorkflow: null, isLoading: false, error: null })
    }),
    { name: 'workflow-store' }
  )
);