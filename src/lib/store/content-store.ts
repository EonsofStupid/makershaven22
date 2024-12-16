import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { BaseContent, ContentType } from '@/components/content/types/contentTypes';
import { toast } from 'sonner';

interface ContentState {
  content: BaseContent[];
  currentContent: BaseContent | null;
  isLoading: boolean;
  error: Error | null;
  fetchContent: () => Promise<void>;
  setCurrentContent: (content: BaseContent | null) => void;
  createContent: (content: Partial<BaseContent>) => Promise<void>;
  updateContent: (id: string, updates: Partial<BaseContent>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set, get) => ({
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
          created_by:profiles(display_name)
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
      const { data, error } = await supabase
        .from('cms_content')
        .insert([content])
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
      const { data, error } = await supabase
        .from('cms_content')
        .update(updates)
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