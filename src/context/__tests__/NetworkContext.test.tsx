import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NetworkProvider, useNetwork } from '../NetworkContext';
import { setupPWAEnvironment, cleanupPWAEnvironment, mockNetworkStatus } from '../../test/utils/pwaTestUtils';
import type { NetworkInformation, NetworkType, EffectiveConnectionType } from '../../types/network';

// Test component that uses network context
const TestComponent: React.FC = () => {
  const { isOnline, networkType, effectiveType } = useNetwork();
  return (
    <div>
      <div data-testid="online-status">
        {isOnline ? 'Online' : 'Offline'}
      </div>
      <div data-testid="network-type">{networkType}</div>
      <div data-testid="effective-type">{effectiveType}</div>
    </div>
  );
};

// Mock connection interface
interface MockConnection extends NetworkInformation {
  type: NetworkType;
  effectiveType: EffectiveConnectionType;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
}

describe('NetworkContext', () => {
  beforeEach(() => {
    setupPWAEnvironment();
  });

  afterEach(() => {
    cleanupPWAEnvironment();
    jest.clearAllMocks();
  });

  const createMockConnection = (): MockConnection => ({
    type: 'wifi',
    effectiveType: '4g',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    onchange: null,
    downlinkMax: 10,
    downlink: 5,
    rtt: 50,
    saveData: false
  });

  it('provides correct initial online status', () => {
    mockNetworkStatus(true);

    render(
      <NetworkProvider>
        <TestComponent />
      </NetworkProvider>
    );

    expect(screen.getByTestId('online-status')).toHaveTextContent('Online');
  });

  it('updates online status when network changes', () => {
    mockNetworkStatus(true);

    render(
      <NetworkProvider>
        <TestComponent />
      </NetworkProvider>
    );

    expect(screen.getByTestId('online-status')).toHaveTextContent('Online');

    // Simulate going offline
    act(() => {
      mockNetworkStatus(false);
      window.dispatchEvent(new Event('offline'));
    });

    expect(screen.getByTestId('online-status')).toHaveTextContent('Offline');

    // Simulate coming back online
    act(() => {
      mockNetworkStatus(true);
      window.dispatchEvent(new Event('online'));
    });

    expect(screen.getByTestId('online-status')).toHaveTextContent('Online');
  });

  it('provides network connection information when available', () => {
    const connection = createMockConnection();

    Object.defineProperty(navigator, 'connection', {
      value: connection,
      configurable: true,
    });

    render(
      <NetworkProvider>
        <TestComponent />
      </NetworkProvider>
    );

    expect(screen.getByTestId('network-type')).toHaveTextContent('wifi');
    expect(screen.getByTestId('effective-type')).toHaveTextContent('4g');
  });

  it('handles connection change events', () => {
    const connection = createMockConnection();

    Object.defineProperty(navigator, 'connection', {
      value: connection,
      configurable: true,
    });

    render(
      <NetworkProvider>
        <TestComponent />
      </NetworkProvider>
    );

    // Initial state
    expect(screen.getByTestId('network-type')).toHaveTextContent('wifi');

    // Simulate connection type change
    act(() => {
      connection.type = 'cellular';
      connection.effectiveType = '3g';
      const event = new Event('change');
      const changeHandler = connection.addEventListener.mock.calls.find(
        ([type]) => type === 'change'
      )?.[1];
      changeHandler?.(event);
    });

    expect(screen.getByTestId('network-type')).toHaveTextContent('cellular');
    expect(screen.getByTestId('effective-type')).toHaveTextContent('3g');
  });

  it('cleans up event listeners on unmount', () => {
    const connection = createMockConnection();

    Object.defineProperty(navigator, 'connection', {
      value: connection,
      configurable: true,
    });

    const { unmount } = render(
      <NetworkProvider>
        <TestComponent />
      </NetworkProvider>
    );

    unmount();

    expect(connection.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('handles missing connection API gracefully', () => {
    Object.defineProperty(navigator, 'connection', {
      value: undefined,
      configurable: true,
    });

    render(
      <NetworkProvider>
        <TestComponent />
      </NetworkProvider>
    );

    expect(screen.getByTestId('network-type')).toHaveTextContent('unknown');
    expect(screen.getByTestId('effective-type')).toHaveTextContent('unknown');
  });

  it('updates effective connection type', () => {
    const connection = createMockConnection();

    Object.defineProperty(navigator, 'connection', {
      value: connection,
      configurable: true,
    });

    render(
      <NetworkProvider>
        <TestComponent />
      </NetworkProvider>
    );

    expect(screen.getByTestId('effective-type')).toHaveTextContent('4g');

    // Simulate connection quality change
    act(() => {
      connection.effectiveType = '3g';
      const event = new Event('change');
      const changeHandler = connection.addEventListener.mock.calls.find(
        ([type]) => type === 'change'
      )?.[1];
      changeHandler?.(event);
    });

    expect(screen.getByTestId('effective-type')).toHaveTextContent('3g');
  });

  it('handles slow connection detection', () => {
    const connection = createMockConnection();
    connection.effectiveType = 'slow-2g';

    Object.defineProperty(navigator, 'connection', {
      value: connection,
      configurable: true,
    });

    render(
      <NetworkProvider>
        <TestComponent />
      </NetworkProvider>
    );

    expect(screen.getByTestId('effective-type')).toHaveTextContent('slow-2g');
  });
});
