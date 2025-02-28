import React from 'react';
import type { PWAContextType, PWAEventHandlers, PWAInstallPromptEvent, ServiceWorkerState, PWAStatusInfo } from '../types/pwa';
interface ExtendedPWAContextType extends Omit<PWAContextType, 'serviceWorkerState'> {
    serviceWorkerState: ServiceWorkerState | null;
}
export declare const PWAContext: React.Context<ExtendedPWAContextType>;
export declare function usePWAStatus(): PWAStatusInfo;
export declare function useInstallPWA(): {
    isInstallable: boolean;
    isPWAInstalled: boolean;
    installPWA: () => Promise<void>;
    deferredPrompt: PWAInstallPromptEvent | null;
};
export declare function useUpdatePWA(): {
    hasUpdate: boolean;
    updateServiceWorker: () => void;
};
interface PWAProviderProps extends PWAEventHandlers {
    children: React.ReactNode;
    workerPath?: string;
    scope?: string;
}
export declare function PWAProvider({ children, workerPath, scope, onUpdate, onSuccess, onError, onInstall }: PWAProviderProps): JSX.Element;
export {};
//# sourceMappingURL=PWAContext.d.ts.map