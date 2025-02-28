import React from 'react';
interface ScrollContextType {
    scrollTo: (target: string | number | HTMLElement) => void;
}
export declare const useScroll: () => ScrollContextType;
interface ScrollProviderProps {
    children: React.ReactNode;
}
export declare const ScrollProvider: React.FC<ScrollProviderProps>;
export default ScrollProvider;
//# sourceMappingURL=ScrollProvider.d.ts.map