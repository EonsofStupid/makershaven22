import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm">
            © {new Date().getFullYear()} MakersImpulse. All rights reserved.
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/about" className="text-white/60 hover:text-white text-sm">
              About
            </a>
            <a href="/privacy" className="text-white/60 hover:text-white text-sm">
              Privacy
            </a>
            <a href="/terms" className="text-white/60 hover:text-white text-sm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};