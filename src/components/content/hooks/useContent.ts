
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BaseContent } from "@/lib/types/content/types";
import { useContentMutations } from "./useContentMutations";
import { useAtom } from "jotai";
import { currentContentAtom, resetContentFormAtom } from "@/lib/store/atoms/content-atoms";

export const useContent = (contentId?: string) => {
  // Use Jotai atoms
  const [currentContent, setCurrentContent] = useAtom(currentContentAtom);
  const [, resetForm] = useAtom(resetContentFormAtom);

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
      resetForm(content);
    }
  }, [content, resetForm]);

  return {
    content,
    isLoading,
    error,
    createContent: createContentWithUser,
    updateContent: updateContentWithUser,
    setCurrentContent: (newContent: BaseContent | null) => {
      setCurrentContent(newContent);
      resetForm(newContent);
    },
    resetForm
  };
};

export default useContent;
