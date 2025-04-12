
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { chatBridge } from '../lib/ChatBridge';
import { ChatMessage } from '../types/chat';
import { ChatMode } from '../shared/types/enums';
import { useLogger } from '../hooks/use-logger';
import { useAuthState } from '../auth/hooks/useAuthState';
import CircuitBreaker from '../utils/CircuitBreaker';

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  mode: ChatMode;
  sessionId: string;
  setMode: (mode: ChatMode) => void;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: async () => {},
  isLoading: false,
  mode: 'normal',
  sessionId: '',
  setMode: () => {}
});

export const useChat = () => useContext(ChatContext);

interface ChatProviderProps {
  children: ReactNode;
  initialMode?: ChatMode;
  initialSessionId?: string;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  initialMode = 'normal',
  initialSessionId
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>(initialMode);
  const [sessionId, setSessionId] = useState<string>(initialSessionId || uuidv4());
  const { user } = useAuthState();
  const logger = useLogger('ChatProvider');
  
  // Initialize CircuitBreaker
  useEffect(() => {
    CircuitBreaker.init('chat-provider', 10, 5000);
    
    return () => {
      CircuitBreaker.reset('chat-provider');
    };
  }, []);
  
  // Connect to chat bridge
  useEffect(() => {
    if (CircuitBreaker.count('chat-provider-connect')) {
      logger.warn('Breaking potential infinite loop in ChatProvider connection');
      return;
    }
    
    const initBridge = async () => {
      try {
        if (!chatBridge.isConnected()) {
          await chatBridge.connect();
        }
      } catch (error) {
        logger.error('Failed to connect to chat bridge', error instanceof Error ? error : new Error('Unknown error'));
      }
    };
    
    initBridge();
    
    return () => {
      chatBridge.disconnect();
    };
  }, [logger]);
  
  // Set up message listener
  useEffect(() => {
    if (!sessionId) return;
    
    const unsubscribe = chatBridge.subscribe('message', (message) => {
      if (message.sessionId === sessionId || !message.sessionId) {
        if (message.type === 'message_received' && message.data) {
          setMessages(prev => [...prev, message.data]);
        }
      }
    });
    
    return unsubscribe;
  }, [sessionId]);
  
  // Send message function
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    try {
      setIsLoading(true);
      
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        content,
        sender: 'user',
        timestamp: new Date().toISOString(),
        sessionId
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      chatBridge.send({
        type: 'user_message',
        data: userMessage,
        sessionId,
        timestamp: Date.now()
      });
      
    } catch (error) {
      logger.error('Error sending message', error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      // Note: We don't set isLoading to false here because we wait for the response
      // The loading state will be cleared when we receive a response
    }
  };
  
  // Value for the context
  const value = {
    messages,
    sendMessage,
    isLoading,
    mode,
    sessionId,
    setMode
  };
  
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
