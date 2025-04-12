
import { ChatMode } from '../../shared/types/enums';

export type ChatBridgeChannel = 
  | 'system'
  | 'user'
  | 'assistant'
  | 'message'
  | 'error';

export interface ChatBridgeMessage {
  type: string;
  data: any;
  sessionId?: string;
  timestamp?: number;
}

export interface ChatBridge {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: () => boolean;
  send: (message: ChatBridgeMessage) => void;
  publish: (channel: ChatBridgeChannel, message: any) => void;
  subscribe: (channel: ChatBridgeChannel, callback: (message: ChatBridgeMessage) => void) => () => void;
  unsubscribe: (channel: ChatBridgeChannel) => void;
  reconnect?: () => Promise<void>;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  mode: ChatMode;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  isActive: boolean;
}
