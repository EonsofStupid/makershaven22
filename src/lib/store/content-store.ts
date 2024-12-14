import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BaseContent } from '@/components/content/types/cms';

interface ContentState {
  activeContent: BaseContent | null;
  contentHistory: Record<string, BaseContent[]>;
  isLoading: boolean;
  error: Error | null;
  // Actions
  setActiveContent: (content: BaseContent | null) => void;
  addToHistory: (contentId: string, content: BaseContent) => void;
  clearHistory: (contentId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      activeContent: null,
      contentHistory: {},
      isLoading: false,
      error: null,
      setActiveContent: (content) => set({ activeContent: content }),
      addToHistory: (contentId, content) => 
        set((state) => ({
          contentHistory: {
            ...state.contentHistory,
            [contentId]: [...(state.contentHistory[contentId] || []), content]
          }
        })),
      clearHistory: (contentId) => 
        set((state) => {
          const { [contentId]: _, ...rest } = state.contentHistory;
          return { contentHistory: rest };
        }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({
        activeContent: null,
        contentHistory: {},
        isLoading: false,
        error: null
      })
    }),
    {
      name: 'content-store'
    }
  )
);