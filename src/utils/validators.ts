import { Json } from "@/lib/types/base";
import type { BaseContent } from "@/lib/types/content";

export const isContentPage = (content: Json): boolean => {
  return typeof content === 'object' && content !== null && 'type' in content && content.type === 'page';
};

export const isContentComponent = (content: Json): boolean => {
  return typeof content === 'object' && content !== null && 'type' in content && content.type === 'component';
};