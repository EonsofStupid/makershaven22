
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { PinLoginForm } from "./pin/PinLoginForm";

interface ProfileWithPin {
  id: string;
  pin_enabled?: boolean;
  last_password_login?: string | null;
  [key: string]: any;
}

export const PinLogin = ({ onSwitchToPassword }: { onSwitchToPassword: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const { session } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      try {
        if (!session?.user) {
          toast.error("Please sign in with your password first to use PIN login");
          onSwitchToPassword();
          return;
        }

        // Check if the profile has pin login enabled
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Profile check error:", error);
          toast.error("Unable to verify profile. Please try again.");
          onSwitchToPassword();
          return;
        }

        const typedProfile = profile as ProfileWithPin;

        // Check if pin_enabled field exists and is true
        if (!typedProfile || !typedProfile.pin_enabled) {
          toast.error("PIN login not set up. Please log in with password first.");
          onSwitchToPassword();
          return;
        }

        // Check if last password login exists and is within the last month
        if (typedProfile.last_password_login) {
          const lastPasswordLogin = new Date(typedProfile.last_password_login);
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

          if (lastPasswordLogin < oneMonthAgo) {
            toast.error("Monthly password verification required. Please log in with your password.");
            onSwitchToPassword();
            return;
          }
        }

        setEmail(session.user.email || "");
        setIsLoading(false);
      } catch (error) {
        console.error("Session check error:", error);
        toast.error("Unable to verify session. Please try again.");
        onSwitchToPassword();
      }
    };

    checkSession();

    // Handle ESC key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onSwitchToPassword();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [session, onSwitchToPassword]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSwitchToPassword}
            className="hover:bg-red-500/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">PIN Login</h1>
          <p className="text-sm text-muted-foreground">Enter your PIN to continue</p>
        </div>

        <PinLoginForm 
          email={email}
          onSwitchToPassword={onSwitchToPassword}
        />
      </motion.div>
    </AnimatePresence>
  );
};
