import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { BaseContent } from '@/lib/types/content';

// Persistent storage atoms for content state
export const activeContentAtom = atomWithStorage<BaseContent | null>('active-content', null);
export const contentHistoryAtom = atomWithStorage<Record<string, BaseContent[]>>('content-history', {});

// Volatile state atoms
export const contentLoadingAtom = atom<boolean>(false);
export const contentErrorAtom = atom<Error | null>(null);

// Action atoms
export const setActiveContentAtom = atom(
  null,
  (get, set, content: BaseContent | null) => {
    set(activeContentAtom, content);
  }
);

export const addToContentHistoryAtom = atom(
  null,
  (get, set, update: { contentId: string; content: BaseContent }) => {
    const currentHistory = get(contentHistoryAtom);
    const contentHistory = currentHistory[update.contentId] || [];
    
    set(contentHistoryAtom, {
      ...currentHistory,
      [update.contentId]: [...contentHistory, update.content]
    });
  }
);

export const clearContentHistoryAtom = atom(
  null,
  (get, set, contentId: string) => {
    const currentHistory = get(contentHistoryAtom);
    const { [contentId]: _, ...rest } = currentHistory;
    set(contentHistoryAtom, rest);
  }
);