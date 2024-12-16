import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AuthUser } from '@/lib/types/auth';

export interface UserAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  user?: AuthUser;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  size = "md", 
  className = "",
  onClick,
  user
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  const initials = user?.displayName 
    ? user.displayName.substring(0, 2).toUpperCase()
    : "U";

  return (
    <Avatar 
      className={`${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {user?.user_metadata?.avatar_url && (
        <AvatarImage 
          src={user.user_metadata.avatar_url} 
          alt={user.displayName || "User avatar"} 
        />
      )}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};