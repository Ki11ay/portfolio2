import type { PWAInstallPromptEvent } from '../../types/pwa';
import type { WorkboxEventMap } from '../../types/workbox-events';
import '../types/service-worker-mock';
export interface PWATestEnvironment {
    registration: MockServiceWorkerRegistration;
    serviceWorker: MockServiceWorker | null;
    isInstallable: boolean;
    isPWAInstalled: boolean;
    hasUpdate: boolean;
    hasServiceWorker: boolean;
    isOffline: boolean;
    clearMocks: () => void;
}
export declare function createMockWorkboxEvent<K extends keyof WorkboxEventMap>(type: K, serviceWorker?: MockServiceWorker, isUpdate?: boolean): WorkboxEventMap[K];
export declare function setupPWAEnvironment(options?: Partial<PWATestEnvironment>): PWATestEnvironment;
export declare function cleanupPWAEnvironment(): void;
export declare function simulateServiceWorkerUpdate(registration: MockServiceWorkerRegistration): Promise<void>;
export declare function simulateNetworkStatusChange(online: boolean): void;
export declare function simulatePWAInstall(accepted?: boolean): PWAInstallPromptEvent;
export declare function mockNetworkStatus(online: boolean): void;
//# sourceMappingURL=pwaTestUtils.d.ts.map