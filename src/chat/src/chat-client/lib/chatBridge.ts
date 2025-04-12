
import { logger } from "../utils/logging";
import type { ChatBridge, ChatMessage } from "../types";

const log = logger("ChatBridge");

/**
 * In-memory implementation of the ChatBridge for local testing
 */
class LocalChatBridge implements ChatBridge {
  private listeners: Map<string, Set<(message: any) => void>> = new Map();
  private connected: boolean = false;
  
  constructor() {
    log.info("Initializing local chat bridge");
  }
  
  /**
   * Send a message through the bridge
   */
  send(message: any): void {
    log.debug("Sending message", { metadata: { message } });
    
    // For local testing, we'll simulate a response
    setTimeout(() => {
      const response: ChatMessage = {
        id: `resp-${Date.now()}`,
        content: `Response to: ${typeof message === 'string' ? message : JSON.stringify(message)}`,
        sender: 'assistant',
        timestamp: new Date().toISOString()
      };
      
      this.notifyListeners('message', {
        type: 'message_received',
        data: response
      });
    }, 1000);
  }
  
  /**
   * Subscribe to a channel
   */
  subscribe(channel: string, callback: (message: any) => void): () => void {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, new Set());
    }
    
    const channelListeners = this.listeners.get(channel)!;
    channelListeners.add(callback);
    
    log.debug(`Subscribed to channel: ${channel}`, { 
      metadata: { listenerCount: channelListeners.size } 
    });
    
    // Return unsubscribe function
    return () => {
      if (this.listeners.has(channel)) {
        const listeners = this.listeners.get(channel)!;
        listeners.delete(callback);
        log.debug(`Unsubscribed from channel: ${channel}`, { 
          metadata: { listenerCount: listeners.size } 
        });
      }
    };
  }
  
  /**
   * Notify all listeners on a channel
   */
  private notifyListeners(channel: string, message: any): void {
    if (!this.listeners.has(channel)) return;
    
    const listeners = this.listeners.get(channel)!;
    log.debug(`Notifying ${listeners.size} listeners on channel: ${channel}`);
    
    listeners.forEach(callback => {
      try {
        callback(message);
      } catch (error) {
        log.error(`Error in listener callback for channel ${channel}`, error as Error);
      }
    });
  }
}

// Export a singleton instance
export const chatBridge = new LocalChatBridge();

// Hook for components to interact with the chat bridge
export function useChatBridge(): ChatBridge {
  return chatBridge;
}
