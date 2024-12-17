import { useContentStore } from '@/lib/store/content-store';
import type { BaseContent } from '../types/contentTypes';

export const useContent = (contentId?: string) => {
  const { 
    content,
    currentContent,
    isLoading,
    error,
    fetchContent,
    setCurrentContent,
    createContent,
    updateContent,
    deleteContent
  } = useContentStore();

  // If contentId is provided, find that specific content
  const specificContent = contentId 
    ? content.find(item => item.id === contentId) 
    : null;

  return {
    content: specificContent || currentContent,
    isLoading,
    error,
    fetchContent,
    setCurrentContent,
    createContent,
    updateContent,
    deleteContent
  };
};