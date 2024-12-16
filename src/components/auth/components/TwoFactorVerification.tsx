import React from 'react';
import { motion } from 'framer-motion';
import { TwoFactorHeader } from './two-factor/TwoFactorHeader';
import { TwoFactorForm } from './two-factor/TwoFactorForm';
import { useTwoFactorVerification } from './two-factor/useTwoFactorVerification';
import { useSyncedAuth } from '@/lib/store/hooks/useSyncedStore';

interface TwoFactorVerificationProps {
  email: string;
  password: string;
}

export const TwoFactorVerification: React.FC<TwoFactorVerificationProps> = ({ 
  email 
}) => {
  const { authError } = useSyncedAuth();
  const {
    verifyCode,
    isLoading,
    error
  } = useTwoFactorVerification();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md space-y-8 p-8 bg-black/20 backdrop-blur-xl rounded-xl border border-white/10"
    >
      <TwoFactorHeader email={email} />
      <TwoFactorForm
        onSubmit={verifyCode}
        isLoading={isLoading}
        error={error || authError}
      />
    </motion.div>
  );
};