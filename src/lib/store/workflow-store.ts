import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { WorkflowState, WorkflowTemplate } from '@/lib/types/workflow';

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
      set({ templates: data as WorkflowTemplate[], error: null });
    } catch (error) {
      console.error('Error fetching templates:', error);
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  setActiveWorkflow: (id, workflow) => {
    const templates = get().templates.map(t => 
      t.id === id ? workflow : t
    );
    set({ templates });
  },

  addToHistory: (id, entry) => {
    const template = get().templates.find(t => t.id === id);
    if (!template) return;
    
    const updatedTemplate = {
      ...template,
      history: [...(template.history || []), entry]
    };
    
    const templates = get().templates.map(t => 
      t.id === id ? updatedTemplate : t
    );
    set({ templates });
  }
}));