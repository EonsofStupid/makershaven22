
import { useState, useCallback } from 'react';
import { chatBridge, ChatBridgeChannel, ChatBridgeMessage } from '../lib/ChatBridge';
import { useLogger } from '@/hooks/use-logger';
import { LogCategory } from '@/logging';

/**
 * Hook to use the chat bridge
 */
export function useChatBridge(defaultChannel: ChatBridgeChannel = 'global') {
  const [channel, setChannel] = useState(defaultChannel);
  const logger = useLogger('useChatBridge', LogCategory.CHAT);
  
  const publish = useCallback((message: ChatBridgeMessage, targetChannel?: string) => {
    const publishChannel = targetChannel || channel;
    logger.debug(`Publishing to ${publishChannel}`, { details: { message } });
    chatBridge.publish(publishChannel, message);
  }, [channel, logger]);
  
  const subscribe = useCallback((listener: (message: ChatBridgeMessage) => void, targetChannel?: string) => {
    const subscribeChannel = targetChannel || channel;
    logger.debug(`Subscribing to ${subscribeChannel}`);
    
    const unsubscribe = chatBridge.subscribe(subscribeChannel, listener);
    return unsubscribe;
  }, [channel, logger]);
  
  const changeChannel = useCallback((newChannel: string) => {
    logger.debug(`Changing channel from ${channel} to ${newChannel}`);
    setChannel(newChannel);
  }, [channel, logger]);
  
  return {
    publish,
    subscribe,
    channel,
    changeChannel
  };
}
