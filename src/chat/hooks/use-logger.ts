
import { useCallback } from 'react';
import { LogCategory } from '../../shared/types/enums';
import { createLogger } from '../../logging/logger';
import type { Logger } from '../../shared/types/common';

export const useLogger = (name: string, defaultCategory?: LogCategory): Logger => {
  // Using useCallback to memoize the logger instance
  const logger = useCallback(() => {
    return createLogger(name, defaultCategory);
  }, [name, defaultCategory]);

  return logger();
};

export default useLogger;
