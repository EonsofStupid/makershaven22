
import { ChatBridgeChannel, ChatBridgeMessage, ChatBridge } from '../types/chat';

// Simple in-memory implementation of the ChatBridge
class InMemoryChatBridge implements ChatBridge {
  private subscribers: Record<string, Array<(message: any) => void>> = {};
  private connected: boolean = true;

  constructor() {
    // Initialize subscriber channels
    const channels: ChatBridgeChannel[] = ['user', 'assistant', 'system', 'message', 'error'];
    channels.forEach(channel => {
      this.subscribers[channel] = [];
    });
  }

  connect(): Promise<void> {
    this.connected = true;
    return Promise.resolve();
  }

  disconnect(): void {
    this.connected = false;
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

  unsubscribe(channel: ChatBridgeChannel): void {
    if (this.subscribers[channel]) {
      this.subscribers[channel] = [];
    }
  }

  send(message: ChatBridgeMessage): void {
    if (!this.connected) {
      console.warn('Chat bridge is disconnected, message not sent');
      return;
    }
    
    // Determine channel based on message type
    let channel: ChatBridgeChannel = 'system';
    if (message.type.includes('user')) {
      channel = 'user';
    } else if (message.type.includes('assistant')) {
      channel = 'assistant';
    } else if (message.type.includes('message')) {
      channel = 'message';
    } else if (message.type.includes('error')) {
      channel = 'error';
    }
    
    this.publish(channel, message);
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
  reconnect(): void {
    this.connected = true;
  }
}

// Create a singleton instance
export const chatBridge = new InMemoryChatBridge();
