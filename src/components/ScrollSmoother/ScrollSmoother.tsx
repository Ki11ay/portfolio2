import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../plugins/gsap-register';
import './styles/ScrollSmoother.css';

interface ScrollSmootherWrapperProps {
  children: React.ReactNode;
  speed?: number;
  smoothTouch?: boolean | number;
  effects?: boolean;
}

const ScrollSmootherWrapper: React.FC<ScrollSmootherWrapperProps> = ({
  children,
  speed = 1,
  smoothTouch = 0.1,
  effects = true
}) => {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const smootherInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Check if ScrollSmoother should be enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create ScrollSmoother instance
    if (smoothWrapperRef.current && smoothContentRef.current) {
      try {
        smootherInstanceRef.current = ScrollSmoother.create({
          wrapper: smoothWrapperRef.current,
          content: smoothContentRef.current,
          smooth: speed,
          effects,
          normalizeScroll: true,
          smoothTouch,
          ignoreMobileResize: true
        });

        // Enable touch scrolling on mobile
        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
          document.body.style.touchAction = 'pan-y';
        }
      } catch (error) {
        console.warn('ScrollSmoother initialization failed:', error);
      }
    }

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      if (smootherInstanceRef.current) {
        try {
          smootherInstanceRef.current.kill();
        } catch (error) {
          console.warn('ScrollSmoother cleanup failed:', error);
        }
      }
      // Reset touch action
      if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        document.body.style.touchAction = '';
      }
    };
  }, [speed, smoothTouch, effects]);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (smootherInstanceRef.current) {
        try {
          setTimeout(() => {
            ScrollTrigger.refresh();
            smootherInstanceRef.current.scrollTop(0);
          }, 100);
        } catch (error) {
          console.warn('Route change scroll handling failed:', error);
        }
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <div 
      ref={smoothWrapperRef} 
      className="smooth-wrapper" 
      data-scroll-container
    >
      <div 
        ref={smoothContentRef} 
        className="smooth-content" 
        data-scroll
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollSmootherWrapper;