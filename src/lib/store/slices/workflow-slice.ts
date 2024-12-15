import { StateCreator } from 'zustand';
import { GlobalState } from '../types';
import type { WorkflowTemplate } from '@/lib/types/workflow';

export interface WorkflowSlice {
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

export const createWorkflowSlice: StateCreator<
  GlobalState,
  [],
  [],
  WorkflowSlice
> = (set) => ({
  activeWorkflows: {},
  workflowHistory: {},
  isLoading: false,
  error: null,
  setActiveWorkflow: (id: string, workflow: WorkflowTemplate) => 
    set((state) => ({
      activeWorkflows: { ...state.activeWorkflows, [id]: workflow }
    })),
  addToHistory: (id: string, entry: any) => 
    set((state) => ({
      workflowHistory: {
        ...state.workflowHistory,
        [id]: [...(state.workflowHistory[id] || []), entry]
      }
    })),
  clearHistory: (id: string) => 
    set((state) => {
      const { [id]: _, ...rest } = state.workflowHistory;
      return { workflowHistory: rest };
    }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
  reset: () => set({
    activeWorkflows: {},
    workflowHistory: {},
    isLoading: false,
    error: null
  })
});