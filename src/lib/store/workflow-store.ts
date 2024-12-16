import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { WorkflowTemplate } from '@/components/admin/workflows/types';
import { serializeStages } from '@/components/admin/workflows/types';
import { toast } from 'sonner';

interface WorkflowState {
  templates: WorkflowTemplate[];
  currentTemplate: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  setTemplates: (templates: WorkflowTemplate[]) => void;
  setCurrentTemplate: (template: WorkflowTemplate | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  fetchTemplates: () => Promise<void>;
  createTemplate: (template: Partial<WorkflowTemplate>) => Promise<void>;
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
        .select('*, profile:profiles(id, username, display_name, avatar_url)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ templates: data as WorkflowTemplate[], error: null });
    } catch (error) {
      console.error('Error fetching templates:', error);
      set({ error: error as Error });
      toast.error('Failed to load workflow templates');
    } finally {
      set({ isLoading: false });
    }
  },

  createTemplate: async (template) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .insert([{ 
          name: template.name,
          description: template.description,
          steps: serializeStages(template.steps || []),
          is_active: template.is_active ?? true
        }])
        .select()
        .single();

      if (error) throw error;
      const templates = get().templates;
      set({ templates: [...templates, data as WorkflowTemplate] });
      toast.success('Template created successfully');
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error('Failed to create template');
    } finally {
      set({ isLoading: false });
    }
  },

  updateTemplate: async (id, updates) => {
    set({ isLoading: true });
    try {
      if (updates.steps) {
        updates.steps = serializeStages(updates.steps);
      }
      
      const { data, error } = await supabase
        .from('workflow_templates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const templates = get().templates.map(t => 
        t.id === id ? { ...t, ...data } : t
      );
      set({ templates });
      toast.success('Template updated successfully');
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error('Failed to update template');
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
      toast.success('Template deleted successfully');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    } finally {
      set({ isLoading: false });
    }
  }
}));