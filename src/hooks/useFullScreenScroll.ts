import { useState, useEffect } from 'react';

export const useFullScreenScroll = (sections: number, enabled: boolean = true) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  const handleWheel = (event: WheelEvent) => {
    if (isAnimating) return;

    const scrollDown = event.deltaY > 0;
    if (scrollDown && activeIndex < sections - 1) {
      setIsAnimating(true);
      setActiveIndex(activeIndex + 1);
    } else if (!scrollDown && activeIndex > 0) {
      setIsAnimating(true);
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (isAnimating) return;
    setTouchStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (isAnimating) return;

    const touchEndY = event.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    // A significant swipe gesture is needed
    if (Math.abs(deltaY) > 50) {
      const scrollDown = deltaY < 0; // Swiping up means scrolling down
      if (scrollDown && activeIndex < sections - 1) {
        setIsAnimating(true);
        setActiveIndex(activeIndex + 1);
      } else if (!scrollDown && activeIndex > 0) {
        setIsAnimating(true);
        setActiveIndex(activeIndex - 1);
      }
      // Reset start Y to prevent multiple scrolls from one swipe
      setTouchStartY(touchEndY); 
    }
  };

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeIndex, isAnimating, sections, touchStartY, enabled]);

  return { activeIndex, isAnimating, setIsAnimating };
};
