import React from 'react';
import { UserNav } from "./navigation/UserNav";
import { MainNav } from "./navigation/MainNav";
import { UserAvatar } from "./avatar/UserAvatar";
import { useAuth } from "@/lib/store/hooks/useAuth";
import type { AuthUser } from '@/lib/types/auth';

interface NavigationProps {
  user?: AuthUser;
}

export const Navigation: React.FC<NavigationProps> = ({ user }) => {
  return (
    <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search functionality can be added here */}
          </div>
          <UserNav>
            <UserAvatar user={user} className="h-8 w-8" />
          </UserNav>
        </div>
      </div>
    </div>
  );
};
