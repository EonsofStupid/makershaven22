import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TwoFactorFormProps {
  onSubmit: (code: string) => void;
  isLoading?: boolean;
}

export const TwoFactorForm: React.FC<TwoFactorFormProps> = ({ onSubmit, isLoading }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter verification code"
        className="bg-gray-800 border-gray-700"
      />
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </Button>
    </form>
  );
};