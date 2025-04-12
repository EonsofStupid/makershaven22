
/**
 * ChatBridge - Provides a communication layer for chat-related events
 * Implementation using in-memory event bus for now
 */
import { ChatBridge, ChatBridgeChannel, ChatBridgeMessage } from '../types/chat';

type CallbackFn = (message: ChatBridgeMessage) => void;

class InMemoryChatBridge implements ChatBridge {
  private isActive: boolean = false;
  private listeners: Map<string, CallbackFn[]> = new Map();
  
  public async connect(): Promise<void> {
    console.log('ChatBridge: Connecting...');
    this.isActive = true;
    return Promise.resolve();
  }
  
  public disconnect(): void {
    console.log('ChatBridge: Disconnecting...');
    this.isActive = false;
    this.listeners.clear();
  }
  
  public isConnected(): boolean {
    return this.isActive;
  }
  
  public send(message: ChatBridgeMessage): void {
    console.log('ChatBridge: Sending message', message);
    // Simply reroute to publish for in-memory implementation
    this.publish('message', message);
  }
  
  public publish(channel: ChatBridgeChannel, message: any): void {
    if (!this.isActive) {
      console.warn('ChatBridge: Cannot publish, bridge is not connected');
      return;
    }
    
    const callbacks = this.listeners.get(channel);
    if (callbacks && callbacks.length > 0) {
      // Wrap in a timeout to simulate async behavior
      setTimeout(() => {
        const bridgeMessage: ChatBridgeMessage = {
          type: typeof message === 'object' && message.type ? message.type : 'message',
          data: message,
          timestamp: Date.now()
        };
        
        callbacks.forEach(callback => {
          try {
            callback(bridgeMessage);
          } catch (error) {
            console.error('ChatBridge: Error in callback', error);
          }
        });
      }, 0);
    }
  }
  
  public subscribe(channel: ChatBridgeChannel, callback: CallbackFn): () => void {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, []);
    }
    
    const callbacks = this.listeners.get(channel)!;
    callbacks.push(callback);
    
    return () => {
      const idx = callbacks.indexOf(callback);
      if (idx >= 0) {
        callbacks.splice(idx, 1);
      }
    };
  }
  
  public unsubscribe(channel: ChatBridgeChannel): void {
    this.listeners.delete(channel);
  }
  
  public async reconnect(): Promise<void> {
    if (this.isActive) {
      this.disconnect();
    }
    return this.connect();
  }
}

// Export a singleton instance
export const chatBridge = new InMemoryChatBridge();
