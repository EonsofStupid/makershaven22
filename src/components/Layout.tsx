import { Link } from "react-router-dom";
import { Menu, Search, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAtom } from 'jotai';
import { userAtom, sessionAtom } from '@/lib/store/atoms/auth';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UnifiedNavigation } from "./shared/ui/navigation/UnifiedNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAtom(userAtom);
  const [, setSession] = useAtom(sessionAtom);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setSession(null);
      toast.success("Successfully signed out");
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/ff432201-0b9c-442d-924b-80eedc673b73.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-semibold neon-text-cyan">MakersImpulse</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <UnifiedNavigation />
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
              {user?.role === 'admin' && (
                <Link to="/admin" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}
              {user && (
                <button
                  onClick={handleSignOut}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
              <button
                className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;