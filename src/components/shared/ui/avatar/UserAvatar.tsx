import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/store/auth/use-auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AvatarFallbackContent } from "./components/AvatarFallbackContent";

interface UserAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showFallback?: boolean;
  onClick?: () => void;
}

export const UserAvatar = ({ 
  className,
  size = 'md',
  showFallback = true,
  onClick 
}: UserAvatarProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  };

  const handleAvatarClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      toast.info("Sign in to access your profile");
      return;
    }

    navigate("/profile");
  };

  return (
    <Avatar 
      className={cn(
        sizeClasses[size],
        "relative cursor-pointer transition-all duration-300 ease-out",
        "hover:scale-110 group",
        "border border-transparent hover:border-[#41f0db]/50",
        "hover:shadow-[0_0_15px_rgba(65,240,219,0.3)]",
        className
      )}
      onClick={handleAvatarClick}
    >
      {user && !imageError ? (
        <AvatarImage
          src={user?.user_metadata?.avatar_url || "/admin/placeholder-avatar.png"}
          alt="User avatar"
          onError={() => setImageError(true)}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      ) : showFallback ? (
        <AvatarFallbackContent email={user?.email} />
      ) : null}
      
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      
      <div 
        className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md bg-gradient-to-r from-[#41f0db] to-[#8000ff] -z-10" 
      />
    </Avatar>
  );
};