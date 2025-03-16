
import React from 'react';
import { useContentMutations } from "./useContentMutations";
import { isContentPage, isContentComponent } from "@/utils/validators";
import { toast } from "sonner";
import { BaseContent } from "@/lib/types/content/types";
import { useAtom } from "jotai";
import { 
  contentFormTitleAtom, 
  contentFormTypeAtom,
  contentFormStatusAtom,
  contentFormSlugAtom,
  contentFormContentAtom,
  contentFormMetadataAtom,
  contentFormValidAtom,
  currentContentAtom
} from "@/lib/store/atoms/content-atoms";

const ContentForm: React.FC = () => {
  const { createContentWithUser, updateContentWithUser } = useContentMutations();
  const [title] = useAtom(contentFormTitleAtom);
  const [type] = useAtom(contentFormTypeAtom);
  const [status] = useAtom(contentFormStatusAtom);
  const [slug] = useAtom(contentFormSlugAtom);
  const [content] = useAtom(contentFormContentAtom);
  const [metadata] = useAtom(contentFormMetadataAtom);
  const [isValid] = useAtom(contentFormValidAtom);
  const [currentContent] = useAtom(currentContentAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const formData = {
        title,
        type,
        status,
        slug,
        content,
        metadata
      };

      if (currentContent?.id) {
        // Update existing content
        await updateContentWithUser({
          ...formData,
          id: currentContent.id
        });
        toast.success("Content updated successfully");
      } else {
        // Create new content
        await createContentWithUser(formData);
        toast.success("Content created successfully");
      }
    } catch (error) {
      console.error("Error handling content submission:", error);
      toast.error(error instanceof Error ? error.message : "Error handling content");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form implementation - This is a stub, actual form would be implemented based on design requirements */}
      <button 
        type="submit"
        disabled={!isValid}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {currentContent?.id ? 'Update Content' : 'Create Content'}
      </button>
    </form>
  );
};

export default ContentForm;
