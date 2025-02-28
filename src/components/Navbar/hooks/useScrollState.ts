import { useState, useEffect } from 'react';
import { getScrollDetails, getSectionOffset } from '../utils';
import { NAV_ITEMS, ScrollState, NavItem } from '../types';

export const useScrollState = () => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    currentSection: NAV_ITEMS[0].id,
    progress: 0
  });

  useEffect(() => {
    let isMounted = true;
    let rafId: number;

    const calculateScrollState = (): ScrollState => {
      const { scrollPosition, progress } = getScrollDetails();

      // Find current section, defaulting to first section
      let currentSection = NAV_ITEMS[0].id;

      // Iterate through sections from bottom to top
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const offset = getSectionOffset(NAV_ITEMS[i].id);
        if (offset <= scrollPosition) {
          currentSection = NAV_ITEMS[i].id;
          break;
        }
      }

      return { currentSection, progress };
    };

    const handleScroll = () => {
      if (!isMounted) return;
      
      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        const nextState = calculateScrollState();
        setScrollState(nextState);
      });
    };

    // Initialize scroll state after mount
    handleScroll();

    // Add scroll listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      isMounted = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return {
    scrollState,
    navItems: NAV_ITEMS as ReadonlyArray<NavItem>
  };
};

export default useScrollState;