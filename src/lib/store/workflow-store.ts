import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkflowTemplate } from '@/integrations/supabase/types/workflow/types';

interface WorkflowState {
  workflows: WorkflowTemplate[];
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, Array<{ action: string; timestamp: string }>>;
  isLoading: boolean;
  error: string | null;
  setWorkflows: (workflows: WorkflowTemplate[]) => void;
  setActiveWorkflow: (id: string, workflow: WorkflowTemplate) => void;
  addToHistory: (id: string, entry: { action: string; timestamp: string }) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set) => ({
      workflows: [],
      activeWorkflows: {},
      workflowHistory: {},
      isLoading: false,
      error: null,
      setWorkflows: (workflows) => set({ workflows }),
      setActiveWorkflow: (id, workflow) => 
        set((state) => ({
          activeWorkflows: { ...state.activeWorkflows, [id]: workflow }
        })),
      addToHistory: (id, entry) => 
        set((state) => ({
          workflowHistory: {
            ...state.workflowHistory,
            [id]: [...(state.workflowHistory[id] || []), entry]
          }
        })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    { name: 'workflow-store' }
  )
);

export const useAppStore = useWorkflowStore;