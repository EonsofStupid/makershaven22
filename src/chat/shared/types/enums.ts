
// Re-export the enums from the shared module for use within the chat module
export type { 
  UserRole,
  ContentType,
  LogCategory,
  LogLevel,
  ChatMode,
} from '../../../shared/types/enums';

// Re-export for modules that need to use them as constants
export { 
  LogCategories, 
  LogLevels 
} from '../../../shared/types/enums';
