
import { CHAT_EVENTS } from "../../shared/constants/app-constants";

// Type for chat event callbacks
type ChatEventCallback = (event: {type: string, [key: string]: any}) => void;

// Store subscriptions by channel
const channelSubscribers: Record<string, ChatEventCallback[]> = {
  'message': [],
  'system': [],
  'ui': []
};

/**
 * Subscribe to chat events on a specific channel
 * @param channel Channel to subscribe to
 * @param callback Function to call when events occur on this channel
 * @returns Unsubscribe function
 */
export function subscribeToChatEvents(
  channel: string, 
  callback: ChatEventCallback
): () => void {
  // Create the channel if it doesn't exist
  if (!channelSubscribers[channel]) {
    channelSubscribers[channel] = [];
  }
  
  channelSubscribers[channel].push(callback);
  
  // Return unsubscribe function
  return () => {
    const subs = channelSubscribers[channel];
    if (subs) {
      const index = subs.indexOf(callback);
      if (index !== -1) {
        subs.splice(index, 1);
      }
    }
  };
}

/**
 * Publish an event to a specific channel
 * @param channel Channel to publish to
 * @param event Event object to publish
 */
export function publishChatEvent(channel: string, event: Record<string, any>): void {
  const subs = channelSubscribers[channel];
  if (!subs) return;
  
  // Notify all subscribers on this channel
  subs.forEach(callback => {
    try {
      callback(event);
    } catch (error) {
      console.error(`Error in chat event subscriber on channel ${channel}:`, error);
    }
  });
}

/**
 * Chat bridge API - bridges between chat domain and other parts of the app
 */
export const chatBridge = {
  subscribe: subscribeToChatEvents,
  publish: publishChatEvent,
  events: CHAT_EVENTS
};
