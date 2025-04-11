
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContentCreate, ContentUpdate, BaseContent } from "@/lib/types/content/types";
import { JsonObject } from "@/lib/types/core/json";

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: { message: string }[];
}

// Simple validation for content creation and updates
const validateContentCreate = (data: ContentCreate): ValidationResult<ContentCreate> => {
  if (!data.title || data.title.trim() === '') {
    return {
      success: false,
      errors: [{ message: 'Title is required' }]
    };
  }
  
  if (!data.created_by) {
    return {
      success: false,
      errors: [{ message: 'User ID (created_by) is required' }]
    };
  }
  
  return {
    success: true,
    data: {
      ...data,
      content: data.content || {} as JsonObject,
      metadata: data.metadata || {} as JsonObject
    }
  };
};

const validateContentUpdate = (data: ContentUpdate): ValidationResult<ContentUpdate> => {
  if (!data.id) {
    return {
      success: false,
      errors: [{ message: 'Content ID is required' }]
    };
  }
  
  if (!data.updated_by) {
    return {
      success: false,
      errors: [{ message: 'User ID (updated_by) is required' }]
    };
  }
  
  if (data.title !== undefined && data.title.trim() === '') {
    return {
      success: false,
      errors: [{ message: 'Title cannot be empty' }]
    };
  }
  
  return {
    success: true,
    data
  };
};

export const useContentMutations = () => {
  const queryClient = useQueryClient();

  // Define mutation for content creation with proper typing
  const createContent = useMutation({
    mutationFn: async (contentData: ContentCreate) => {
      console.log("Creating content:", contentData);
      
      // Validate the content data
      const validation = validateContentCreate(contentData);
      if (!validation.success) {
        const errorMessage = validation.errors?.[0]?.message || "Content validation failed";
        console.error("Validation error:", validation.errors);
        throw new Error(errorMessage);
      }

      // Insert the validated data
      const { data: result, error } = await supabase
        .from("cms_content")
        .insert(validation.data as ContentCreate)
        .select()
        .single();

      if (error) {
        console.error("Error creating content:", error);
        throw error;
      }

      return result as BaseContent;
    },
    onSuccess: (newContent) => {
      queryClient.invalidateQueries({ queryKey: ["cms_content"] });
      toast.success("Content created successfully");
    },
    onError: (error) => {
      console.error("Error in content creation:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create content");
    },
  });

  // Define mutation for content updates with proper typing
  const updateContent = useMutation({
    mutationFn: async (contentData: ContentUpdate) => {
      console.log("Updating content:", contentData);
      
      // Validate the content data
      const validation = validateContentUpdate(contentData);
      if (!validation.success) {
        const errorMessage = validation.errors?.[0]?.message || "Content validation failed";
        console.error("Validation error:", validation.errors);
        throw new Error(errorMessage);
      }

      // Update with validated data
      const { data: result, error } = await supabase
        .from("cms_content")
        .update(validation.data as ContentUpdate)
        .eq("id", contentData.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating content:", error);
        throw error;
      }

      return result as BaseContent;
    },
    onSuccess: (updatedContent) => {
      queryClient.invalidateQueries({ queryKey: ["cms_content"] });
      toast.success("Content updated successfully");
    },
    onError: (error) => {
      console.error("Error in content update:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update content");
    },
  });

  // Helper function to prepare content data with the current user
  const prepareContentWithUser = async <T extends object>(data: T): Promise<T & { created_by: string } | T & { updated_by: string }> => {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // If we have an id, it's an update operation
    if ('id' in data) {
      return { ...data, updated_by: user.id } as T & { updated_by: string };
    }
    
    // Otherwise it's a create operation
    return { ...data, created_by: user.id } as T & { created_by: string };
  };

  // Convenience wrappers for common use cases
  const createContentWithUser = async (data: Omit<ContentCreate, 'created_by'>) => {
    const contentData = await prepareContentWithUser(data) as ContentCreate;
    return createContent.mutateAsync(contentData);
  };

  const updateContentWithUser = async (data: Omit<ContentUpdate, 'updated_by'>) => {
    const contentData = await prepareContentWithUser(data) as ContentUpdate;
    return updateContent.mutateAsync(contentData);
  };

  return {
    createContent,
    updateContent,
    createContentWithUser,
    updateContentWithUser
  };
};
