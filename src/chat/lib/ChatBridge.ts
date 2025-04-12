
import { ChatBridge, ChatBridgeChannel, ChatBridgeMessage } from '../types';

export class SimpleChatBridge implements ChatBridge {
  private connected: boolean = false;
  private subscribers: Map<ChatBridgeChannel, ((message: ChatBridgeMessage) => void)[]> = new Map();
  
  constructor() {
    // Initialize subscribers map for each channel
    this.subscribers.set('message', []);
    this.subscribers.set('status', []);
    this.subscribers.set('error', []);
    this.subscribers.set('typing', []);
  }
  
  async connect(): Promise<void> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 500));
    this.connected = true;
    
    // Notify subscribers about successful connection
    this.notifySubscribers('status', {
      type: 'connection',
      connected: true,
      timestamp: new Date().toISOString()
    });
  }
  
  disconnect(): void {
    this.connected = false;
    
    // Notify subscribers about disconnection
    this.notifySubscribers('status', {
      type: 'connection',
      connected: false,
      timestamp: new Date().toISOString()
    });
  }
  
  isConnected(): boolean {
    return this.connected;
  }
  
  async send(message: ChatBridgeMessage): Promise<void> {
    if (!this.connected) {
      const error = new Error('Cannot send message: ChatBridge is not connected');
      this.notifySubscribers('error', {
        type: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
    
    // Process the message and send it to the appropriate channel
    try {
      // In a real implementation, this would send to a server
      console.log('Sending message:', message);
      
      // Echo back the message to simulate a response (in a real app, the server would respond)
      setTimeout(() => {
        this.notifySubscribers('message', {
          type: 'message',
          ...message.payload,
          timestamp: new Date().toISOString()
        });
      }, 1000);
    } catch (error) {
      this.notifySubscribers('error', {
        type: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
  
  subscribe(channel: ChatBridgeChannel, callback: (message: ChatBridgeMessage) => void): void {
    const channelSubscribers = this.subscribers.get(channel) || [];
    channelSubscribers.push(callback);
    this.subscribers.set(channel, channelSubscribers);
  }
  
  unsubscribe(channel: ChatBridgeChannel): void {
    this.subscribers.set(channel, []);
  }
  
  private notifySubscribers(channel: ChatBridgeChannel, payload: Record<string, any>): void {
    const message: ChatBridgeMessage = {
      type: payload.type || channel,
      payload
    };
    
    const channelSubscribers = this.subscribers.get(channel) || [];
    channelSubscribers.forEach(callback => callback(message));
  }
}

// Export a singleton instance
export const chatBridge = new SimpleChatBridge();
