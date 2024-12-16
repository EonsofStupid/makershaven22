import React from 'react';

export const TwoFactorHeader = () => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-white">Two-Factor Authentication</h2>
      <p className="text-gray-400 mt-2">
        Please enter the verification code sent to your device
      </p>
    </div>
  );
};