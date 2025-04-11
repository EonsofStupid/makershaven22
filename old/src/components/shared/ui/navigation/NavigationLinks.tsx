
import { Link } from "react-router-dom";
import { useAuthStore } from '@/lib/store/auth-store';
import { memo } from "react";
import { mainNavigation } from "@/config/navigation";

export const NavigationLinks = memo(() => {
  const { session, user } = useAuthStore();

  console.log('NavigationLinks render - Session:', {
    isAuthenticated: !!session,
    userId: session?.user?.id,
    role: user?.role
  });

  return (
    <div className="hidden md:flex items-center space-x-6">
      {user?.role === 'admin' && (
        <Link 
          to="/admin/dashboard"
          className="text-white hover:text-[#41f0db] transition-all duration-300 relative group cursor-pointer"
        >
          <span className="relative z-10 text-white font-medium">Admin</span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
        </Link>
      )}
      
      {mainNavigation.map((item) => (
        user?.role === 'admin' && (
          <Link 
            key={item.id}
            to={item.path}
            className="text-white hover:text-[#41f0db] transition-all duration-300 relative group cursor-pointer"
          >
            <span className="relative z-10 text-white font-medium">{item.label}</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#41f0db]/10 to-[#8000ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#41f0db] to-[#8000ff] transition-all duration-300 group-hover:w-full" />
          </Link>
        )
      ))}
    </div>
  );
});

NavigationLinks.displayName = 'NavigationLinks';
