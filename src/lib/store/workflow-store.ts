import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { WorkflowState } from '@/lib/types/store-types';
import { toast } from 'sonner';

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      templates: [],
      activeTemplate: null,
      isLoading: true,
      error: null,

      initialize: async () => {
        try {
          const { data: templates, error } = await supabase
            .from('cms_workflows')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ templates, isLoading: false });
        } catch (error) {
          console.error('Workflow initialization error:', error);
          set({ error: error instanceof Error ? error : new Error('Failed to initialize workflows') });
        } finally {
          set({ isLoading: false });
        }
      },

      handleTemplateUpdate: async (template) => {
        set({ isLoading: true });
        try {
          const { error } = await supabase
            .from('cms_workflows')
            .update(template)
            .eq('id', template.id);

          if (error) throw error;
          
          const { templates } = get();
          const updatedTemplates = templates.map(t => 
            t.id === template.id ? template : t
          );
          
          set({ templates: updatedTemplates });
          toast.success('Workflow template updated successfully');
        } catch (error) {
          console.error('Template update error:', error);
          set({ error: error instanceof Error ? error : new Error('Failed to update template') });
          toast.error('Failed to update workflow template');
        } finally {
          set({ isLoading: false });
        }
      },

      setTemplates: (templates) => set({ templates }),
      setActiveTemplate: (template) => set({ activeTemplate: template }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({ templates: [], activeTemplate: null, isLoading: false, error: null }),
    }),
    { name: 'workflow-store' }
  )
);