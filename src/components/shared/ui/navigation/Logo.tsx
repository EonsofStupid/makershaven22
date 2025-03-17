
import { Link } from "react-router-dom";
import { useTheme } from '@/components/theme/ThemeContext';

export const Logo = () => {
  const { theme } = useTheme();
  
  const neonCyan = theme?.neon_cyan || '#41f0db';
  const neonPink = theme?.neon_pink || '#ff0abe';

  return (
    <Link 
      to="/"
      className="flex items-center space-x-2 cursor-pointer group -ml-6 scale-125"
    >
      <span className="text-3xl font-bold flex items-center space-x-1 relative">
        <span className="neon-text-cyan relative transform -translate-y-1">
          Makers
          <span className="absolute inset-0 blur-lg bg-[#41f0db] opacity-50"></span>
          <span className="absolute inset-0 animate-pulse blur-xl bg-[#41f0db] opacity-30"></span>
        </span>
        <span className="neon-text-pink relative transform translate-y-1">
          Impulse
          <span className="absolute inset-0 blur-lg bg-[#ff0abe] opacity-50"></span>
          <span className="absolute inset-0 animate-pulse blur-xl bg-[#ff0abe] opacity-30"></span>
        </span>
      </span>
    </Link>
  );
};
