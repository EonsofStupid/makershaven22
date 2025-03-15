
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContentType } from "@/lib/types/enums";
import { validateContent } from "../utils/contentTypeValidation";
import { ContentCreate, ContentUpdate } from "@/lib/types/content/types";

export const useContentMutations = () => {
  const queryClient = useQueryClient();

  const createContent = useMutation({
    mutationFn: async ({ type, title, ...data }: { type: ContentType; title: string } & Record<string, any>) => {
      console.log("Creating content:", { type, title, data });
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      const contentData: ContentCreate = {
        type,
        title,
        created_by: user.id, // Use the authenticated user's ID
        ...data,
      };
      
      const validation = await validateContent(type, contentData);
      if (!validation.success) {
        throw new Error("Content validation failed");
      }

      const { data: result, error } = await supabase
        .from("cms_content")
        .insert(validation.data)
        .select()
        .single();

      if (error) {
        console.error("Error creating content:", error);
        throw error;
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms_content"] });
      toast.success("Content created successfully");
    },
    onError: (error) => {
      console.error("Error in content creation:", error);
      toast.error("Failed to create content");
    },
  });

  const updateContent = useMutation({
    mutationFn: async ({ id, type, title, ...data }: { id: string; type: ContentType; title: string } & Record<string, any>) => {
      console.log("Updating content:", { id, type, title, data });
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      const contentData: ContentUpdate = {
        id,
        type,
        title,
        updated_by: user.id, // Use the authenticated user's ID for tracking updates
        ...data
      };
      
      const validation = await validateContent(type, contentData);
      if (!validation.success) {
        throw new Error("Content validation failed");
      }

      const { data: result, error } = await supabase
        .from("cms_content")
        .update(validation.data)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating content:", error);
        throw error;
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms_content"] });
      toast.success("Content updated successfully");
    },
    onError: (error) => {
      console.error("Error in content update:", error);
      toast.error("Failed to update content");
    },
  });

  return {
    createContent,
    updateContent,
  };
};
