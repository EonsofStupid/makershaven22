export type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical';
export type SecurityEventCategory = 'auth' | 'session' | 'security' | 'pin' | 'audit';

export interface SecurityEvent {
  id: string;
  userId: string;
  eventType: string;
  severity: SecurityEventSeverity;
  category: SecurityEventCategory;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  resourceType: string;
  resourceId?: string;
  action: string;
  previousState?: any;
  newState?: any;
  errorCode?: string;
  errorMessage?: string;
  stackTrace?: string;
}

export interface AuditLog extends SecurityEvent {
  sessionId?: string;
  requestId: string;
}