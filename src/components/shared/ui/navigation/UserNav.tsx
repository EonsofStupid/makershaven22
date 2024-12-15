import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../avatar/UserAvatar";
import { Button } from "@/components/ui/button";
import { useSyncedAuth } from "@/lib/store/hooks/useSyncedStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const UserNav = () => {
  const navigate = useNavigate();
  const { user, isAuthLoading } = useSyncedAuth();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  if (isAuthLoading) {
    return null;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-white hover:text-primary hover:bg-white/10"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
        <Button
          className="bg-primary hover:bg-primary/90 text-black"
          onClick={() => navigate("/register")}
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <UserAvatar />
      <Button
        variant="ghost"
        className="text-white hover:text-primary hover:bg-white/10"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
};