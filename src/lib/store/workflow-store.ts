import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { WorkflowTemplate, WorkflowStage, parseStages } from '@/components/admin/workflows/types';

interface WorkflowState {
  templates: WorkflowTemplate[];
  currentTemplate: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  setTemplates: (templates: WorkflowTemplate[]) => void;
  setCurrentTemplate: (template: WorkflowTemplate | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  fetchTemplates: () => Promise<void>;
  updateTemplate: (id: string, updates: Partial<WorkflowTemplate>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  templates: [],
  currentTemplate: null,
  isLoading: false,
  error: null,

  setTemplates: (templates) => set({ templates }),
  setCurrentTemplate: (template) => set({ currentTemplate: template }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchTemplates: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const templates = data.map(template => ({
        ...template,
        stages: parseStages(template.steps)
      })) as WorkflowTemplate[];

      set({ templates, error: null });
    } catch (error) {
      console.error('Error fetching templates:', error);
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTemplate: async (id, updates) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('workflow_templates')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      const templates = get().templates.map(t =>
        t.id === id ? { ...t, ...updates } : t
      );

      set({ templates });
    } catch (error) {
      console.error('Error updating template:', error);
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTemplate: async (id) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('workflow_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const templates = get().templates.filter(t => t.id !== id);
      set({ templates });
    } catch (error) {
      console.error('Error deleting template:', error);
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  }
}));