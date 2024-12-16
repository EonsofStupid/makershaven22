import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { WorkflowTemplate } from '@/lib/types/workflow';
import type { WorkflowState } from '@/lib/types/store-types';
import { toast } from 'sonner';

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
        .select(`
          *,
          profile:profiles(id, username, display_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const templates = data as WorkflowTemplate[];
      set({ templates, error: null });
    } catch (error) {
      console.error('Error fetching templates:', error);
      set({ error: error as Error });
      toast.error('Failed to load workflow templates');
    } finally {
      set({ isLoading: false });
    }
  }
}));