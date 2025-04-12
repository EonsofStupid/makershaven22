
import React, { useState } from "react";
import { NumberPad } from "../../pin/NumberPad";
import { motion } from "framer-motion";

export const PinSetupForm = () => {
  const [pin, setPin] = useState<string[]>([]);
  const [confirmPin, setConfirmPin] = useState<string[]>([]);
  const [stage, setStage] = useState<'create' | 'confirm'>('create');
  const [error, setError] = useState<string | null>(null);

  const handleDigitPress = (digit: string) => {
    setError(null);
    
    if (digit === 'del') {
      if (stage === 'create') {
        setPin((prev) => prev.slice(0, -1));
      } else {
        setConfirmPin((prev) => prev.slice(0, -1));
      }
      return;
    }
    
    if (stage === 'create' && pin.length < 4) {
      setPin((prev) => [...prev, digit]);
      if (pin.length === 3) {
        setTimeout(() => setStage('confirm'), 300);
      }
    } else if (stage === 'confirm' && confirmPin.length < 4) {
      setConfirmPin((prev) => [...prev, digit]);
      
      if (confirmPin.length === 3) {
        setTimeout(() => {
          const newPin = [...confirmPin, digit].join('');
          const originalPin = pin.join('');
          
          if (newPin !== originalPin) {
            setError('PINs do not match. Please try again.');
            setConfirmPin([]);
          } else {
            // Success - PIN set successfully
            console.log('PIN set successfully:', newPin);
            // Here you would typically save the PIN to your auth system
          }
        }, 300);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">
          {stage === 'create' ? 'Create Your PIN' : 'Confirm Your PIN'}
        </h3>
        <p className="text-sm text-white/60">
          {stage === 'create' 
            ? 'Choose a 4-digit PIN for quick access' 
            : 'Re-enter your PIN to confirm'
          }
        </p>
      </div>
      
      <div className="flex justify-center gap-3 my-8">
        {Array.from({ length: 4 }).map((_, i) => {
          const isFilled = stage === 'create' 
            ? i < pin.length 
            : i < confirmPin.length;
            
          return (
            <motion.div
              key={i}
              initial={{ scale: 1 }}
              animate={{ 
                scale: isFilled ? [1, 1.1, 1] : 1,
                backgroundColor: isFilled ? 'rgba(65, 240, 219, 0.2)' : 'rgba(255, 255, 255, 0.1)'
              }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"
            >
              {isFilled && <div className="w-4 h-4 rounded-full bg-[#41f0db]" />}
            </motion.div>
          );
        })}
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm text-center"
        >
          {error}
        </motion.div>
      )}
      
      <NumberPad onDigitPress={handleDigitPress} />
    </div>
  );
};
