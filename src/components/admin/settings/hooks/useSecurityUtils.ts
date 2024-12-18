import { logSecurityEvent } from '@/services/security-service';

/**
 * Logs a security event for monitoring and audit purposes.
 */
export const useSecurityUtils = () => {
  const logEvent = async (event, details) => {
    try {
      await logSecurityEvent(event, details);
    } catch (error) {
      console.error('Security log failed:', error);
    }
  };

  return { logEvent };
};