import { create } from 'zustand';
import type { WorkflowTemplate, WorkflowStage } from '@/integrations/supabase/types';

interface WorkflowStore {
  templates: WorkflowTemplate[];
  stages: WorkflowStage[];
  isLoading: boolean;
  error: string | null;
  fetchTemplates: () => Promise<void>;
  addStage: (stage: WorkflowStage) => void;
  removeStage: (stageId: string) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  templates: [],
  stages: [],
  isLoading: false,
  error: null,
  fetchTemplates: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/workflow-templates');
      const data = await response.json();
      set({ templates: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  addStage: (stage) => set((state) => ({ stages: [...state.stages, stage] })),
  removeStage: (stageId) => set((state) => ({
    stages: state.stages.filter((stage) => stage.id !== stageId)
  })),
}));
