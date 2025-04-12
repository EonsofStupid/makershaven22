
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ChatMode } from '../../../../shared/types/enums';
import { ChatStore, ChatMessage, ChatConversation } from '../types';

/**
 * Zustand store for chat state management
 */
export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  sessions: [],
  conversations: [],
  isLoading: false,
  activeConversationId: null,
  currentSessionId: null,
  activeMode: 'chat' as ChatMode,
  error: null,
  
  setMode: (mode: ChatMode) => {
    set({ activeMode: mode, mode });
    
    // Update the mode of the active conversation if there is one
    const { activeConversationId, conversations } = get();
    if (activeConversationId) {
      const updatedConversations = conversations.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, mode, updatedAt: new Date().toISOString() } 
          : conv
      );
      set({ conversations: updatedConversations });
    }
  },
  
  setActiveMode: (mode: ChatMode) => {
    set({ activeMode: mode, mode });
  },
  
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  
  setError: (error: string | null) => set({ error }),
  
  setMessages: (messages: ChatMessage[]) => set({ messages }),
  
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = { 
      ...message, 
      id: uuidv4(), 
      timestamp: new Date().toISOString()
    };
    
    set((state) => {
      // Update local messages array for immediate display
      const updatedMessages = [...state.messages, newMessage];
      
      // If there's an active conversation, update it
      if (state.activeConversationId) {
        const updatedConversations = state.conversations.map(conv => 
          conv.id === state.activeConversationId 
            ? { 
                ...conv, 
                messages: [...conv.messages, newMessage],
                updatedAt: new Date().toISOString(),
                title: conv.title === 'New conversation' && message.sender === 'user' 
                  ? message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '')
                  : conv.title
              } 
            : conv
        );
        
        return { 
          messages: updatedMessages,
          conversations: updatedConversations
        };
      }
      
      return { messages: updatedMessages };
    });
  },
  
  clearMessages: () => set({ messages: [] }),
  
  createNewConversation: (mode: ChatMode = 'chat') => {
    const newId = uuidv4();
    const newConversation: ChatConversation = {
      id: newId,
      title: 'New conversation',
      messages: [],
      mode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set((state) => ({
      conversations: [...(state.conversations || []), newConversation],
      activeConversationId: newId,
      messages: [],
      activeMode: mode,
      mode
    }));
    
    return newId;
  },
  
  // Alias for createNewConversation for compatibility
  createConversation: (mode: ChatMode = 'chat') => {
    const { createNewConversation } = get();
    return createNewConversation(mode);
  },
  
  setActiveConversation: (id: string) => {
    const { conversations } = get();
    const conversation = conversations.find(conv => conv.id === id);
    
    if (conversation) {
      set({
        activeConversationId: id,
        messages: conversation.messages,
        activeMode: conversation.mode,
        mode: conversation.mode
      });
    }
  },
  
  updateConversation: (id: string, updates: Partial<ChatConversation>) => {
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => 
      conv.id === id 
        ? { ...conv, ...updates, updatedAt: new Date().toISOString() } 
        : conv
    );
    
    set({ conversations: updatedConversations });
  },
  
  deleteConversation: (id: string) => {
    const { conversations, activeConversationId } = get();
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    
    // If deleting the active conversation, clear the messages
    if (activeConversationId === id) {
      set({
        conversations: updatedConversations,
        activeConversationId: null,
        messages: []
      });
    } else {
      set({ conversations: updatedConversations });
    }
  },
  
  pinConversation: (id: string, pinned: boolean) => {
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => 
      conv.id === id 
        ? { ...conv, pinned, updatedAt: new Date().toISOString() } 
        : conv
    );
    
    set({ conversations: updatedConversations });
  },
  
  favoriteConversation: (id: string, favorite: boolean) => {
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => 
      conv.id === id 
        ? { ...conv, favorite, isFavorite: favorite, updatedAt: new Date().toISOString() } 
        : conv
    );
    
    set({ conversations: updatedConversations });
  }
}));
