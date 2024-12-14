import { Link } from "react-router-dom";
import { useAuthStore } from '@/lib/store/auth-store';
import { memo } from "react";
import { motion } from "framer-motion";
import { Zap, Code, BookOpen, Settings } from "lucide-react";

export const NavigationLinks = memo(() => {
  const { session, user } = useAuthStore();

  const linkClass = "text-white hover:text-[#00ffd0] transition-all duration-300 relative group cursor-pointer flex items-center gap-2";
  const iconClass = "w-4 h-4 transition-all duration-300 group-hover:text-[#c8f542]";

  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/maker-space" className={linkClass}>
        <Zap className={iconClass} />
        <span className="relative z-10 font-['Share_Tech_Mono'] tracking-wider">
          Maker Space
          <motion.span
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00ffd0]/10 to-[#ff008c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"
            whileHover={{ scale: 1.1 }}
          />
        </span>
      </Link>
      
      <Link to="/blog" className={linkClass}>
        <BookOpen className={iconClass} />
        <span className="relative z-10 font-['Share_Tech_Mono'] tracking-wider">
          Blog
          <motion.span
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#84f542]/10 to-[#c8f542]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"
            whileHover={{ scale: 1.1 }}
          />
        </span>
      </Link>

      {user?.role === 'admin' && (
        <Link to="/admin/dashboard" className={linkClass}>
          <Code className={iconClass} />
          <span className="relative z-10 font-['Share_Tech_Mono'] tracking-wider">
            Admin
            <motion.span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#ff008c]/10 to-[#00ffd0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"
              whileHover={{ scale: 1.1 }}
            />
          </span>
        </Link>
      )}

      <Link to="/settings" className={linkClass}>
        <Settings className={iconClass} />
        <span className="relative z-10 font-['Share_Tech_Mono'] tracking-wider">
          Settings
          <motion.span
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#c8f542]/10 to-[#84f542]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"
            whileHover={{ scale: 1.1 }}
          />
        </span>
      </Link>
    </div>
  );
});

NavigationLinks.displayName = 'NavigationLinks';