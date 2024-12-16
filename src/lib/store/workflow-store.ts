import { create } from 'zustand';
import type { WorkflowTemplate } from '@/components/admin/workflows/types';

interface WorkflowStore {
  activeWorkflows: Record<string, WorkflowTemplate>;
  workflowHistory: Record<string, Array<{ action: string; timestamp: string }>>;
  setActiveWorkflow: (workflow: { id: string; data: WorkflowTemplate }) => void;
  addToHistory: (entry: { id: string; data: { action: string; timestamp: string } }) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  activeWorkflows: {},
  workflowHistory: {},
  setActiveWorkflow: ({ id, data }) =>
    set((state) => ({
      activeWorkflows: {
        ...state.activeWorkflows,
        [id]: data
      }
    })),
  addToHistory: ({ id, data }) =>
    set((state) => ({
      workflowHistory: {
        ...state.workflowHistory,
        [id]: [...(state.workflowHistory[id] || []), data]
      }
    }))
}));