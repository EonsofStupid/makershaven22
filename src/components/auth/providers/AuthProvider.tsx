import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSyncedAuth } from "@/lib/store/hooks/useSyncedStore";
import { toast } from "sonner";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuthState } = useSyncedAuth();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        
        setAuthState({
          isAuthLoading: true,
          error: null
        });
        
        if (session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setAuthState({
            user: {
              ...session.user,
              role: profile?.role || "subscriber",
              ...profile
            },
            session,
            isAuthLoading: false,
            error: null
          });
          
          if (event === "SIGNED_IN") {
            toast.success("Successfully signed in");
          }
        } else {
          setAuthState({
            user: null,
            session: null,
            isAuthLoading: false,
            error: null
          });
          
          if (event === "SIGNED_OUT") {
            toast.success("Successfully signed out");
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuthState]);

  return <>{children}</>;
};