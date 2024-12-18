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