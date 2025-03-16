import type { Atom } from 'jotai';
import type { 
  BaseContent, 
  ContentType, 
  ContentStatus,
  JsonObject 
} from '@/lib/types/core';

/**
 * Content form state interface
 */
export interface ContentFormState {
  title: string;
  type: ContentType;
  status: ContentStatus;
  slug?: string;
  content?: JsonObject;
  metadata?: JsonObject;
}

/**
 * Content form validation state interface
 */
export interface ContentFormValidation {
  isValid: boolean;
  errors: {
    title?: string;
    type?: string;
    status?: string;
    slug?: string;
    content?: string;
    metadata?: string;
  };
}

/**
 * Content atom types
 */
export interface ContentAtoms {
  // Form state atoms
  titleAtom: Atom<string>;
  typeAtom: Atom<ContentType>;
  statusAtom: Atom<ContentStatus>;
  slugAtom: Atom<string>;
  contentAtom: Atom<JsonObject>;
  metadataAtom: Atom<JsonObject>;
  
  // Validation atoms
  validationAtom: Atom<ContentFormValidation>;
  
  // Current content atom
  currentContentAtom: Atom<BaseContent | null>;
  
  // Derived atoms
  formStateAtom: Atom<ContentFormState>;
  isValidAtom: Atom<boolean>;
  isDirtyAtom: Atom<boolean>;
}

/**
 * Content form actions interface
 */
export interface ContentFormActions {
  setTitle: (title: string) => void;
  setType: (type: ContentType) => void;
  setStatus: (status: ContentStatus) => void;
  setSlug: (slug: string) => void;
  setContent: (content: JsonObject) => void;
  setMetadata: (metadata: JsonObject) => void;
  resetForm: () => void;
  loadContent: (content: BaseContent) => void;
  validateForm: () => boolean;
}

/**
 * Content form hook return type
 */
export interface UseContentForm {
  // Form state
  formState: ContentFormState;
  validation: ContentFormValidation;
  isValid: boolean;
  isDirty: boolean;
  currentContent: BaseContent | null;
  
  // Form actions
  actions: ContentFormActions;
} 