
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// TODO: Update these imports once data services are properly set up
const supabase = {
  from: (table: string) => ({
    select: (query: string) => ({
      or: (condition: string) => Promise.resolve({ data: [], error: null })
    })
  })
};

// TODO: Import BaseContent and ContentRelationship types from the appropriate location
interface BaseContent {
  id: string;
  title: string;
  status: string;
  type: string;
  content: any;
  metadata: any;
}

interface ContentRelationship {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: string;
  order_index: number;
  parent: BaseContent;
  child: BaseContent;
}

export const useContentRelationships = (contentId?: string) => {
  return useQuery({
    queryKey: ["content_relationships", contentId],
    queryFn: async () => {
      if (!contentId) return [];

      console.log("Fetching relationships for content:", contentId);

      const { data, error } = await supabase
        .from("cms_content_relationships")
        .select(`
          id,
          parent_id,
          child_id,
          relationship_type,
          order_index,
          parent:cms_content!parent_id (
            id, type, title, status, content, metadata
          ),
          child:cms_content!child_id (
            id, type, title, status, content, metadata
          )
        `)
        .or(`parent_id.eq.${contentId},child_id.eq.${contentId}`);

      if (error) {
        console.error("Error fetching relationships:", error);
        toast.error("Failed to load relationships");
        throw error;
      }

      console.log("Fetched relationships:", data);

      // Transform the data to match the ContentRelationship type
      return data.map((relationship) => ({
        ...relationship,
        parent: Array.isArray(relationship.parent) 
          ? relationship.parent[0] 
          : relationship.parent,
        child: Array.isArray(relationship.child)
          ? relationship.child[0]
          : relationship.child,
      })) as ContentRelationship[];
    },
    enabled: !!contentId,
  });
};
