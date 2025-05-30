
import { useEffect, useCallback } from 'react';
import { chatBridge } from '../lib/ChatBridge';
import { ChatBridgeChannel, ChatBridgeMessage } from '../types/chat';

export const useChatBridge = () => {
  useEffect(() => {
    // Connect when the hook is first used
    chatBridge.connect().catch(err => {
      console.error('Failed to connect to ChatBridge:', err);
    });
    
    // Disconnect when the component using this hook unmounts
    return () => {
      chatBridge.disconnect();
    };
  }, []);
  
  const send = useCallback((message: ChatBridgeMessage) => {
    return chatBridge.send(message);
  }, []);
  
  const publish = useCallback((channel: ChatBridgeChannel, message: any) => {
    return chatBridge.publish(channel, message);
  }, []);
  
  const subscribe = useCallback((channel: ChatBridgeChannel, callback: (message: ChatBridgeMessage) => void) => {
    return chatBridge.subscribe(channel, callback);
  }, []);
  
  const unsubscribe = useCallback((channel: ChatBridgeChannel) => {
    chatBridge.unsubscribe(channel);
  }, []);
  
  const isConnected = useCallback(() => {
    return chatBridge.isConnected();
  }, []);
  
  return {
    isConnected,
    send,
    publish,
    subscribe,
    unsubscribe
  };
};
