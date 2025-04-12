
import { ChatMode } from "../../shared/types/enums";
import { ChatMessage, ChatSession } from "./chat";

export interface ChatConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  mode: ChatMode;
  pinned?: boolean;
  favorite?: boolean;
  isFavorite?: boolean; // Alternative property name
}

export interface ChatStore {
  messages: ChatMessage[];
  sessions: ChatSession[];
  conversations: ChatConversation[];
  isLoading: boolean;
  activeConversationId: string | null;
  currentSessionId: string | null;
  activeMode: ChatMode;
  error: string | null;
  
  // Added for chat client compatibility
  mode?: string;
  
  // Actions
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
  setActiveConversation: (id: string | null) => void;
  createNewConversation: (mode: ChatMode) => string;
  setActiveMode: (mode: ChatMode) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  pinConversation: (id: string, pinned: boolean) => void;
  favoriteConversation: (id: string, favorite: boolean) => void;
  
  // Added for chat client compatibility
  setMode?: (mode: ChatMode) => void;
}
