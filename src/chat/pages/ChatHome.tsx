
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../shared/ui/card';
import { Button } from '../../shared/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from '../../shared/ui/textarea';

export default function ChatHome() {
  const navigate = useNavigate();
  
  const startNewChat = () => {
    const sessionId = uuidv4();
    navigate(`/chat/${sessionId}`);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* New Chat Card */}
        <Card className="cursor-pointer hover:shadow-md transition-all" onClick={startNewChat}>
          <CardHeader>
            <CardTitle>New Chat</CardTitle>
            <CardDescription>Start a new conversation</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PlusCircle className="h-16 w-16 text-muted-foreground" />
          </CardContent>
        </Card>
        
        {/* Quick Chat Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Chat</CardTitle>
            <CardDescription>Ask a question directly</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Type your message here..."
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
