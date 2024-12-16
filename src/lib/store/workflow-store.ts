import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { WorkflowState, WorkflowTemplate } from '@/lib/types/store-types';

export const useWorkflowStore = create<WorkflowState>((set) => ({
  templates: [],
  currentTemplate: null,
  isLoading: false,
  error: null,
  setTemplates: (templates) => set({ templates }),
  setCurrentTemplate: (template) => set({ currentTemplate: template }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));