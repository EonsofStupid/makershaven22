
import { ContentCreate, ContentUpdate } from "@/lib/types/content/types";
import { useContentMutations } from "./useContentMutations";
import { isContentPage, isContentComponent } from "@/utils/validators";
import { toast } from "sonner";
import type { Json } from "@/lib/types/core/json";
import { isJsonObject } from "@/lib/types/core/json";

// Type guard to ensure content is an object before submission
const ensureContentObject = (content: Json): Record<string, unknown> => {
  if (isJsonObject(content)) {
    return content as Record<string, unknown>;
  }
  // If not a valid object, return an empty object
  console.warn("Content was not a valid object, converting to empty object");
  return {};
};

const handleSubmit = async (content: Json) => {
  const { createContentWithUser, updateContentWithUser } = useContentMutations();

  try {
    // Ensure content is a valid object for both validations and mutations
    const contentObj = ensureContentObject(content);
    
    if (isContentPage(contentObj)) {
      // Logic for page content
      console.log('Handling page content:', contentObj);
      
      if ('id' in contentObj) {
        await updateContentWithUser(contentObj as Omit<ContentUpdate, 'updated_by'>);
      } else {
        await createContentWithUser(contentObj as Omit<ContentCreate, 'created_by'>);
      }
    } else if (isContentComponent(contentObj)) {
      // Logic for component content
      console.log('Handling component content:', contentObj);
      
      if ('id' in contentObj) {
        await updateContentWithUser(contentObj as Omit<ContentUpdate, 'updated_by'>);
      } else {
        await createContentWithUser(contentObj as Omit<ContentCreate, 'created_by'>);
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
