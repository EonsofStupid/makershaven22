
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChatBridge } from '../hooks/useChatBridge';
import { subscribeToAuthEvents } from '../../auth/bridge';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isConnected } = useChatBridge();
  
  useEffect(() => {
    // Subscribe to auth events to show/hide the chat based on authentication status
    const unsubscribe = subscribeToAuthEvents('session-change', (payload) => {
      setIsAuthenticated(!!payload?.session);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Only show the floating chat button if the user is authenticated and the chat bridge is connected
  if (!isAuthenticated || !isConnected()) {
    return null;
  }
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-colors"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 h-96 bg-card border rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="font-medium">Chat Support</h3>
              <button 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 h-full overflow-y-auto">
              {/* Chat content would go here */}
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Chat functionality will be implemented here.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
