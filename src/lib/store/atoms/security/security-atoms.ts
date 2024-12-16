import { atom } from 'jotai';

export interface SecurityState {
  isProcessing: boolean;
  lastCheck: Date | null;
  error: string | null;
  securityLevel: 'low' | 'medium' | 'high';
}

export interface SecurityLog {
  id: string;
  eventType: string;
  severity: string;
  timestamp: Date;
  details: Record<string, any>;
}

// Base atoms
export const securityStateAtom = atom<SecurityState>({
  isProcessing: false,
  lastCheck: null,
  error: null,
  securityLevel: 'medium'
});

export const securityLogsAtom = atom<SecurityLog[]>([]);

// Derived atoms
export const hasSecurityErrorAtom = atom(
  (get) => get(securityStateAtom).error !== null
);

export const isSecurityProcessingAtom = atom(
  (get) => get(securityStateAtom).isProcessing
);

// Action atoms
export const setSecurityStateAtom = atom(
  null,
  (get, set, update: Partial<SecurityState>) => {
    set(securityStateAtom, {
      ...get(securityStateAtom),
      ...update
    });
  }
);

export const addSecurityLogAtom = atom(
  null,
  (get, set, log: SecurityLog) => {
    set(securityLogsAtom, [...get(securityLogsAtom), log]);
  }
);

export const clearSecurityStateAtom = atom(
  null,
  (_get, set) => {
    set(securityStateAtom, {
      isProcessing: false,
      lastCheck: null,
      error: null,
      securityLevel: 'medium'
    });
  }
);