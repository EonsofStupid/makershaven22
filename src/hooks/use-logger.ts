
import { useCallback } from 'react';
import { LogCategory } from '../shared/types/enums';
import { Logger } from '../shared/types/common';

/**
 * Hook for using logger in components
 */
export function useLogger(source: string, category: LogCategory = LogCategory.APP): Logger {
  const debug = useCallback(
    (message: string, options?: any) => {
      console.debug(`[${category}][${source}] ${message}`, options || '');
    },
    [source, category]
  );

  const info = useCallback(
    (message: string, options?: any) => {
      console.info(`[${category}][${source}] ${message}`, options || '');
    },
    [source, category]
  );

  const warn = useCallback(
    (message: string, options?: any) => {
      console.warn(`[${category}][${source}] ${message}`, options || '');
    },
    [source, category]
  );

  const error = useCallback(
    (message: string, options?: any) => {
      console.error(`[${category}][${source}] ${message}`, options || '');
    },
    [source, category]
  );

  return {
    debug,
    info,
    warn,
    error
  };
}
