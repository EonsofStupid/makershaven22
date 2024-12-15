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

export const TwoFactorVerification = ({ email, password }: TwoFactorVerificationProps) => {
  const { authError } = useSyncedAuth();
  const {
    code,
    setCode,
    isLoading,
    error,
    handleVerification,
    handleResendCode
  } = useTwoFactorVerification(email, password);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md space-y-8 p-8 bg-black/20 backdrop-blur-xl rounded-xl border border-white/10"
    >
      <TwoFactorHeader email={email} />
      <TwoFactorForm
        code={code}
        isLoading={isLoading}
        error={error || authError}
        onChange={setCode}
        onSubmit={handleVerification}
        onResend={handleResendCode}
      />
    </motion.div>
  );
};