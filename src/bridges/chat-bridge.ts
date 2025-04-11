
/**
 * ChatBridge - Provides a communication layer for chat-related events
 * Prevents circular dependencies by using a pub/sub pattern
 */

export type ChatBridgeCallback = (data: ChatBridgeMessage) => void;

export interface ChatBridgeMessage {
  type: string;
  payload: any;
}

export interface ChatBridgeChannel {
  id: string;
  name: string;
}

export enum ChatEvent {
  MESSAGE_SENT = 'message_sent',
  MESSAGE_RECEIVED = 'message_received',
  SESSION_CREATED = 'session_created',
  SESSION_DELETED = 'session_deleted',
  MODE_CHANGED = 'mode_changed',
  ERROR = 'error',
  CONTEXT_LOADED = 'context_loaded',
}

class ChatBridgeImpl {
  private listeners: Map<string, ChatBridgeCallback[]> = new Map();
  private channels: ChatBridgeChannel[] = [
    { id: 'general', name: 'General' },
    { id: 'system', name: 'System' },
    { id: 'notifications', name: 'Notifications' }
  ];

  /**
   * Subscribe to a chat event on a specific channel
   */
  subscribe(channel: string, callback: ChatBridgeCallback): () => void {
    const channelId = `${channel}`;
    
    if (!this.listeners.has(channelId)) {
      this.listeners.set(channelId, []);
    }

    const callbacks = this.listeners.get(channelId)!;
    callbacks.push(callback);

    // Return unsubscribe function
    return () => {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Publish a message to a specific channel
   */
  sendMessage(channel: string, message: ChatBridgeMessage): void {
    const channelId = `${channel}`;
    
    if (!this.listeners.has(channelId)) {
      return;
    }

    const callbacks = this.listeners.get(channelId)!;
    // Use setTimeout to avoid blocking the execution context
    setTimeout(() => {
      callbacks.forEach(callback => {
        try {
          callback(message);
        } catch (error) {
          console.error(`Error in ChatBridge callback for channel ${channel}:`, error);
        }
      });
    }, 0);
  }

  /**
   * Get available chat channels
   */
  getChannels(): ChatBridgeChannel[] {
    return [...this.channels];
  }

  /**
   * Add a new channel
   */
  addChannel(id: string, name: string): void {
    if (!this.channels.some(channel => channel.id === id)) {
      this.channels.push({ id, name });
    }
  }
}

// Export a singleton instance
export const chatBridge = new ChatBridgeImpl();
