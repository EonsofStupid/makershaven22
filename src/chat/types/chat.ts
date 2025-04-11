
import { ChatMode } from "../../shared/types/enums";

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  mode: ChatMode;
  metadata?: Record<string, any>;
}

export interface ChatBridgeMessage {
  type: string;
  payload: any;
}

export interface ChatBridgeChannel {
  id: string;
  name: string;
}

export interface ChatBridge {
  sendMessage: (channel: string, message: Record<string, any>) => void;
  subscribe: (channel: string, callback: (data: any) => void) => () => void;
  getChannels: () => ChatBridgeChannel[];
}
