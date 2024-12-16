export interface ImportConfig {
  requiredFields: string[];
  optionalFields?: string[];
  validators?: Record<string, (value: any) => boolean>;
}

export interface ImportValidationResult {
  isValid: boolean;
  errors?: string[];
}

export interface ImportWizardProps {
  type: 'page' | 'theme' | 'template' | 'csv';
  acceptedTypes?: string[];
  onImport: (files: File[]) => void;
}