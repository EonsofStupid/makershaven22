import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { WorkflowState, WorkflowTemplate } from '@/lib/types/workflow/types';

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflows: [],
  activeWorkflow: null,
  isLoading: false,
  error: null,
  initialize: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.from('workflows').select('*');
      if (error) throw error;
      set({ workflows: data, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
  setWorkflows: (workflows) => set({ workflows }),
  setActiveWorkflow: (workflow) => set({ activeWorkflow: workflow }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({ activeWorkflow: null, error: null }),
}));