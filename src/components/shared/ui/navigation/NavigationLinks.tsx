
import { Link } from "react-router-dom";
import { useAuthStore } from '@/lib/store/auth-store';
import { memo } from "react";
import { useTheme } from '@/components/theme/ThemeContext';

export const NavigationLinks = memo(() => {
  const { session, user } = useAuthStore();
  const { theme } = useTheme();

  const neonCyan = theme?.neon_cyan || '#41f0db';
  const neonPurple = theme?.neon_purple || '#8000ff';

  const NavLink = ({ to, label }: { to: string; label: string }) => (
    <Link 
      to={to}
      className="text-white hover:text-[#41f0db] transition-all duration-300 relative group cursor-pointer"
    >
      <span className="relative z-10 text-white font-medium">{label}</span>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavLink to="/maker-space" label="Maker Space" />
      <NavLink to="/blog" label="Blog" />
      {user?.role === 'admin' && <NavLink to="/admin/dashboard" label="Admin" />}
    </div>
  );
});

NavigationLinks.displayName = 'NavigationLinks';
