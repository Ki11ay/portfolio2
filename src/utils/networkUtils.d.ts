import type { NetworkInformation, ConnectionState, NetworkMonitorOptions, NetworkQuality } from '../types/network';
import { ConnectionType, ConnectionSpeed } from '../types/network';
export declare const isNetworkInformation: (value: unknown) => value is NetworkInformation;
export declare const getCurrentConnection: () => NetworkInformation | null;
export declare const isOnline: () => boolean;
export declare const hasInternetConnection: () => Promise<boolean>;
export declare const getConnectionState: () => ConnectionState;
export declare const monitorNetworkStatus: ({ checkInterval, onStatusChange, onConnect, onDisconnect }?: NetworkMonitorOptions) => () => void;
export declare const waitForOnline: () => Promise<void>;
export declare const getNetworkQuality: () => NetworkQuality;
export { ConnectionType, ConnectionSpeed };
//# sourceMappingURL=networkUtils.d.ts.map