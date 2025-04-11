
/**
 * Application-wide constants
 */

export const API_BASE_URL = '/api';

export const AUTH_EVENTS = {
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout',
  SESSION_EXPIRED: 'auth:session-expired',
  SESSION_REFRESHED: 'auth:session-refreshed',
  PROFILE_UPDATED: 'auth:profile-updated'
};

export const CHAT_EVENTS = {
  MESSAGE_SENT: 'chat:message-sent',
  MESSAGE_RECEIVED: 'chat:message-received',
  TYPING_STARTED: 'chat:typing-started',
  TYPING_STOPPED: 'chat:typing-stopped',
  CONVERSATION_CREATED: 'chat:conversation-created',
  CONVERSATION_DELETED: 'chat:conversation-deleted'
};

export const UI_BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  THEME_PREFERENCE: 'theme-preference',
  CHAT_HISTORY: 'chat-history',
  USER_SETTINGS: 'user-settings'
};
