import React, { createContext, useContext, useState, ReactNode } from 'react';

type CursorType = '' | 'hover' | 'hidden' | 'text' | 'default';

interface MouseContextType {
  cursorType: CursorType;
  cursorChangeHandler: (type: CursorType) => void;
}

const MouseContext = createContext<MouseContextType>({
  cursorType: '',
  cursorChangeHandler: () => {}
});

interface MouseProviderProps {
  children: ReactNode;
}

export const MouseContextProvider: React.FC<MouseProviderProps> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>('');

  const cursorChangeHandler = (type: CursorType) => {
    setCursorType(type);
  };

  return (
    <MouseContext.Provider value={{ cursorType, cursorChangeHandler }}>
      {children}
    </MouseContext.Provider>
  );
};

export const useMouseContext = () => {
  const context = useContext(MouseContext);
  if (context === undefined) {
    throw new Error('useMouseContext must be used within a MouseContextProvider');
  }
  return context;
};

export default MouseContextProvider;
