
import { ReactNode } from 'react';

// Define the ChatMode type
export type ChatMode = 'admin' | 'dev' | 'thread' | 'agent' | 'ultra' | 'developer' | 'image' | 'debug' | 'planning' | 'training';

// Define the ChatMessage type
export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'assistant' | 'system';
  metadata?: Record<string, any>;
}

// Define the ChatConversation type
export interface ChatConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  mode: ChatMode;
  isFavorite?: boolean;
}

// Define the ChatSession type
export interface ChatSession {
  id: string;
  startedAt: string;
  endedAt?: string;
  conversationIds: string[];
}

// Define the ChatState interface
export interface ChatState {
  messages: ChatMessage[];
  conversations: ChatConversation[];
  sessions: ChatSession[];
  currentSessionId: string | null;
  activeConversationId: string | null;
  activeMode: ChatMode;
  isLoading: boolean;
  error: string | null;
}

// Define the ChatStore interface
export interface ChatStore extends ChatState {
  setMode: (mode: ChatMode) => void;
  setIsLoading: (isLoading: boolean) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  createConversation: (title?: string, mode?: ChatMode) => string;
  setActiveConversation: (id: string) => void;
  clearMessages: () => void;
  deleteConversation: (id: string) => void;
  updateConversation: (id: string, data: Partial<ChatConversation>) => void;
  favoriteConversation: (id: string, favorite: boolean) => void;
}

// Define the ChatBridge interface
export interface ChatBridge {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: () => boolean;
  send: (message: ChatBridgeMessage) => Promise<void>;
  subscribe: (channel: ChatBridgeChannel, callback: (message: ChatBridgeMessage) => void) => void;
  unsubscribe: (channel: ChatBridgeChannel) => void;
}

// Define the ChatBridgeChannel type
export type ChatBridgeChannel = 'message' | 'status' | 'error' | 'typing';

// Define the ChatBridgeMessage interface
export interface ChatBridgeMessage {
  type: string;
  payload: Record<string, any>;
}

// Define logging types
export type LogLevelType = 'debug' | 'info' | 'warn' | 'error';
export type LogCategoryType = 'chat' | 'auth' | 'api' | 'ui' | 'performance';

export const LogLevel = {
  DEBUG: 'debug' as LogLevelType,
  INFO: 'info' as LogLevelType,
  WARN: 'warn' as LogLevelType,
  ERROR: 'error' as LogLevelType
};

export const LogCategory = {
  CHAT: 'chat' as LogCategoryType,
  AUTH: 'auth' as LogCategoryType,
  API: 'api' as LogCategoryType,
  UI: 'ui' as LogCategoryType,
  PERFORMANCE: 'performance' as LogCategoryType
};
