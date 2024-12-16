import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { 
  activeContentAtom, 
  contentHistoryAtom, 
  contentLoadingAtom, 
  contentErrorAtom,
  setActiveContentAtom,
  addToContentHistoryAtom,
  clearContentHistoryAtom
} from '../atoms/content';
import type { BaseContent } from '@/lib/types/content';

export const useContent = () => {
  const [activeContent] = useAtom(activeContentAtom);
  const [contentHistory] = useAtom(contentHistoryAtom);
  const [isLoading] = useAtom(contentLoadingAtom);
  const [error] = useAtom(contentErrorAtom);
  const [, setActiveContent] = useAtom(setActiveContentAtom);
  const [, addToHistory] = useAtom(addToContentHistoryAtom);
  const [, clearHistory] = useAtom(clearContentHistoryAtom);

  const addContentToHistory = useCallback((contentId: string, content: BaseContent) => {
    addToHistory({ contentId, content });
  }, [addToHistory]);

  const clearContentHistory = useCallback((contentId: string) => {
    clearHistory(contentId);
  }, [clearHistory]);

  return {
    activeContent,
    setActiveContent,
    contentHistory,
    addToHistory: addContentToHistory,
    clearHistory: clearContentHistory,
    isLoading,
    error,
    hasHistory: (contentId: string) => Boolean(contentHistory[contentId]?.length),
    getHistoryForContent: (contentId: string) => contentHistory[contentId] || [],
  };
};