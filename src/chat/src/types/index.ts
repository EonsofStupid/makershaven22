
export type ChatMode =
  | 'admin'
  | 'dev'
  | 'thread'
  | 'agent'
  | 'ultra'
  | 'developer'
  | 'image'
  | 'debug'
  | 'planning'
  | 'training'
  | 'learn'
  | 'chat'
  | 'normal';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
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
  isFavorite?: boolean;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  mode: ChatMode;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  activeMode: ChatMode;
  conversations: ChatConversation[];
  activeConversationId: string | null;
  sessions: ChatSession[];
  currentSessionId: string | null;
  error: Error | null;
  
  setMode: (mode: ChatMode) => void;
  setIsLoading: (isLoading: boolean) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  createConversation: (mode?: ChatMode) => string;
  setActiveConversation: (id: string) => void;
  updateConversation: (id: string, updates: Partial<ChatConversation>) => void;
  deleteConversation: (id: string) => void;
  pinConversation: (id: string, pinned: boolean) => void;
  favoriteConversation: (id: string, favorite: boolean) => void;
}

export type LogLevelType = 'debug' | 'info' | 'warn' | 'error';
export type LogCategoryType = 'system' | 'chat' | 'auth' | 'network' | 'ui' | 'data';

export const LogLevel = {
  DEBUG: 'debug' as LogLevelType,
  INFO: 'info' as LogLevelType,
  WARN: 'warn' as LogLevelType,
  ERROR: 'error' as LogLevelType
};

export const LogCategory = {
  SYSTEM: 'system' as LogCategoryType,
  CHAT: 'chat' as LogCategoryType,
  AUTH: 'auth' as LogCategoryType,
  NETWORK: 'network' as LogCategoryType,
  UI: 'ui' as LogCategoryType,
  DATA: 'data' as LogCategoryType
};

export interface PrinterContext {
  name: string;
  settings: Record<string, any>;
}

export interface ProjectContext {
  id: string;
  title: string;
}

export interface ChatBridge {
  userId: string;
  printerContext: PrinterContext;
  projectContext: ProjectContext;
}
