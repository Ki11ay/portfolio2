import { createContext, useContext, useCallback } from 'react';

export const MouseContext = createContext({
  handleMouseMove: () => {},
});

export const useMouseContext = () => useContext(MouseContext);

export const MouseProvider = ({ children }) => {
  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }, []);

  return (
    <MouseContext.Provider value={{ handleMouseMove }}>
      {children}
    </MouseContext.Provider>
  );
};
