
import { ChatBridgeChannel } from '../types/chat';

export interface ChatBridgeMessage {
  type: string;
  data: any;
}

export interface SimpleChatBridge {
  subscribe: (channel: ChatBridgeChannel, callback: (message: any) => void) => () => void;
  publish: (channel: ChatBridgeChannel, message: any) => void;
  isConnected: () => boolean;
}

// Simple in-memory implementation of the ChatBridge
class InMemoryChatBridge implements SimpleChatBridge {
  private subscribers: Record<string, Array<(message: any) => void>> = {};
  private connected: boolean = true;

  constructor() {
    // Initialize subscriber channels
    const channels: ChatBridgeChannel[] = ['user', 'assistant', 'system', 'message'];
    channels.forEach(channel => {
      this.subscribers[channel] = [];
    });
  }

  subscribe(channel: ChatBridgeChannel, callback: (message: any) => void): () => void {
    if (!this.subscribers[channel]) {
      this.subscribers[channel] = [];
    }
    
    this.subscribers[channel].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers[channel] = this.subscribers[channel].filter(cb => cb !== callback);
    };
  }

  publish(channel: ChatBridgeChannel, message: any): void {
    if (!this.connected) {
      console.warn('Chat bridge is disconnected, message not sent');
      return;
    }
    
    if (!this.subscribers[channel]) {
      console.warn(`No subscribers for channel ${channel}`);
      return;
    }
    
    // Send to all subscribers on this channel
    this.subscribers[channel].forEach(callback => {
      try {
        callback(message);
      } catch (error) {
        console.error('Error in subscriber callback:', error);
      }
    });
  }

  isConnected(): boolean {
    return this.connected;
  }

  // For testing purposes
  disconnect(): void {
    this.connected = false;
  }

  reconnect(): void {
    this.connected = true;
  }
}

// Create a singleton instance
export const chatBridge = new InMemoryChatBridge();
