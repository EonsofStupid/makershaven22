import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Mail, Phone } from "lucide-react";

export const SocialLoginButtons = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-8">
      <Button 
        variant="outline" 
        className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-border/40 hover:bg-black/60"
        onClick={() => {/* Handle GitHub login */}}
      >
        <Github className="h-5 w-5" />
        Continue with GitHub
      </Button>
      
      <Button
        variant="outline"
        className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-border/40 hover:bg-black/60"
        onClick={() => {/* Handle Google login */}}
      >
        <Mail className="h-5 w-5" />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border-border/40 hover:bg-black/60"
        onClick={() => {/* Handle Discord login */}}
      >
        <Phone className="h-5 w-5" />
        Continue with Discord
      </Button>
    </div>
  );
};