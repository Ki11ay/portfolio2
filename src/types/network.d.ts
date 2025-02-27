export interface NetworkInformation {
  readonly downlink: number;
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
  onchange: ((this: NetworkInformation, ev: Event) => any) | null;
}

declare global {
  interface Navigator {
    readonly connection?: NetworkInformation;
    readonly mozConnection?: NetworkInformation;
    readonly webkitConnection?: NetworkInformation;
  }
}

export type ConnectionTypeValues = 
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'none'
  | 'wifi'
  | 'wimax'
  | 'other'
  | 'unknown';

export type ConnectionSpeedValues = 
  | 'slow-2g'
  | '2g'
  | '3g'
  | '4g'
  | 'unknown';

export interface ConnectionState {
  online: boolean;
  effectiveType: ConnectionSpeedValues;
  downlink: number;
  rtt: number;
  saveData: boolean;
  type: ConnectionTypeValues;
}

export interface NetworkStatusEvent extends Event {
  readonly connectionState: ConnectionState;
}

export type NetworkStatusHandler = (state: ConnectionState) => void;

export interface NetworkMonitorOptions {
  checkInterval?: number;
  onStatusChange?: NetworkStatusHandler;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export type NetworkQuality = 'poor' | 'fair' | 'good' | 'excellent' | 'unknown';
