import { StateCreator } from 'zustand';
import { ContentState, BaseContent } from '../types/store/content';
import { GlobalState } from '../types';

export const createContentSlice: StateCreator<
  GlobalState,
  [],
  [],
  ContentState
> = (set) => ({
  activeContent: null,
  contentHistory: {},
  isLoading: false,
  error: null,
  setActiveContent: (content: BaseContent | null) => set({ activeContent: content }),
  addToHistory: (contentId: string, content: BaseContent) => 
    set((state) => ({
      contentHistory: {
        ...state.contentHistory,
        [contentId]: [...(state.contentHistory[contentId] || []), content]
      }
    })),
  clearHistory: (contentId: string) => 
    set((state) => {
      const { [contentId]: _, ...rest } = state.contentHistory;
      return { contentHistory: rest };
    }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
  reset: () => set({
    activeContent: null,
    contentHistory: {},
    isLoading: false,
    error: null
  })
});