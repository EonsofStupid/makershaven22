import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { BaseContent, ContentStatus, ContentType } from '@/integrations/supabase/types';
import { toast } from 'sonner';

interface ContentState {
  content: BaseContent[];
  currentContent: BaseContent | null;
  isLoading: boolean;
  error: Error | null;
  fetchContent: () => Promise<void>;
  setCurrentContent: (content: BaseContent | null) => void;
  createContent: (content: Omit<BaseContent, 'id' | 'created_at'>) => Promise<void>;
  updateContent: (id: string, updates: Partial<BaseContent>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set) => ({
  content: [],
  currentContent: null,
  isLoading: false,
  error: null,

  fetchContent: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .select(`
          *,
          profiles:created_by (
            display_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ content: data as BaseContent[], error: null });
    } catch (error) {
      console.error('Error fetching content:', error);
      set({ error: error as Error });
      toast.error('Failed to fetch content');
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentContent: (content) => set({ currentContent: content }),

  createContent: async (content) => {
    set({ isLoading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('cms_content')
        .insert({
          ...content,
          created_by: user.id,
          status: content.status || 'draft' as ContentStatus,
          type: content.type as ContentType
        })
        .select()
        .single();

      if (error) throw error;
      set((state) => ({ 
        content: [data as BaseContent, ...state.content],
        error: null 
      }));
      toast.success('Content created successfully');
    } catch (error) {
      console.error('Error creating content:', error);
      set({ error: error as Error });
      toast.error('Failed to create content');
    } finally {
      set({ isLoading: false });
    }
  },

  updateContent: async (id, updates) => {
    set({ isLoading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('cms_content')
        .update({
          ...updates,
          updated_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        content: state.content.map(item => 
          item.id === id ? { ...item, ...data } as BaseContent : item
        ),
        error: null
      }));
      toast.success('Content updated successfully');
    } catch (error) {
      console.error('Error updating content:', error);
      set({ error: error as Error });
      toast.error('Failed to update content');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteContent: async (id) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('cms_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set((state) => ({
        content: state.content.filter(item => item.id !== id),
        error: null
      }));
      toast.success('Content deleted successfully');
    } catch (error) {
      console.error('Error deleting content:', error);
      set({ error: error as Error });
      toast.error('Failed to delete content');
    } finally {
      set({ isLoading: false });
    }
  },
}));