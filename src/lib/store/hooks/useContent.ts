import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { useContentStore } from '../content-store';
import {
  activeContentAtom,
  contentHistoryAtom,
  contentLoadingAtom,
  contentErrorAtom,
  setActiveContentAtom,
  addToHistoryAtom,
  clearHistoryAtom
} from '../atoms/content/content-atoms';
import type { BaseContent } from '@/components/content/types/cms';

export const useContent = () => {
  // Zustand state
  const zustandState = useContentStore();

  // Jotai atoms
  const [activeContent, setActiveContent] = useAtom(activeContentAtom);
  const [contentHistory] = useAtom(contentHistoryAtom);
  const isLoading = useAtomValue(contentLoadingAtom);
  const error = useAtomValue(contentErrorAtom);
  const [, addToHistory] = useAtom(addToHistoryAtom);
  const [, clearHistory] = useAtom(clearHistoryAtom);

  // Memoized actions
  const updateContent = useCallback((content: BaseContent | null) => {
    setActiveContent(content);
    if (content) {
      addToHistory({ contentId: content.id, content });
    }
  }, [setActiveContent, addToHistory]);

  const resetContent = useCallback(() => {
    zustandState.reset();
  }, [zustandState]);

  return {
    // State
    activeContent,
    contentHistory,
    isLoading,
    error,

    // Actions
    setActiveContent: updateContent,
    addToHistory,
    clearHistory,
    resetContent,

    // Utility functions
    hasHistory: (contentId: string) => 
      Boolean(contentHistory[contentId]?.length),
    getHistoryForContent: (contentId: string) => 
      contentHistory[contentId] || [],
  };
};