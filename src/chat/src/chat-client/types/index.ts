
import { ChatBridgeMessage } from "../../../types/chat";

// Chat client specific types
export type ChatMode = 
  | 'chat'     // Regular chat mode
  | 'ultra'    // Premium model
  | 'developer' // Code assistance 
  | 'debug'    // Debug assistance
  | 'image'    // Image generation
  | 'planning'  // Project planning
  | 'training'  // Learning mode
  | 'normal'   // Default mode
  | 'admin'    // Admin mode
  | 'dev'      // Developer mode
  | 'thread'   // Thread mode
  | 'agent'    // Agent mode
  | 'learn';   // Learning mode

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
  favorite?: boolean;
  pinned?: boolean;
}

export interface ChatStore {
  messages: ChatMessage[];
  sessions: any[];
  conversations: ChatConversation[];
  isLoading: boolean;
  activeConversationId: string | null;
  currentSessionId: string | null;
  activeMode: ChatMode;
  error: string | null;
  
  // Actions
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
  setActiveConversation: (id: string | null) => void;
  createNewConversation: (mode: ChatMode) => string;
  setActiveMode: (mode: ChatMode) => void;
  setMode?: (mode: ChatMode) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  pinConversation: (id: string, pinned: boolean) => void;
  favoriteConversation: (id: string, favorite: boolean) => void;
}

export interface ChatBridge {
  send: (message: ChatBridgeMessage) => void;
  subscribe: (channel: string, callback: (message: any) => void) => () => void;
}

export interface PrinterContext {
  printerConnected: boolean;
  printerStatus: string;
  jobInProgress: boolean;
}

export interface ProjectContext {
  projectId: string;
  projectName: string;
  components: string[];
}

// Log types
export type LogLevelType = 'info' | 'warn' | 'error' | 'debug';
export type LogCategoryType = 'chat' | 'ui' | 'network' | 'auth' | 'system';

export const LogLevel = {
  INFO: 'info' as LogLevelType,
  WARN: 'warn' as LogLevelType,
  ERROR: 'error' as LogLevelType,
  DEBUG: 'debug' as LogLevelType
};

export const LogCategory = {
  CHAT: 'chat' as LogCategoryType,
  UI: 'ui' as LogCategoryType,
  NETWORK: 'network' as LogCategoryType,
  AUTH: 'auth' as LogCategoryType,
  SYSTEM: 'system' as LogCategoryType
};
