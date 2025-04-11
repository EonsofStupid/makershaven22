
import { ChatBridgeChannel, ChatBridgeMessage } from "../chat/types/chat";

type EventCallback = (data: any) => void;

class ChatBridgeImpl {
  private listeners: Map<string, EventCallback[]> = new Map();
  private channels: ChatBridgeChannel[] = [
    { id: 'general', name: 'General' },
    { id: 'support', name: 'Support' },
    { id: 'development', name: 'Development' }
  ];

  /**
   * Send a message to a specific channel
   */
  sendMessage(channel: string, message: Record<string, any>): void {
    if (!this.listeners.has(channel)) {
      console.warn(`No listeners for channel: ${channel}`);
      return;
    }

    // Ensure message has a type property
    const typedMessage = {
      type: message.type || 'message',
      ...message
    };

    const callbacks = this.listeners.get(channel)!;
    // Use setTimeout to avoid blocking the execution context
    setTimeout(() => {
      callbacks.forEach(callback => {
        try {
          callback(typedMessage);
        } catch (error) {
          console.error(`Error in ChatBridge callback for channel ${channel}:`, error);
        }
      });
    }, 0);
  }

  /**
   * Subscribe to messages on a specific channel
   */
  subscribe(channel: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, []);
    }

    const callbacks = this.listeners.get(channel)!;
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
   * Get available channels
   */
  getChannels(): ChatBridgeChannel[] {
    return [...this.channels];
  }
}

// Export a singleton instance
export const chatBridge = new ChatBridgeImpl();
