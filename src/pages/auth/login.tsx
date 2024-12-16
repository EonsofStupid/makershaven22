import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { useAtom } from 'jotai';
import { sessionAtom, loadingStateAtom, userAtom } from '@/lib/store/atoms/auth';
import { useAuthStore } from '@/lib/store/auth-store';
import { LoginHeader } from "./components/LoginHeader";
import { LoginForm } from "./components/LoginForm";
import { SocialLoginButtons } from "./components/SocialLoginButtons";

const LoginContent = () => {
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);
  const [loadingState] = useAtom(loadingStateAtom);
  const [, setUser] = useAtom(userAtom);
  const { signIn } = useAuthStore();

  useEffect(() => {
    if (session?.user) {
      navigate("/");
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          if (session.user) {
            setUser(session.user);
            signIn(session.user.email!, '');
          }
          
          toast.success("Successfully signed in!");
          navigate("/");
        } catch (error) {
          console.error('Error initializing session:', error);
          toast.error('Error signing in', {
            description: 'There was a problem initializing your session'
          });
          await supabase.auth.signOut();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [session, navigate, loadingState, setUser, signIn]);

  if (loadingState.isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-[#0F1114]"
      >
        <LoadingSpinner />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0F1114] to-[#1A1F2C] flex flex-col relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-cyber-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-scratch-overlay opacity-30 pointer-events-none" />
      
      <LoginHeader />

      <div className="flex-1 flex flex-col p-4 space-y-6">
        <SocialLoginButtons />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/40" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0F1114] px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <LoginForm />
      </div>
    </motion.div>
  );
};

const Login = () => {
  return (
    <ErrorBoundary>
      <LoginContent />
    </ErrorBoundary>
  );
};

export default Login;