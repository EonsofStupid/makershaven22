import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export interface TwoFactorFormProps {
  onSubmit: (code: string) => Promise<void>;
  isLoading: boolean;
  error?: Error | null;
}

export const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  onSubmit,
  isLoading,
  error
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(code);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="bg-white/5 border-white/10"
          maxLength={6}
          required
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error.message}</p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : null}
        Verify Code
      </Button>
    </form>
  );
};