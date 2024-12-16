import { useContentStore } from '@/lib/store/content-store';

export const useContentQuery = (contentId?: string) => {
  const { content, isLoading, error } = useContentStore();
  
  const data = contentId 
    ? content.find(item => item.id === contentId) 
    : null;

  return {
    data,
    isLoading,
    error
  };
};