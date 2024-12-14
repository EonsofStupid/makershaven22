import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { BaseContent } from '@/components/content/types/cms';
import { useContentStore } from '../../content-store';

// Content atoms that sync with Zustand
export const activeContentAtom = atom<BaseContent | null>(
  (get) => useContentStore.getState().activeContent
);

export const contentHistoryAtom = atom(
  (get) => useContentStore.getState().contentHistory
);

// Loading state atom
export const contentLoadingAtom = atom<boolean>(
  (get) => useContentStore.getState().isLoading
);

// Error state atom
export const contentErrorAtom = atom<Error | null>(
  (get) => useContentStore.getState().error
);

// Action atoms
export const setActiveContentAtom = atom(
  null,
  (get, set, content: BaseContent | null) => {
    useContentStore.getState().setActiveContent(content);
  }
);

export const addToHistoryAtom = atom(
  null,
  (get, set, params: { contentId: string; content: BaseContent }) => {
    useContentStore.getState().addToHistory(params.contentId, params.content);
  }
);

export const clearHistoryAtom = atom(
  null,
  (get, set, contentId: string) => {
    useContentStore.getState().clearHistory(contentId);
  }
);