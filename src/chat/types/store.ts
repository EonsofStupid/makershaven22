
import { ChatConversation, ChatMessage, ChatMode } from './chat';

/**
 * Core chat state management store interface
 */
export interface ChatStore {
  // State
  mode: ChatMode;
  messages: ChatMessage[];
  isLoading: boolean;
  conversations: ChatConversation[];
  activeConversationId: string | null;
  
  // Actions
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

/**
 * Chat context interface for React context
 */
export interface ChatContextValue {
  isOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  messages: ChatMessage[];
  sendMessage: (content: string) => Promise<void>;
  activeSessionId: string | null;
  isLoading: boolean;
}
