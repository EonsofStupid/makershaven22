export interface PinLoginProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export interface PinSetupProps {
  onComplete: () => void;
}

export interface PinVerificationResponse {
  success: boolean;
  error?: string;
  lockout_until?: string;
}

export interface PinSetupResponse {
  success: boolean;
  error?: string;
}