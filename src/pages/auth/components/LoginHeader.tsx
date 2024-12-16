import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LoginHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="sticky top-0 z-50 flex items-center p-4 bg-black/40 backdrop-blur-xl border-b border-[#41f0db]/20">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate(-1)}
        className="mr-2 text-white hover:text-[#41f0db]"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-bold bg-gradient-to-r from-[#41f0db] to-[#ff0abe] text-transparent bg-clip-text">
        Sign In
      </h1>
    </div>
  );
};