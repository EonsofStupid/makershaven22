
import { ChatMode } from "../../shared/types/enums";
import { ChatMessage, ChatSession } from "./chat";

export interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  activeMode: ChatMode;
  isLoading: boolean;
  error: Error | null;
}

export interface ChatActions {
  setActiveMode: (mode: ChatMode) => void;
  createSession: (mode: ChatMode, initialMessage?: string) => Promise<string>;
  selectSession: (sessionId: string) => void;
  sendMessage: (content: string, metadata?: Record<string, any>) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  clearSessions: () => void;
}

export type ChatStore = ChatState & ChatActions;
