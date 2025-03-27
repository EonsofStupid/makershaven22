
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Logo = () => {
  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    toast.success(`Navigating to ${path}`);
  };

  return (
    <Link 
      to="/"
      className="flex items-center space-x-2 cursor-pointer group -ml-6 scale-125"
      onClick={() => handleNavigation('/')}
    >
      <motion.span 
        className="text-3xl font-bold flex items-center space-x-1 relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.span 
          className="neon-text-cyan relative transform -translate-y-1"
          whileHover={{ 
            textShadow: [
              "0 0 7px #41f0db, 0 0 10px #41f0db, 0 0 21px #41f0db, 0 2px 4px rgba(0, 0, 0, 0.5)",
              "0 0 10px #41f0db, 0 0 20px #41f0db, 0 0 30px #41f0db, 0 2px 4px rgba(0, 0, 0, 0.5)",
              "0 0 7px #41f0db, 0 0 10px #41f0db, 0 0 21px #41f0db, 0 2px 4px rgba(0, 0, 0, 0.5)"
            ],
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5
            }
          }}
        >
          Makers
          <span className="absolute inset-0 blur-lg bg-[#41f0db] opacity-50"></span>
          <span className="absolute inset-0 animate-pulse blur-xl bg-[#41f0db] opacity-30"></span>
          <span className="absolute inset-0 filter blur-[2px] opacity-70" style={{ 
            background: 'linear-gradient(to bottom, rgba(65, 240, 219, 0.2) 0%, rgba(65, 240, 219, 0) 100%)'
          }}></span>
        </motion.span>
        <motion.span 
          className="neon-text-pink relative transform translate-y-1"
          whileHover={{ 
            textShadow: [
              "0 0 7px #ff0abe, 0 0 10px #ff0abe, 0 0 21px #ff0abe, 0 2px 4px rgba(0, 0, 0, 0.5)",
              "0 0 10px #ff0abe, 0 0 20px #ff0abe, 0 0 30px #ff0abe, 0 2px 4px rgba(0, 0, 0, 0.5)",
              "0 0 7px #ff0abe, 0 0 10px #ff0abe, 0 0 21px #ff0abe, 0 2px 4px rgba(0, 0, 0, 0.5)"
            ],
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5
            }
          }}
        >
          Impulse
          <span className="absolute inset-0 blur-lg bg-[#ff0abe] opacity-50"></span>
          <span className="absolute inset-0 animate-pulse blur-xl bg-[#ff0abe] opacity-30"></span>
          <span className="absolute inset-0 filter blur-[2px] opacity-70" style={{ 
            background: 'linear-gradient(to bottom, rgba(255, 10, 190, 0.2) 0%, rgba(255, 10, 190, 0) 100%)'
          }}></span>
        </motion.span>
      </motion.span>
    </Link>
  );
};
