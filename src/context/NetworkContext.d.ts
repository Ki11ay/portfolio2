import React from 'react';
import type { NetworkContextType } from '../types/network';
export declare const useNetwork: () => NetworkContextType;
export declare const NetworkProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useIsOffline: () => boolean;
export declare const useIsSlowConnection: () => boolean;
export declare const useConnectionQuality: () => "unknown" | "high" | "medium" | "low" | "very-low";
export declare const useReducedData: () => boolean;
//# sourceMappingURL=NetworkContext.d.ts.map