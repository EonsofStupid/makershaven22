import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkflowState {
  workflows: any[];
  activeWorkflow: any | null;
  workflowHistory: Record<string, Array<{ action: string; timestamp: string }>>;
  isLoading: boolean;
  error: string | null;
  setWorkflows: (workflows: any[]) => void;
  setActiveWorkflow: (id: string, workflow: any) => void;
  addToHistory: (id: string, entry: { action: string; timestamp: string }) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflows: [],
      activeWorkflow: null,
      workflowHistory: {},
      isLoading: false,
      error: null,
      setWorkflows: (workflows) => set({ workflows }),
      setActiveWorkflow: (id, workflow) => set({ activeWorkflow: workflow }),
      addToHistory: (id, entry) => set((state) => ({
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

// Re-export for compatibility
export const useAppStore = useWorkflowStore;