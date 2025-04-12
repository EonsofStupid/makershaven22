
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextRevealProps {
  content: string;
  delay?: number;
  duration?: number;
}

const AnimatedTextReveal: React.FC<AnimatedTextRevealProps> = ({
  content,
  delay = 0.3,
  duration = 0.5
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    setObserver(obs);
    
    return () => {
      if (obs) {
        obs.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (observer && contentRef) {
      observer.observe(contentRef);
      
      return () => {
        observer.unobserve(contentRef);
      };
    }
  }, [observer, contentRef]);

  return (
    <div ref={setContentRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration, delay }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default AnimatedTextReveal;
