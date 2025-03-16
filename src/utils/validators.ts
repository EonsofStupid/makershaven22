
import type { Json } from "@/lib/types/core/json";
import { isJsonObject } from "@/lib/types/core/json";
import type { BaseContent } from "@/components/content/types/cms";

export const isContentPage = (content: Json | Record<string, unknown>): boolean => {
  return isJsonObject(content) && 
         'type' in content && 
         content.type === 'page';
};

export const isContentComponent = (content: Json | Record<string, unknown>): boolean => {
  return isJsonObject(content) && 
         'type' in content && 
         content.type === 'component';
};
