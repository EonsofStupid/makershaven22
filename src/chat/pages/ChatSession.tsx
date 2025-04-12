
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChatSession } from '../hooks/useChatSession';
import { Send } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../../shared/ui/card';
import { Button } from '../../shared/ui/button';
import { Textarea } from '../../shared/ui/textarea';

export default function ChatSession() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { messages, sendMessage, isLoading } = useChatSession({ 
    sessionId: sessionId || undefined 
  });
  const [input, setInput] = useState('');
  
  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <h2 className="text-xl font-bold">Chat Session</h2>
          <p className="text-sm text-muted-foreground">Session ID: {sessionId}</p>
        </CardHeader>
        <CardContent className="min-h-[400px] max-h-[60vh] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Send a message to start chatting
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex w-full gap-2">
            <Textarea
              placeholder="Type a message..."
              className="min-h-[40px] flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button size="icon" onClick={handleSend} disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
