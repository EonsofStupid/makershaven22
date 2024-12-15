import { Link } from "react-router-dom";
import { Menu, Search, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { UnifiedNavigation } from "./shared/ui/navigation/UnifiedNavigation";
import { useNavigationState } from "@/hooks/useNavigationState";
import { useAuth } from "@/hooks/useAuth";
import { useNavigationStore } from "./shared/ui/navigation/NavigationState";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { handleNavigation } = useNavigationState();
  const { setIsScrolled } = useNavigationStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
      handleNavigation("/login");
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
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={() => handleNavigation("/")}
            >
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
                <Link 
                  to="/admin" 
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  onClick={() => handleNavigation("/admin")}
                >
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