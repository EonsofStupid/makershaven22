
import { ChatMode } from '../../../shared/types/enums';

export type LogLevelType = 'info' | 'warn' | 'error' | 'debug';
export type LogCategoryType = 'chat' | 'system' | 'auth' | 'ui';

export const LogLevel = {
  INFO: 'info' as LogLevelType,
  WARN: 'warn' as LogLevelType,
  ERROR: 'error' as LogLevelType,
  DEBUG: 'debug' as LogLevelType
};

export const LogCategory = {
  CHAT: 'chat' as LogCategoryType,
  SYSTEM: 'system' as LogCategoryType,
  AUTH: 'auth' as LogCategoryType,
  UI: 'ui' as LogCategoryType
};

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  mode: ChatMode;
  createdAt: string;
  updatedAt: string;
  pinned?: boolean;
  favorite?: boolean;
  isFavorite?: boolean;
}

export interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  activeMode: ChatMode;
  sessions: ChatSession[];
  conversations: ChatConversation[];
  activeConversationId: string | null;
  currentSessionId: string | null;
  
  // Optional properties for compatibility
  mode?: ChatMode;
  
  // Methods
  setMode?: (mode: ChatMode) => void;
  setActiveMode?: (mode: ChatMode) => void;
  setIsLoading: (isLoading: boolean) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setActiveConversation: (id: string) => void;
  createConversation?: (mode?: ChatMode) => string;
  createNewConversation?: (mode: ChatMode) => string;
  updateConversation?: (id: string, updates: Partial<ChatConversation>) => void;
  deleteConversation?: (id: string) => void;
  pinConversation: (id: string, pinned: boolean) => void;
  favoriteConversation: (id: string, favorite: boolean) => void;
  setError?: (error: string | null) => void;
  setMessages?: (messages: ChatMessage[]) => void;
}

export interface ChatSession {
  id: string;
  mode: ChatMode;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  isActive: boolean;
}

export interface ChatBridge {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: () => boolean;
  send: (message: any) => void;
  subscribe: (channel: string, callback: (message: any) => void) => () => void;
  publish?: (channel: string, message: any) => void;
  unsubscribe?: (channel: string) => void;
  reconnect?: () => Promise<void>;
}

export interface PrinterContext {
  printerConnected: boolean;
  printerName?: string;
  printerStatus?: string;
}

export interface ProjectContext {
  projectId?: string;
  projectName?: string;
  projectType?: string;
}
