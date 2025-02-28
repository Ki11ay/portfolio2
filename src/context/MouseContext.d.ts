import React, { ReactNode } from 'react';
type CursorType = '' | 'hover' | 'hidden' | 'text' | 'default';
interface MouseContextType {
    cursorType: CursorType;
    cursorChangeHandler: (type: CursorType) => void;
}
interface MouseProviderProps {
    children: ReactNode;
}
export declare const MouseContextProvider: React.FC<MouseProviderProps>;
export declare const useMouseContext: () => MouseContextType;
export default MouseContextProvider;
//# sourceMappingURL=MouseContext.d.ts.map