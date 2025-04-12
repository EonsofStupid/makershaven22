
import { useCallback } from 'react';
import { LogCategory } from '../shared/types/enums';
import logger from '../logger';

export const useLogger = (defaultCategory?: LogCategory) => {
  const log = useCallback((message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    logger.info(message, category || defaultCategory, metadata);
  }, [defaultCategory]);

  const logError = useCallback((message: string, error?: Error, category?: LogCategory) => {
    const metadata = error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : undefined;
    
    logger.error(message, category || defaultCategory, metadata);
  }, [defaultCategory]);

  const logWarning = useCallback((message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    logger.warn(message, category || defaultCategory, metadata);
  }, [defaultCategory]);

  const logDebug = useCallback((message: string, category?: LogCategory, metadata?: Record<string, any>) => {
    logger.debug(message, category || defaultCategory, metadata);
  }, [defaultCategory]);

  return {
    log,
    logError,
    logWarning,
    logDebug
  };
};
