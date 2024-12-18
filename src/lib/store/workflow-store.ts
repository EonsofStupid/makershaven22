import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkflowState {
  workflows: any[];
  activeWorkflow: any | null;
  isLoading: boolean;
  error: string | null;
  setWorkflows: (workflows: any[]) => void;
  setActiveWorkflow: (workflow: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set) => ({
      workflows: [],
      activeWorkflow: null,
      isLoading: false,
      error: null,
      setWorkflows: (workflows) => set({ workflows }),
      setActiveWorkflow: (workflow) => set({ activeWorkflow: workflow }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    { name: 'workflow-store' }
  )
);