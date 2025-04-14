
import { ChatMode, LogCategory, LogLevel } from '../../../shared/types/enums';

export type { ChatMode, LogCategory, LogLevel };

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  mode: ChatMode;
  messages: ChatMessage[];
}

// Re-export enums as values
export const ChatCategories = {
  CHAT: 'chat' as LogCategory,
  SYSTEM: 'system' as LogCategory,
  AUTH: 'auth' as LogCategory,
  UI: 'ui' as LogCategory
};
