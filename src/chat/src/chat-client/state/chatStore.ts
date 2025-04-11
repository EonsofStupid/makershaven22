
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ChatStore, ChatMode, ChatMessage, ChatConversation } from '../../../types';

/**
 * Zustand store for chat state management
 */
export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  mode: 'chat',
  conversations: [],
  activeConversationId: null,
  
  setMode: (mode: ChatMode) => {
    set({ mode });
    
    // Update the mode of the active conversation if there is one
    const { activeConversationId, conversations } = get();
    if (activeConversationId) {
      const updatedConversations = conversations.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, mode, updatedAt: Date.now() } 
          : conv
      );
      set({ conversations: updatedConversations });
    }
  },
  
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage = { 
      ...message, 
      id: uuidv4(), 
      timestamp: Date.now() 
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
                updatedAt: Date.now(),
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
  
  createConversation: (mode = 'chat') => {
    const newId = uuidv4();
    const newConversation: ChatConversation = {
      id: newId,
      title: 'New conversation',
      messages: [],
      mode,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    set((state) => ({
      conversations: [...(state.conversations || []), newConversation],
      activeConversationId: newId,
      messages: [],
      mode
    }));
    
    return newId;
  },
  
  setActiveConversation: (id: string) => {
    const { conversations } = get();
    const conversation = conversations.find(conv => conv.id === id);
    
    if (conversation) {
      set({
        activeConversationId: id,
        messages: conversation.messages,
        mode: conversation.mode
      });
    }
  },
  
  updateConversation: (id: string, updates: Partial<ChatConversation>) => {
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => 
      conv.id === id ? { ...conv, ...updates, updatedAt: Date.now() } : conv
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
      conv.id === id ? { ...conv, pinned, updatedAt: Date.now() } : conv
    );
    
    set({ conversations: updatedConversations });
  },
  
  favoriteConversation: (id: string, favorite: boolean) => {
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => 
      conv.id === id ? { ...conv, favorite, updatedAt: Date.now() } : conv
    );
    
    set({ conversations: updatedConversations });
  }
}));
