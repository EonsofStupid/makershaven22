
import { atom } from 'jotai';
import { BaseContent, ContentCreate, ContentUpdate } from '@/lib/types/content/types';
import { ContentStatus, ContentType } from '@/lib/types/core/enums';
import { JsonObject } from '@/lib/types/core/json';

// Define initial content state atoms
export const contentFormTitleAtom = atom<string>('');
export const contentFormTypeAtom = atom<ContentType>('page');
export const contentFormStatusAtom = atom<ContentStatus>('draft');
export const contentFormSlugAtom = atom<string>('');
export const contentFormContentAtom = atom<Record<string, unknown>>({});
export const contentFormMetadataAtom = atom<Record<string, unknown>>({});

// Current editing content
export const currentContentAtom = atom<BaseContent | null>(null);

// Derived atom for content form validation
export const contentFormValidAtom = atom<boolean>((get) => {
  const title = get(contentFormTitleAtom);
  return title.trim().length > 0;
});

// Action atoms for loading, saving, etc.
export const contentLoadingAtom = atom<boolean>(false);
export const contentErrorAtom = atom<Error | null>(null);

// Content list atom
export const contentListAtom = atom<BaseContent[]>([]);

// Actions
export const initializeContentFormAtom = atom(
  null,
  (get, set, content: BaseContent | null) => {
    if (content) {
      set(contentFormTitleAtom, content.title);
      set(contentFormTypeAtom, content.type);
      set(contentFormStatusAtom, content.status);
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

// Prepare create/update data
export const prepareContentCreateAtom = atom<ContentCreate>((get) => {
  return {
    title: get(contentFormTitleAtom),
    type: get(contentFormTypeAtom),
    status: get(contentFormStatusAtom),
    slug: get(contentFormSlugAtom) || undefined,
    content: get(contentFormContentAtom) as unknown as JsonObject,
    metadata: get(contentFormMetadataAtom) as unknown as JsonObject,
    created_by: '' // This will be filled by the content mutation function
  };
});

export const prepareContentUpdateAtom = atom<ContentUpdate>((get) => {
  const current = get(currentContentAtom);
  if (!current) throw new Error('No content selected for update');
  
  return {
    id: current.id,
    title: get(contentFormTitleAtom),
    type: get(contentFormTypeAtom),
    status: get(contentFormStatusAtom),
    slug: get(contentFormSlugAtom) || undefined,
    content: get(contentFormContentAtom) as unknown as JsonObject,
    metadata: get(contentFormMetadataAtom) as unknown as JsonObject,
    updated_by: '' // This will be filled by the content mutation function
  };
});

// Reset form atom
export const resetContentFormAtom = atom(
  null,
  (_, set) => {
    set(contentFormTitleAtom, '');
    set(contentFormTypeAtom, 'page');
    set(contentFormStatusAtom, 'draft');
    set(contentFormSlugAtom, '');
    set(contentFormContentAtom, {});
    set(contentFormMetadataAtom, {});
    set(currentContentAtom, null);
  }
);
