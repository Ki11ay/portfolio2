import type { PWAContextType, PWAEventHandlers, PWAStatusInfo } from '../types/pwa';
export interface PWAHookOptions extends PWAEventHandlers {
    scope?: string;
    workerPath?: string;
}
export declare function usePWA(options?: PWAHookOptions): PWAContextType & PWAStatusInfo;
export default usePWA;
//# sourceMappingURL=usePWA.d.ts.map