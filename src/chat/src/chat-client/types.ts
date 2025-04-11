
export type ChatMode = 'chat' | 'thread' | 'agent' | 'dev' | 'admin';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: number;
  sessionId?: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  mode: ChatMode;
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
  favorite?: boolean;
}

export interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  mode: ChatMode;
  conversations: ChatConversation[];
  activeConversationId: string | null;
  
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
