
export type ChatBridgeChannel = 
  | 'system'
  | 'user'
  | 'assistant'
  | 'message';

export interface ChatBridgeMessage {
  type: string;
  data: any;
}

export interface ChatBridge {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: () => boolean;
  send: (message: ChatBridgeMessage) => void;
  subscribe: (channel: ChatBridgeChannel, callback: (message: ChatBridgeMessage) => void) => () => void;
  unsubscribe: (channel: ChatBridgeChannel) => void;
}
