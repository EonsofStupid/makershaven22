import React from 'react';
import { useContentMutations } from "./useContentMutations";
import { toast } from "sonner";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ContentType, ContentStatus } from "@/lib/types";

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
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="block text-sm font-medium">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="slug" className="block text-sm font-medium">Slug</Label>
          <Input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        
        <div>
          <Label htmlFor="type" className="block text-sm font-medium">Content Type</Label>
          <Select value={type} onValueChange={(value) => setType(value as ContentType)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="page">Page</SelectItem>
              <SelectItem value="component">Component</SelectItem>
              <SelectItem value="template">Template</SelectItem>
              <SelectItem value="build">Build</SelectItem>
              <SelectItem value="guide">Guide</SelectItem>
              <SelectItem value="part">Part</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="status" className="block text-sm font-medium">Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value as ContentStatus)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        type="submit"
        disabled={!isValid}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {currentContent?.id ? 'Update Content' : 'Create Content'}
      </Button>
    </form>
  );
};

export default ContentForm;
