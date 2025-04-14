
import { useState, useEffect } from 'react';
import { useAuthState } from '../auth/hooks/useAuthState';
import { chatBridge } from '../lib/ChatBridge';
import { useLogger } from './use-logger';
import { type LogCategory } from '../shared/types/enums';
import { v4 as uuidv4 } from 'uuid';
import CircuitBreaker from '../utils/CircuitBreaker';
import { ChatBridgeChannel, ChatMessage } from '../types/chat';
import { type ChatMode } from '../shared/types/enums';

interface UseChatSessionProps {
  sessionId?: string;
  mode?: ChatMode;
}

export function useChatSession({ sessionId: externalSessionId, mode = 'normal' }: UseChatSessionProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string>(externalSessionId || '');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthState();
  const logger = useLogger('useChatSession');
  
  // Initialize circuit breaker
  CircuitBreaker.init('useChatSession', 5, 1000);
  
  // Create or use session ID
  useEffect(() => {
    if (CircuitBreaker.count('useChatSession-init')) {
      logger.warn('Breaking potential infinite loop in useChatSession initialization');
      return;
    }
    
    if (externalSessionId) {
      setSessionId(externalSessionId);
    } else if (!sessionId) {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      
      // Notify about new session
      chatBridge.publish('system', {
        type: 'session-created',
        data: {
          sessionId: newSessionId,
          mode,
          userId: user?.id
        }
      });
      
      logger.info('Created new chat session', {
        sessionId: newSessionId, 
        mode
      });
    }
  }, [externalSessionId, sessionId, user?.id, logger, mode]);
  
  // Set up listener for this specific session
  useEffect(() => {
    if (!sessionId) return;
    
    // Create a session-specific channel
    const sessionChannel: ChatBridgeChannel = 'system';
    
    const unsubscribe = chatBridge.subscribe(sessionChannel, (message) => {
      if (message.type === 'new-message' && message.sessionId === sessionId) {
        setMessages(prev => [...prev, message.data.message]);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [sessionId]);
  
  // Send message function
  const sendMessage = async (content: string) => {
    if (!sessionId || !content.trim() || isLoading) return;
    
    try {
      setIsLoading(true);
      
      // Create user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        content,
        sender: 'user',
        timestamp: new Date().toISOString(),
        sessionId
      };
      
      // Add locally
      setMessages(prev => [...prev, userMessage]);
      
      // Send through bridge
      chatBridge.publish('message', {
        type: 'send-message',
        data: {
          message: userMessage,
          sessionId
        }
      });
      
      // Simulate response for now
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          content: `This is a response to: "${content}"`,
          sender: 'assistant',
          timestamp: new Date().toISOString(),
          sessionId
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      logger.error('Error sending message', error instanceof Error ? error : new Error('Unknown error'));
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    sendMessage,
    isLoading,
    sessionId
  };
}
