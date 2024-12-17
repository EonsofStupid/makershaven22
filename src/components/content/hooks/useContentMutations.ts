import { useContentStore } from '@/lib/store/content-store';
import type { BaseContent } from '@/lib/types/content';

export const useContentMutations = () => {
  const { createContent, updateContent } = useContentStore();

  return {
    createContent: {
      mutateAsync: createContent
    },
    updateContent: {
      mutateAsync: updateContent
    }
  };
};