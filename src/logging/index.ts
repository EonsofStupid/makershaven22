
import { LogCategory, Logger } from "./types";

export { LogCategory } from "./types";

/**
 * Create a logger instance for a specific source
 */
export function getLogger(source: string, defaultCategory = LogCategory.APP): Logger {
  return {
    debug: (message: string, options: any = {}) => {
      const { category = defaultCategory, details = {} } = options;
      console.log(`[DEBUG][${category}][${source}] ${message}`, details);
    },
    info: (message: string, options: any = {}) => {
      const { category = defaultCategory, details = {} } = options;
      console.log(`[INFO][${category}][${source}] ${message}`, details);
    },
    warn: (message: string, options: any = {}) => {
      const { category = defaultCategory, details = {} } = options;
      console.warn(`[WARN][${category}][${source}] ${message}`, details);
    },
    error: (message: string, options: any = {}) => {
      const { category = defaultCategory, details = {}, error } = options;
      console.error(`[ERROR][${category}][${source}] ${message}`, details, error || "");
    },
  };
}
