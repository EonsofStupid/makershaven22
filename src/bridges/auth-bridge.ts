
/**
 * AuthBridge - Provides a communication layer for auth-related events
 * Prevents circular dependencies by using a pub/sub pattern
 */

type EventCallback = (data: any) => void;

export enum AuthEvent {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SESSION_EXPIRED = 'session_expired',
  PROFILE_UPDATED = 'profile_updated',
  PERMISSION_CHANGED = 'permission_changed',
  ROLE_UPDATED = 'role_updated',
}

class AuthBridgeImpl {
  private listeners: Map<AuthEvent, EventCallback[]> = new Map();

  /**
   * Register a callback for an auth event
   */
  subscribe(event: AuthEvent, callback: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const callbacks = this.listeners.get(event)!;
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
   * Subscribe to multiple auth events with one callback
   */
  subscribeToAuthEvents(events: AuthEvent[], callback: EventCallback): () => void {
    const unsubscribers = events.map(event => this.subscribe(event, callback));
    
    // Return combined unsubscribe function
    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }

  /**
   * Publish an auth event with data
   */
  publish(event: AuthEvent, data?: any): void {
    if (!this.listeners.has(event)) {
      return;
    }

    const callbacks = this.listeners.get(event)!;
    // Use setTimeout to avoid blocking the execution context
    setTimeout(() => {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in AuthBridge callback for event ${event}:`, error);
        }
      });
    }, 0);
  }
}

// Export a singleton instance
export const authBridge = new AuthBridgeImpl();
