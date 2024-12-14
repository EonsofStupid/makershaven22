export interface AuthError extends Error {
  code: string;
  details?: string;
}

export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'auth/invalid-credentials',
  USER_NOT_FOUND = 'auth/user-not-found',
  EMAIL_IN_USE = 'auth/email-already-in-use',
  WEAK_PASSWORD = 'auth/weak-password',
  INVALID_EMAIL = 'auth/invalid-email',
  REQUIRES_RECENT_LOGIN = 'auth/requires-recent-login',
  TOO_MANY_REQUESTS = 'auth/too-many-requests',
  NETWORK_ERROR = 'auth/network-error',
  INTERNAL_ERROR = 'auth/internal-error'
}

export class AuthenticationError extends Error implements AuthError {
  code: string;
  details?: string;

  constructor(code: AuthErrorCode, message: string, details?: string) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'AuthenticationError';
  }
}