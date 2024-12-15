export interface PinLoginFormProps {
  onSubmit: (pin: string) => void;
  isLoading?: boolean;
  error?: string;
}

export interface PinSetupFormProps {
  onSubmit: (pin: string) => void;
  isLoading?: boolean;
  error?: string;
}