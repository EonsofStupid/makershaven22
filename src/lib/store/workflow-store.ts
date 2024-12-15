import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WorkflowTemplate } from '@/lib/types/store';

interface WorkflowState {
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, any[]>;
  isLoading: boolean;
  error: Error | null;
  setActiveWorkflow: (id: string, workflow: WorkflowTemplate) => void;
  addToHistory: (id: string, entry: any) => void;
  clearHistory: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set) => ({
      activeWorkflows: {},
      workflowHistory: {},
      isLoading: false,
      error: null,
      setActiveWorkflow: (id, workflow) => set((state) => ({
        activeWorkflows: { ...state.activeWorkflows, [id]: workflow }
      })),
      addToHistory: (id, entry) => set((state) => ({
        workflowHistory: {
          ...state.workflowHistory,
          [id]: [...(state.workflowHistory[id] || []), entry]
        }
      })),
      clearHistory: (id) => set((state) => {
        const { [id]: _, ...rest } = state.workflowHistory;
        return { workflowHistory: rest };
      }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({
        activeWorkflows: {},
        workflowHistory: {},
        isLoading: false,
        error: null
      })
    }),
    {
      name: 'workflow-store'
    }
  )
);