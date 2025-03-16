
import React from 'react';
import { useContentMutations } from "./useContentMutations";
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
  const [title, setTitle] = useAtom(contentFormTitleAtom);
  const [type, setType] = useAtom(contentFormTypeAtom);
  const [status, setStatus] = useAtom(contentFormStatusAtom);
  const [slug, setSlug] = useAtom(contentFormSlugAtom);
  const [content, setContent] = useAtom(contentFormContentAtom);
  const [metadata, setMetadata] = useAtom(contentFormMetadataAtom);
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
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium">Slug</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        
        {/* Content type and status selectors would go here */}
      </div>
      
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
