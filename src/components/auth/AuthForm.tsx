import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSyncedAuth } from "@/lib/store/hooks/useSyncedStore";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  onSubmit: (data: AuthFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  type?: "login" | "register";
}

export const AuthForm = ({ 
  onSubmit, 
  isLoading = false, 
  error = null,
  type = "login" 
}: AuthFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema)
  });
  const { authError } = useSyncedAuth();

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={formVariants}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="email" className="text-white/90">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="password" className="text-white/90">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            id="password"
            type="password"
            {...register("password")}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </motion.div>

      {(error || authError) && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm"
        >
          {error || (authError instanceof Error ? authError.message : "An error occurred")}
        </motion.p>
      )}

      <motion.div variants={itemVariants}>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#41f0db] to-[#8000ff] hover:opacity-90 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {type === "login" ? "Sign In" : "Create Account"}
        </Button>
      </motion.div>
    </motion.form>
  );
};