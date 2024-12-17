import React from 'react';
import { NavigationLinks } from '../../shared/ui/navigation/NavigationLinks';
import { UserAvatar } from '../../shared/ui/avatar/UserAvatar';
import { useAuthStore } from '@/lib/store/auth/store/auth-store';

export const Header = () => {
  const { user } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-bold text-white">
            MakersImpulse
          </a>
          <NavigationLinks />
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <UserAvatar />
          </div>
        )}
      </div>
    </header>
  );
};