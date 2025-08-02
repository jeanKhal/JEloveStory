import React, { useState, useEffect, useCallback } from 'react';
import { throttle } from '../utils/performance';

const ScrollProgress: React.FC = React.memo(() => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const throttledUpdate = throttle(updateScrollProgress, 16); // ~60fps
    
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', throttledUpdate);
  }, [updateScrollProgress]);

  return (
    <div className="scroll-progress-container">
      <div 
        className="scroll-progress-bar"
        style={{ 
          width: `${scrollProgress}%`,
          transform: `scaleX(${scrollProgress > 0 ? 1 : 0})`
        }}
      />
    </div>
  );
});

ScrollProgress.displayName = 'ScrollProgress';

export default ScrollProgress; 