export interface ImportConfig {
  type: string;
  schema: {
    type: string;
    required: string[];
    properties: Record<string, any>;
  };
  validator: (data: any) => boolean;
}

export interface ImportValidationResult {
  isValid: boolean;
  errors?: string[];
}