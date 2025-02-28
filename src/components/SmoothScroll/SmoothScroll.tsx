import React, { useEffect, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../../plugins/gsap-register';
import './styles/SmoothScroll.css';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const handleResize = useCallback(() => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
  }, []);

  useEffect(() => {
    // Check if smooth scrolling should be enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Enable touch scrolling on mobile
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      document.body.style.touchAction = 'pan-y';
    }

    // Add resize handler
    const resizeHandler = handleResize();
    window.addEventListener('resize', resizeHandler);

    return () => {
      // Cleanup
      document.documentElement.style.scrollBehavior = '';
      document.body.style.touchAction = '';
      window.removeEventListener('resize', resizeHandler);
    };
  }, [handleResize]);

  return (
    <div className="smooth-scroll-container">
      <div className="smooth-scroll-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;