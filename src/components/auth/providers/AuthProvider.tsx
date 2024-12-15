import { useEffect } from "react";
import { useSyncedAuth } from "@/lib/store/hooks/useSyncedStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, setSession, setAuthLoading } = useSyncedAuth();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        
        setAuthLoading(true);
        
        if (session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setUser({
            ...session.user,
            role: profile?.role || "subscriber",
            ...profile
          });
          setSession(session);
          
          if (event === "SIGNED_IN") {
            toast.success("Successfully signed in");
          }
        } else {
          setUser(null);
          setSession(null);
          
          if (event === "SIGNED_OUT") {
            toast.success("Successfully signed out");
          }
        }
        
        setAuthLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setAuthLoading]);

  return <>{children}</>;
};