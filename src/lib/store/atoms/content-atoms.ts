
import { atom } from 'jotai';
import type { BaseContent } from '@/lib/types/content/types';
import { ContentStatus, ContentType } from '@/lib/types/core/enums';

// State atoms for content management
export const contentListAtom = atom<BaseContent[]>([]);
export const contentLoadingAtom = atom<boolean>(false);
export const contentErrorAtom = atom<Error | null>(null);
export const currentContentAtom = atom<BaseContent | null>(null);

// Form state atoms
export const contentFormTitleAtom = atom<string>('');
export const contentFormTypeAtom = atom<ContentType>('page');
export const contentFormStatusAtom = atom<ContentStatus>('draft');
export const contentFormSlugAtom = atom<string>('');
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
