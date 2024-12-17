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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-full items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-[#41f0db] to-[#8000ff] bg-clip-text text-transparent">
            MakersImpulse
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/maker-space"
            className="text-white hover:text-[#41f0db] transition-all duration-300"
          >
            Maker Space
          </Link>
          <Link 
            to="/blog"
            className="text-white hover:text-[#41f0db] transition-all duration-300"
          >
            Blog
          </Link>
          {user?.role === 'admin' && (
            <Link 
              to="/admin/dashboard"
              className="text-white hover:text-[#41f0db] transition-all duration-300"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full"
                >
                  <UserAvatar size="lg" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};