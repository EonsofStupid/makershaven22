import { logSecurityEvent } from '@/services/security-service';

type SecurityEventSeverity = 'low' | 'medium' | 'high' | 'critical' | 'info' | 'warn' | 'error';

interface SecurityEventDetails {
  event: string;
  severity: SecurityEventSeverity;
  details?: Record<string, any>;
}

/**
 * Logs a security event for monitoring and audit purposes.
 */
export const useSecurityUtils = () => {
  const logEvent = async ({ event, severity, details }: SecurityEventDetails) => {
    try {
      await logSecurityEvent(event, {
        severity,
        ...details
      });
    } catch (error) {
      console.error('Security log failed:', error);
    }
  };

  return { logEvent };
};