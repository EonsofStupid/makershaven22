
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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

// TODO: Import BaseContent type from the appropriate location
interface BaseContent {
  id: string;
  title: string;
  status: string;
}

export const useContentQuery = (contentId?: string) => {
  return useQuery({
    queryKey: ["cms_content", contentId],
    queryFn: async () => {
      console.log("Fetching content:", contentId);
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

      console.log("Fetched content:", data);
      return data as BaseContent;
    },
    enabled: !!contentId,
  });
};
