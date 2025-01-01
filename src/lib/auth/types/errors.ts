export enum AuthErrorType {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN'
}

export interface AuthError {
  type: AuthErrorType;
  message: string;
  originalError?: unknown;
}

export interface SecurityEventSeverity {
  LOW: 'low';
  MEDIUM: 'medium';
  HIGH: 'high';
  CRITICAL: 'critical';
}

export interface SecurityEventCategory {
  AUTH: 'auth';
  ACCESS: 'access';
  DATA: 'data';
  SYSTEM: 'system';
}