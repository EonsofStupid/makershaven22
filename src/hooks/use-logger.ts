
import { useCallback } from "react";
import { LogCategory } from "../logging/types";

interface LogOptions {
  category?: LogCategory;
  details?: Record<string, any>;
  error?: boolean;
}

export function useLogger(source: string, defaultCategory = LogCategory.APP) {
  const log = useCallback(
    (message: string, options: LogOptions = {}) => {
      const { category = defaultCategory, details = {}, error = false } = options;
      
      if (error) {
        console.error(`[${category}][${source}] ${message}`, details);
      } else {
        console.log(`[${category}][${source}] ${message}`, details);
      }
      
      // Here we could also send logs to a central service if needed
    },
    [source, defaultCategory]
  );

  return {
    debug: (message: string, options: Omit<LogOptions, "error"> = {}) => 
      log(message, { ...options, error: false }),
    info: (message: string, options: Omit<LogOptions, "error"> = {}) => 
      log(message, { ...options, error: false }),
    warn: (message: string, options: Omit<LogOptions, "error"> = {}) => 
      log(`⚠️ ${message}`, { ...options, error: false }),
    error: (message: string, options: Omit<LogOptions, "error"> = {}) => 
      log(`🔴 ${message}`, { ...options, error: true }),
  };
}
