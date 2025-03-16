
import { useContentQuery } from "./useContentQuery";
import { useContentMutations } from "./useContentMutations";
import { useAtom } from "jotai";
import { 
  contentListAtom, 
  contentLoadingAtom, 
  contentErrorAtom,
  currentContentAtom,
  resetContentFormAtom
} from "@/lib/store/atoms/content-atoms";
import { BaseContent } from "@/lib/types/content/types";

export const useContent = (contentId?: string) => {
  const { data: fetchedContent, isLoading: isFetching } = useContentQuery(contentId);
  const { createContentWithUser, updateContentWithUser } = useContentMutations();
  
  const [contentList] = useAtom(contentListAtom);
  const [isLoading] = useAtom(contentLoadingAtom);
  const [error] = useAtom(contentErrorAtom);
  const [currentContent] = useAtom(currentContentAtom);
  const [, resetContentForm] = useAtom(resetContentFormAtom);

  // If we have a contentId but no currentContent, set it from the fetched data
  if (contentId && fetchedContent && (!currentContent || currentContent.id !== contentId)) {
    resetContentForm(fetchedContent);
  }

  const setCurrentContent = (content: BaseContent | null) => {
    resetContentForm(content);
  };

  return {
    content: currentContent || fetchedContent,
    contentList,
    isLoading: isLoading || isFetching,
    error,
    createContent: createContentWithUser,
    updateContent: updateContentWithUser,
    setCurrentContent,
    resetForm: () => resetContentForm(null)
  };
};

export default useContent;
