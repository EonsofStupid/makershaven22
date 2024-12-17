import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { WorkflowTemplate, WorkflowStage } from '@/integrations/supabase/types';

interface WorkflowStore {
  templates: WorkflowTemplate[];
  stages: WorkflowStage[];
  isLoading: boolean;
  error: string | null;
  activeWorkflow?: string;
  history: string[];
  fetchTemplates: () => Promise<void>;
  addStage: (stage: WorkflowStage) => void;
  removeStage: (stageId: string) => void;
  setActiveWorkflow: (id: string | undefined) => void;
  addToHistory: (id: string) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  templates: [],
  stages: [],
  isLoading: false,
  error: null,
  history: [],
  
  fetchTemplates: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ templates: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addStage: (stage) => set((state) => ({ stages: [...state.stages, stage] })),
  
  removeStage: (stageId) => set((state) => ({
    stages: state.stages.filter((stage) => stage.id !== stageId)
  })),

  setActiveWorkflow: (id) => set({ activeWorkflow: id }),
  
  addToHistory: (id) => set((state) => ({
    history: [...state.history, id]
  }))
}));