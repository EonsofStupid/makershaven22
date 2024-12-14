import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { userAtom, sessionAtom } from '@/lib/store/atoms/auth';
import { toast } from "sonner";
import { 
  UserCircle, Settings, Activity, 
  LayoutDashboard, LogOut, Database,
  Image, FileText, Zap, Radio
} from "lucide-react";
import { UserMenuHeader } from "./menu/UserMenuHeader";
import { UserMenuItem } from "./menu/UserMenuItem";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export const UserMenu = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [, setSession] = useAtom(sessionAtom);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
    toast.success(`Navigating to ${path.split('/').pop()?.toUpperCase() || 'Home'}`);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setSession(null);
      toast.success("Successfully signed out");
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <motion.div 
      className="fixed md:absolute right-0 mt-2 w-72 rounded-xl bg-[#221a2b] backdrop-blur-xl border border-[#95bf0b]/20 shadow-xl z-[100] 
                 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      style={{
        background: `linear-gradient(135deg, #221a2b 0%, #1e0430 50%, #3281f0 100%)`,
      }}
    >
      <UserMenuHeader />
      
      <div className="p-3 space-y-2">
        <UserMenuItem
          icon={UserCircle}
          label="Profile"
          onClick={() => handleNavigation("/profile")}
        />

        <UserMenuItem
          icon={Image}
          label="Media"
          onClick={() => handleNavigation("/media")}
        />

        <UserMenuItem
          icon={Activity}
          label="Activity"
          onClick={() => handleNavigation("/activity")}
        />

        {isAdmin && (
          <>
            <div className="h-px bg-[#95bf0b]/20 my-2" />
            
            <UserMenuItem
              icon={LayoutDashboard}
              label="Admin Dashboard"
              onClick={() => handleNavigation("/admin/dashboard")}
            />
            
            <UserMenuItem
              icon={Database}
              label="Data Maestro"
              onClick={() => handleNavigation("/admin/data-maestro")}
            />

            <UserMenuItem
              icon={Zap}
              label="Performance"
              onClick={() => handleNavigation("/admin/performance")}
            />

            <UserMenuItem
              icon={Radio}
              label="Monitoring"
              onClick={() => handleNavigation("/admin/monitoring")}
            />
          </>
        )}

        <div className="h-px bg-[#95bf0b]/20 my-2" />
        
        <UserMenuItem
          icon={Settings}
          label="Settings"
          onClick={() => handleNavigation("/settings")}
        />

        <UserMenuItem
          icon={LogOut}
          label="Sign Out"
          variant="danger"
          onClick={handleSignOut}
        />
      </div>
    </motion.div>
  );
};