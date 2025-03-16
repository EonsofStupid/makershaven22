
import { atom } from 'jotai';
import type { ContentCreate, ContentUpdate, BaseContent } from '@/lib/types/content/types';
import { ContentStatus, ContentType } from '@/lib/types/core/enums';

// State atoms for content management
export const currentContentAtom = atom<BaseContent | null>(null);
export const contentListAtom = atom<BaseContent[]>([]);
export const contentLoadingAtom = atom(false);
export const contentErrorAtom = atom<Error | null>(null);

// Form state atoms
export const contentFormTitleAtom = atom('');
export const contentFormTypeAtom = atom<ContentType>('page');
export const contentFormStatusAtom = atom<ContentStatus>('draft');
export const contentFormSlugAtom = atom('');
export const contentFormContentAtom = atom<any>({});
export const contentFormMetadataAtom = atom<any>({});

// Derived atoms for form operations
export const contentFormValidAtom = atom(
  (get) => {
    const title = get(contentFormTitleAtom);
    const type = get(contentFormTypeAtom);
    return title.trim() !== '' && type !== undefined;
  }
);

// Create an atom that represents the form data for creating content
export const contentCreateDataAtom = atom(
  (get) => {
    return {
      title: get(contentFormTitleAtom),
      type: get(contentFormTypeAtom),
      status: get(contentFormStatusAtom),
      slug: get(contentFormSlugAtom),
      content: get(contentFormContentAtom),
      metadata: get(contentFormMetadataAtom),
    } as Omit<ContentCreate, 'created_by'>;
  }
);

// Create an atom that represents the form data for updating content
export const contentUpdateDataAtom = atom(
  (get) => {
    const currentContent = get(currentContentAtom);
    if (!currentContent) return null;
    
    return {
      id: currentContent.id,
      title: get(contentFormTitleAtom),
      type: get(contentFormTypeAtom),
      status: get(contentFormStatusAtom),
      slug: get(contentFormSlugAtom),
      content: get(contentFormContentAtom),
      metadata: get(contentFormMetadataAtom),
    } as Omit<ContentUpdate, 'updated_by'>;
  }
);

// Reset form atoms to defaults or with specific content
export const resetContentFormAtom = atom(
  null,
  (get, set, content: BaseContent | null = null) => {
    if (content) {
      set(contentFormTitleAtom, content.title);
      set(contentFormTypeAtom, content.type);
      set(contentFormStatusAtom, content.status || 'draft');
      set(contentFormSlugAtom, content.slug || '');
      set(contentFormContentAtom, content.content || {});
      set(contentFormMetadataAtom, content.metadata || {});
      set(currentContentAtom, content);
    } else {
      set(contentFormTitleAtom, '');
      set(contentFormTypeAtom, 'page');
      set(contentFormStatusAtom, 'draft');
      set(contentFormSlugAtom, '');
      set(contentFormContentAtom, {});
      set(contentFormMetadataAtom, {});
      set(currentContentAtom, null);
    }
  }
);
