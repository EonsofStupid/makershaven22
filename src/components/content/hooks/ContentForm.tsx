
import { ContentCreate, ContentUpdate } from "@/lib/types/content/types";
import { useContentMutations } from "./useContentMutations";
import { isContentPage, isContentComponent } from "@/utils/validators";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

const handleSubmit = async (content: Json) => {
  const { createContentWithUser, updateContentWithUser } = useContentMutations();

  try {
    if (isContentPage(content)) {
      // Logic for page content
      console.log('Handling page content:', content);
      
      if ('id' in content) {
        await updateContentWithUser(content as Omit<ContentUpdate, 'updated_by'>);
      } else {
        await createContentWithUser(content as Omit<ContentCreate, 'created_by'>);
      }
    } else if (isContentComponent(content)) {
      // Logic for component content
      console.log('Handling component content:', content);
      
      if ('id' in content) {
        await updateContentWithUser(content as Omit<ContentUpdate, 'updated_by'>);
      } else {
        await createContentWithUser(content as Omit<ContentCreate, 'created_by'>);
      }
    } else {
      toast.error("Invalid content structure");
      return;
    }
  } catch (error) {
    console.error("Error handling content submission:", error);
    toast.error(error instanceof Error ? error.message : "Error handling content");
  }
};

export default handleSubmit;
