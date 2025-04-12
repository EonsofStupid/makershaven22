
import { ChatMode, ChatBridgeChannel } from "../../shared/types/enums";

export interface ChatMessage {
  id: string;
  timestamp: string;
  content: string;
  metadata?: Record<string, any>;
  sender: "user" | "assistant" | "system";
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  title: string;
  mode: ChatMode;
}

export interface ChatBridgeMessage {
  id: string;
  channel: ChatBridgeChannel;
  sessionId: string;
  message: string;
  timestamp: string;
}

export interface ChatBridge {
  subscribe: (channel: ChatBridgeChannel, callback: (message: ChatBridgeMessage) => void) => () => void;
  publish: (channel: ChatBridgeChannel, message: string, sessionId: string) => void;
  isConnected: () => boolean;
}

export interface SimpleChatBridge {
  subscribe: (channel: ChatBridgeChannel, callback: (message: ChatBridgeMessage) => void) => () => void;
  publish: (channel: ChatBridgeChannel, message: string, sessionId: string) => void;
  isConnected: () => boolean;
}
