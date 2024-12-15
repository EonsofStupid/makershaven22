import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { activeContentAtom, contentHistoryAtom } from '../atoms/content';
import type { BaseContent } from '@/lib/types/content';

export const useContent = () => {
  const [activeContent, setActiveContent] = useAtom(activeContentAtom);
  const [contentHistory, setContentHistory] = useAtom(contentHistoryAtom);

  const addToHistory = useCallback((contentId: string, content: BaseContent) => {
    setContentHistory((prev) => ({
      ...prev,
      [contentId]: [...(prev[contentId] || []), content],
    }));
  }, [setContentHistory]);

  const clearHistory = useCallback((contentId: string) => {
    setContentHistory((prev) => {
      const { [contentId]: _, ...rest } = prev;
      return rest;
    });
  }, [setContentHistory]);

  return {
    activeContent,
    setActiveContent,
    contentHistory,
    addToHistory,
    clearHistory,
    hasHistory: (contentId: string) => Boolean(contentHistory[contentId]?.length),
    getHistoryForContent: (contentId: string) => contentHistory[contentId] || [],
  };
};