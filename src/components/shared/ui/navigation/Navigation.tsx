import React from 'react';
import { useSyncedAuth } from '@/lib/store/hooks/useSyncedStore';
import { MainNav } from './MainNav';
import { UserNav } from './UserNav';
import { Logo } from './Logo';

export const Navigation = () => {
  const { user, session } = useSyncedAuth();

  return (
    <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4">
        <Logo />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <UserNav user={user} />
          ) : (
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-sm font-medium text-white hover:text-white/80">
                Login
              </a>
              <a href="/register" className="text-sm font-medium text-white hover:text-white/80">
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};