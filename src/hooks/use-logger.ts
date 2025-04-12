
import { useCallback } from 'react';
import { LogCategory } from '../shared/types/enums';
import { createLogger, Logger } from '../logging/logger';

export function useLogger(name: string, defaultCategory?: LogCategory): Logger {
  const logger = useCallback(() => {
    return createLogger(name, defaultCategory);
  }, [name, defaultCategory]);

  return logger();
}
