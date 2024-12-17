import { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { Menu, Search, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { UserAvatar } from "../avatar/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const { user, signOut } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#151A24]/80 backdrop-blur-xl border-b border-[#41f0db]/20">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold relative">
            <span className="neon-text-cyan">Makers</span>
            <span className="neon-text-pink">Impulse</span>
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/maker-space"
            className="nav-item"
          >
            <span className="relative z-10">Maker Space</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link 
            to="/blog"
            className="nav-item"
          >
            <span className="relative z-10">Blog</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
          </Link>
          {user?.role === 'admin' && (
            <Link 
              to="/admin/dashboard"
              className="nav-item"
            >
              <span className="relative z-10">Admin</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
            </Link>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="relative group hover:bg-transparent"
          >
            <Search className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#41f0db]" />
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10 rounded-full" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent"
                >
                  <UserAvatar size="lg" />
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-lg -z-10 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#151A24]/95 backdrop-blur-xl border border-[#41f0db]/20">
                <DropdownMenuItem onClick={handleSignOut} className="text-white hover:text-[#41f0db] hover:bg-white/5">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-[#41f0db] hover:bg-white/5">
                Sign In
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative group hover:bg-transparent"
          >
            <Menu className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#41f0db]" />
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10 rounded-full" />
          </Button>
        </div>
      </div>
    </nav>
  );
};