'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useFullScreenScroll } from '../../hooks/useFullScreenScroll';

interface FullScreenScrollerProps {
  children: React.ReactNode;
}

const FullScreenScroller: React.FC<FullScreenScrollerProps> = ({ children }) => {
  const sections = React.Children.toArray(children);
  const { activeIndex, isAnimating, setIsAnimating } = useFullScreenScroll(sections.length);

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <motion.div
        animate={{ y: `-${activeIndex * 100}vh` }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] }}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{ height: '100%', width: '100%' }}
      >
        {sections.map((section, index) => (
          <div key={index} style={{ height: '100vh', width: '100vw' }}>
            {section}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FullScreenScroller;