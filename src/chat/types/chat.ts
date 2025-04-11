
/**
 * All available chat modes in the system
 * This merges all previous mode definitions to ensure compatibility
 */
export type ChatMode = 
  | 'chat'       // Standard chat
  | 'thread'     // Threaded conversation
  | 'agent'      // Agent-based conversation
  | 'dev'        // Developer mode
  | 'debug'      // Debug mode
  | 'admin'      // Admin access mode
  | 'normal'     // Normal mode (legacy)
  | 'ultra'      // Premium GPT-4 chat
  | 'developer'  // Coding assistance (alias for dev)
  | 'image'      // Image generation
  | 'planning'   // Project planning
  | 'training'   // Training mode
  | 'learn';     // Learning resources

/**
 * Structure of a single chat message
 */
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: number | Date;
  sessionId?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
}

/**
 * Structure of a conversation within the chat system
 */
export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  mode: ChatMode;
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
  favorite?: boolean;
}

/**
 * Chat session interface
 */
export interface ChatSession {
  id: string;
  title?: string;
  createdAt: number;
  updatedAt: number;
  mode: ChatMode;
  userId?: string;
  active: boolean;
}

/**
 * Printer context data structure
 */
export interface PrinterContext {
  name: string;
  settings: Record<string, unknown>;
}

/**
 * Project context data structure
 */
export interface ProjectContext {
  id: string;
  title: string;
}

/**
 * Bridge between chat and external systems
 */
export interface ChatBridge {
  userId: string;
  printerContext: PrinterContext;
  projectContext: ProjectContext;
}
