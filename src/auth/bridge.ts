
import { EventEmitter } from 'events';

type AuthEventType = 'login' | 'logout' | 'session-change' | 'user-update';

interface AuthEvent {
  type: AuthEventType;
  payload: any;
}

class AuthBridge extends EventEmitter {
  constructor() {
    super();
  }

  emitAuthEvent(event: AuthEvent) {
    this.emit(event.type, event.payload);
  }

  subscribeToAuthEvents(eventType: AuthEventType | AuthEventType[], callback: (payload: any) => void) {
    const events = Array.isArray(eventType) ? eventType : [eventType];
    
    events.forEach(event => {
      this.on(event, callback);
    });
    
    // Return unsubscribe function
    return () => {
      events.forEach(event => {
        this.off(event, callback);
      });
    };
  }
}

export const authBridge = new AuthBridge();

export const subscribeToAuthEvents = (
  eventType: AuthEventType | AuthEventType[],
  callback: (payload: any) => void
) => {
  return authBridge.subscribeToAuthEvents(eventType, callback);
};
