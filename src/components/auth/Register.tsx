import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth/auth-store';

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUser, setSession } = useAuthStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F1114] to-[#1A1F2C]"
    >
      <div className="w-full max-w-md space-y-8 p-8 bg-black/20 backdrop-blur-xl rounded-xl border border-white/10">
        <div>
          <h2 className="text-3xl font-bold text-center text-white">Register</h2>
        </div>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10"
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate('/auth/login')}
            className="text-neon-cyan hover:text-neon-cyan/80"
          >
            Already have an account? Login
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;