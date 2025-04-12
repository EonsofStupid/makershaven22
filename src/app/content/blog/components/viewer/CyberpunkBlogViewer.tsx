
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CyberpunkBlogViewerProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

const CyberpunkBlogViewer: React.FC<CyberpunkBlogViewerProps> = ({ content, isOpen, onClose }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (content) {
      // Split content into paragraphs, then lines for typing effect
      const paragraphs = content.split('\n\n');
      const formattedLines: string[] = [];
      
      paragraphs.forEach((paragraph) => {
        // Handle simple markdown
        if (paragraph.startsWith('# ')) {
          formattedLines.push(`<h1>${paragraph.substring(2)}</h1>`);
        } else if (paragraph.startsWith('## ')) {
          formattedLines.push(`<h2>${paragraph.substring(3)}</h2>`);
        } else if (paragraph.startsWith('### ')) {
          formattedLines.push(`<h3>${paragraph.substring(4)}</h3>`);
        } else if (paragraph.startsWith('- ')) {
          formattedLines.push(`<li>${paragraph.substring(2)}</li>`);
        } else {
          formattedLines.push(`<p>${paragraph}</p>`);
        }
      });
      
      setLines(formattedLines);
    }
  }, [content]);
  
  useEffect(() => {
    if (isOpen) {
      setLineIndex(0);
      
      // Set up keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
          setLineIndex(prev => Math.min(prev + 1, lines.length));
        } else if (e.key === 'ArrowUp') {
          setLineIndex(prev => Math.max(prev - 1, 0));
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, lines.length, onClose]);
  
  useEffect(() => {
    // Auto-scroll to current line
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector(`[data-index="${lineIndex - 1}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [lineIndex]);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-95 backdrop-blur-md flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b border-[#41f0db]/20">
            <div className="text-[#41f0db] text-xl font-mono">CYBERPUNK.VIEW</div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-[#41f0db]/30 text-[#41f0db] hover:bg-[#41f0db]/20 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto p-6 font-mono text-lg space-y-4 max-w-4xl mx-auto w-full"
          >
            {lines.slice(0, lineIndex).map((line, index) => (
              <motion.div
                key={index}
                data-index={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * (index % 5) }}
                className="terminal-line"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
            
            {lineIndex < lines.length && (
              <div className="fixed bottom-4 right-4 text-[#41f0db] text-sm bg-black/70 p-2 border border-[#41f0db]/30 rounded">
                <div className="animate-pulse">PRESS [SPACE] OR [↓] TO CONTINUE</div>
                <div className="text-xs text-[#41f0db]/50">{lineIndex}/{lines.length} LINES</div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CyberpunkBlogViewer;
