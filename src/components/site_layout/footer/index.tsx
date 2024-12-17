import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-white/60">
          <p>© {new Date().getFullYear()} MakersImpulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};