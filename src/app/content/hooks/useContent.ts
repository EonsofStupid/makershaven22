
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAtom } from "jotai";

// TODO: Update these imports once data services are properly set up
const supabase = {
  from: (table: string) => ({
    select: (query: string) => ({
      eq: (field: string, value: any) => ({
        single: () => Promise.resolve({ data: {}, error: null })
      })
    })
  })
};

const currentContentAtom = { current: null };

// TODO: Import BaseContent type from the appropriate location
interface BaseContent {
  id: string;
  title: string;
  status: string;
}

// TODO: Import content mutations once they're implemented
const useContentMutations = () => {
  return {
    createContentWithUser: async () => {},
    updateContentWithUser: async () => {}
  };
};

export const useContent = (contentId?: string) => {
  // Use Jotai atoms
  const [currentContent, setCurrentContent] = useAtom(currentContentAtom as any);

  // Fetch content directly to avoid type mismatches
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["cms_content", contentId],
    queryFn: async () => {
      if (!contentId) return null;

      const { data, error } = await supabase
        .from("cms_content")
        .select("*")
        .eq("id", contentId)
        .single();

      if (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load content");
        throw error;
      }

      return data as BaseContent;
    },
    enabled: !!contentId,
  });

  const { createContentWithUser, updateContentWithUser } = useContentMutations();

  // When content is loaded, update the form state
  React.useEffect(() => {
    if (content) {
      setCurrentContent(content);
    }
  }, [content, setCurrentContent]);

  const resetForm = React.useCallback((initialContent: BaseContent | null) => {
    setCurrentContent(initialContent);
  }, [setCurrentContent]);

  return {
    content,
    isLoading,
    error,
    createContent: createContentWithUser,
    updateContent: updateContentWithUser,
    setCurrentContent,
    resetForm
  };
};

export default useContent;
