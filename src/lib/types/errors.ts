export interface ErrorState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface AuthError extends Error {
  code?: string;
  statusCode?: number;
  details?: string;
}

export type AuthErrorCode = 
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/operation-not-allowed'
  | 'auth/invalid-action-code'
  | 'auth/expired-action-code'
  | 'auth/invalid-verification-code'
  | 'auth/invalid-verification-id'
  | 'auth/missing-verification-code'
  | 'auth/missing-verification-id'
  | 'auth/invalid-phone-number'
  | 'auth/missing-phone-number'
  | 'auth/quota-exceeded'
  | 'auth/invalid-continue-uri'
  | 'auth/missing-continue-uri'
  | 'auth/unauthorized-continue-uri'
  | 'auth/invalid-dynamic-link-domain'
  | 'auth/argument-error'
  | 'auth/invalid-persistence-type'
  | 'auth/unsupported-persistence-type'
  | 'auth/invalid-oauth-provider'
  | 'auth/invalid-oauth-client-id'
  | 'auth/invalid-api-key'
  | 'auth/invalid-cert-hash'
  | 'auth/invalid-credential'
  | 'auth/invalid-message-payload'
  | 'auth/invalid-recipient-email'
  | 'auth/invalid-sender'
  | 'auth/invalid-secret'
  | 'auth/missing-ios-bundle-id'
  | 'auth/missing-android-pkg-name'
  | 'auth/unauthorized-domain'
  | 'auth/invalid-user-token'
  | 'auth/network-request-failed'
  | 'auth/operation-not-supported-in-this-environment'
  | 'auth/popup-blocked'
  | 'auth/popup-closed-by-user'
  | 'auth/provider-already-linked'
  | 'auth/redirect-cancelled-by-user'
  | 'auth/redirect-operation-pending'
  | 'auth/rejected-credential'
  | 'auth/timeout'
  | 'auth/user-token-expired'
  | 'auth/too-many-requests'
  | 'auth/unverified-email'
  | 'auth/user-cancelled'
  | 'auth/user-mismatch'
  | 'auth/user-signed-out'
  | 'auth/weak-password'
  | 'auth/web-storage-unsupported'
  | 'auth/already-initialized';