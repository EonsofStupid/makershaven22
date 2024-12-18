import type { AuthSession, AuthUser } from '@/integrations/supabase/types/auth';
import type { Profile } from '@/integrations/supabase/types/tables';

export type Status = 'idle' | 'loading' | 'error' | 'success';

export interface ValidationError {
  field: string;
  message: string;
}

export interface StoreError {
  code: string;
  message: string;
  details?: unknown;
}

export interface SyncState {
  lastSynced: Date | null;
  isSyncing: boolean;
  syncError: StoreError | null;
  pendingChanges: number;
}

export interface AuditInfo {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface Result<T> {
  data?: T;
  error?: StoreError;
  validation?: ValidationError[];
}

export interface AuthState {
  // Core Auth
  user: AuthUser | null;
  session: AuthSession | null;
  profile: (Profile & AuditInfo) | null;
  
  // Status
  status: Status;
  error: StoreError | null;
  validationErrors: ValidationError[];
  
  // Security
  securityState: {
    mfaEnabled: boolean;
    pinEnabled: boolean;
    lastLogin: Date | null;
    failedAttempts: number;
    lockoutUntil: Date | null;
  };
  
  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<Result<AuthSession>>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<Result<Profile>>;
  clearErrors: () => void;
}