import { useAtom, useAtomValue } from 'jotai';
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
  const [activeContent] = useAtom(activeContentAtom);
  const contentHistory = useAtomValue(contentHistoryAtom);
  const isLoading = useAtomValue(contentLoadingAtom);
  const error = useAtomValue(contentErrorAtom);
  const [, setActiveContent] = useAtom(setActiveContentAtom);
  const [, addToHistory] = useAtom(addToHistoryAtom);
  const [, clearHistory] = useAtom(clearHistoryAtom);

  return {
    activeContent,
    contentHistory,
    isLoading,
    error,
    setActiveContent,
    addToHistory,
    clearHistory
  };
};