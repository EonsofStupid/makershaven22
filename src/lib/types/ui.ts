export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: any;
}

export interface ViewPreferences {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

export interface BuilderElement {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: BuilderElement[];
}