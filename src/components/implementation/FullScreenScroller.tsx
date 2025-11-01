'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useFullScreenScroll } from '../../hooks/useFullScreenScroll';

interface FullScreenScrollerProps {
  children: React.ReactNode;
}

const FullScreenScroller: React.FC<FullScreenScrollerProps> = ({ children }) => {
  const sections = React.Children.toArray(children);

  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const { activeIndex, isAnimating, setIsAnimating } = useFullScreenScroll(
    sections.length,
    isDesktop
  );

  if (!isDesktop) {
    return (
      <div style={{ width: '100%', height: 'auto', overflow: 'visible', position: 'relative' }}>
        {children}
      </div>
    );
  }

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
