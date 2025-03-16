
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BaseContent } from "@/lib/types/content/types";
import { useContentMutations } from "./useContentMutations";

export const useContent = (contentId?: string) => {
  // Fetch content directly to avoid type mismatches
  const { data: content, isLoading } = useQuery({
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

      return data as BaseContent; // Cast to the centralized BaseContent type
    },
    enabled: !!contentId,
  });

  const { createContentWithUser, updateContentWithUser } = useContentMutations();

  const setCurrentContent = (newContent: BaseContent | null) => {
    // Implementation will be handled separately
    console.log("Setting current content:", newContent);
  };

  return {
    content,
    isLoading,
    error: null,
    createContent: createContentWithUser,
    updateContent: updateContentWithUser,
    setCurrentContent,
    resetForm: () => console.log("Reset form called")
  };
};

export default useContent;
