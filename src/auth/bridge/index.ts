
import { AUTH_EVENTS } from "../../shared/constants/app-constants";

// Type for auth event callbacks
type AuthEventCallback = (event: {type: string, payload?: any}) => void;

// Store subscriptions
const subscribers: AuthEventCallback[] = [];

/**
 * Subscribe to auth events
 * @param callback Function to call when auth events occur
 * @returns Unsubscribe function
 */
export function subscribeToAuthEvents(callback: AuthEventCallback): () => void {
  subscribers.push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  };
}

/**
 * Publish an auth event to all subscribers
 * @param eventType Type of auth event
 * @param payload Optional data payload
 */
export function publishAuthEvent(eventType: string, payload?: any): void {
  const event = { type: eventType, payload };
  
  // Notify all subscribers
  subscribers.forEach(callback => {
    try {
      callback(event);
    } catch (error) {
      console.error('Error in auth event subscriber:', error);
    }
  });
}

/**
 * Auth bridge API - bridges between auth domain and other parts of the app
 */
export const authBridge = {
  subscribe: subscribeToAuthEvents,
  publish: publishAuthEvent,
  events: AUTH_EVENTS
};
