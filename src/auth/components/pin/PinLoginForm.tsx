
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PinLoginFormProps {
  email: string;
  onSwitchToPassword: () => void;
}

export const PinLoginForm: React.FC<PinLoginFormProps> = ({
  email,
  onSwitchToPassword,
}) => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    const newPin = [...pin];
    
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;
    
    newPin[index] = value;
    setPin(newPin);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const combinedPin = pin.join("");
    if (combinedPin.length !== 4) {
      setError("Please enter a 4-digit PIN");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Placeholder for PIN validation
      console.log("Validating PIN for email:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, just check if PIN is "1234"
      if (combinedPin === "1234") {
        console.log("PIN login successful");
      } else {
        throw new Error("Invalid PIN");
      }
    } catch (error) {
      console.error("PIN login error:", error);
      setError(error instanceof Error ? error.message : "PIN validation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <p className="text-sm text-white/60">
          Enter the 4-digit PIN for
        </p>
        <p className="text-white font-medium">{email}</p>
      </div>

      <div className="flex justify-center gap-3">
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`pin-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-xl font-bold bg-white/5 border border-white/20 rounded-md focus:border-[#41f0db] focus:ring-1 focus:ring-[#41f0db] text-white"
            autoFocus={index === 0}
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm text-center"
        >
          {error}
        </motion.p>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#41f0db] to-[#8000ff] hover:opacity-90 transition-opacity rounded-md font-medium disabled:opacity-50"
          disabled={isSubmitting || pin.some((p) => !p)}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Verifying...
            </span>
          ) : (
            "Continue"
          )}
        </button>

        <button
          type="button"
          onClick={onSwitchToPassword}
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          Use password instead
        </button>
      </div>
    </motion.form>
  );
};
