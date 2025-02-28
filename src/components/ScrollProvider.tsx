import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollSmootherWrapper from './ScrollSmoother/ScrollSmoother';

interface ScrollContextType {
  scrollTo: (target: string | number | HTMLElement) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollTo: () => {}
});

export const useScroll = () => useContext(ScrollContext);

interface ScrollProviderProps {
  children: React.ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollTo = (target: string | number | HTMLElement) => {
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: 'smooth'
      });
    } else {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      <ScrollSmootherWrapper>
        {children}
      </ScrollSmootherWrapper>
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;