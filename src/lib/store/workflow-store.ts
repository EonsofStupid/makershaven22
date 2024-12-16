import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { WorkflowTemplate, WorkflowStage } from '@/lib/types/workflow';
import { toast } from 'sonner';

interface WorkflowState {
  templates: WorkflowTemplate[];
  currentTemplate: WorkflowTemplate | null;
  isLoading: boolean;
  error: Error | null;
  fetchTemplates: () => Promise<void>;
  createTemplate: (template: Partial<WorkflowTemplate>) => Promise<void>;
  updateTemplate: (id: string, updates: Partial<WorkflowTemplate>) => Promise<void>;
  setCurrentTemplate: (template: WorkflowTemplate | null) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  templates: [],
  currentTemplate: null,
  isLoading: false,
  error: null,

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
        stages: template.steps as WorkflowStage[]
      }));

      set({ templates, error: null });
    } catch (error) {
      console.error('Error fetching workflow templates:', error);
      set({ error: error as Error });
      toast.error('Failed to fetch workflow templates');
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
          steps: template.stages,
          is_active: template.is_active ?? true
        }])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        templates: [...state.templates, data as WorkflowTemplate],
        error: null
      }));
      toast.success('Workflow template created successfully');
    } catch (error) {
      console.error('Error creating workflow template:', error);
      set({ error: error as Error });
      toast.error('Failed to create workflow template');
    } finally {
      set({ isLoading: false });
    }
  },

  updateTemplate: async (id, updates) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('workflow_templates')
        .update({
          name: updates.name,
          description: updates.description,
          steps: updates.stages,
          is_active: updates.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        templates: state.templates.map(t => 
          t.id === id ? { ...t, ...data } as WorkflowTemplate : t
        ),
        currentTemplate: data as WorkflowTemplate,
        error: null
      }));
      toast.success('Workflow template updated successfully');
    } catch (error) {
      console.error('Error updating workflow template:', error);
      set({ error: error as Error });
      toast.error('Failed to update workflow template');
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentTemplate: (template) => {
    set({ currentTemplate: template });
  }
}));