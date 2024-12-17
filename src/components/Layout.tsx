import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/ff432201-0b9c-442d-924b-80eedc673b73.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-semibold">PopCulture</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/reviews" className="nav-link">Reviews</Link>
              <Link to="/podcasts" className="nav-link">Podcasts</Link>
              <Link to="/tv-shows" className="nav-link">TV Shows</Link>
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
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
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
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>

      <footer className="glass-card mt-16 border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-sm text-foreground/80">
                Your daily dose of pop culture, entertainment news, and thoughtful reviews.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/about" className="text-sm text-foreground/80 hover:text-foreground">
                  About Us
                </Link>
                <Link to="/contact" className="text-sm text-foreground/80 hover:text-foreground">
                  Contact
                </Link>
                <Link to="/privacy" className="text-sm text-foreground/80 hover:text-foreground">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="glass-input flex-1"
                />
                <button className="px-4 py-2 bg-primary rounded-md hover:bg-primary/80 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} PopCulture Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;