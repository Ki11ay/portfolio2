import React from 'react';
import { render, screen } from '@testing-library/react';
import { PWAStatusIndicator } from '../PWAStatusIndicator';
import { usePWAStatus } from '../../context/PWAContext';
import type { ServiceWorkerState } from '../../types/pwa';
import '@testing-library/jest-dom';
import type { PWAStatusInfo } from '../../types/pwa';

// Mock the PWA context hook
jest.mock('../../context/PWAContext', () => ({
  usePWAStatus: jest.fn()
}));

describe('PWAStatusIndicator', () => {
  const mockUsePWAStatus = usePWAStatus as jest.Mock<PWAStatusInfo>;

  const defaultStatus: PWAStatusInfo = {
    isOffline: false,
    isPWAInstalled: false,
    hasUpdate: false,
    hasServiceWorker: false,
    serviceWorkerState: null,
    isInstallable: false
  };

  beforeEach(() => {
    mockUsePWAStatus.mockReturnValue(defaultStatus);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when no status to show', () => {
    render(<PWAStatusIndicator />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should show offline status when offline', () => {
    mockUsePWAStatus.mockReturnValue({
      ...defaultStatus,
      isOffline: true
    });

    render(<PWAStatusIndicator offlineText="You are offline" />);
    expect(screen.getByText('You are offline')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('warning');
  });

  it('should show installed status when installed', () => {
    mockUsePWAStatus.mockReturnValue({
      ...defaultStatus,
      isPWAInstalled: true,
      hasServiceWorker: true,
      serviceWorkerState: 'activated'
    });

    render(<PWAStatusIndicator installedText="App installed" />);
    expect(screen.getByText('App installed')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('success');
  });

  it('should show update status when update available', () => {
    mockUsePWAStatus.mockReturnValue({
      ...defaultStatus,
      isPWAInstalled: true,
      hasUpdate: true,
      hasServiceWorker: true,
      serviceWorkerState: 'activated'
    });

    render(<PWAStatusIndicator updatesAvailableText="Update ready" />);
    expect(screen.getByText('Update ready')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('info');
  });

  it('should show service worker status when available', () => {
    mockUsePWAStatus.mockReturnValue({
      ...defaultStatus,
      hasServiceWorker: true,
      serviceWorkerState: 'installing'
    });

    render(<PWAStatusIndicator showServiceWorkerStatus />);
    expect(screen.getByText('SW: installing')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('info');
  });

  it('should not show text in compact mode', () => {
    mockUsePWAStatus.mockReturnValue({
      ...defaultStatus,
      isOffline: true,
      isPWAInstalled: true,
      hasServiceWorker: true,
      serviceWorkerState: 'activated'
    });

    render(<PWAStatusIndicator compact />);
    expect(screen.queryByText('Offline')).not.toBeInTheDocument();
    expect(screen.queryByText('Installed')).not.toBeInTheDocument();
    expect(screen.getAllByRole('status')).toHaveLength(2);
  });

  it('should apply custom className', () => {
    mockUsePWAStatus.mockReturnValue({
      ...defaultStatus,
      isOffline: true
    });

    render(<PWAStatusIndicator className="custom-class" />);
    expect(screen.getByRole('status').parentElement).toHaveClass('custom-class');
  });

  it('should handle multiple statuses', () => {
    mockUsePWAStatus.mockReturnValue({
      ...defaultStatus,
      isOffline: true,
      isPWAInstalled: true,
      hasUpdate: true,
      hasServiceWorker: true,
      serviceWorkerState: 'activated'
    });

    render(<PWAStatusIndicator />);
    expect(screen.getAllByRole('status')).toHaveLength(4);
  });

  it('should respect show flags', () => {
    mockUsePWAStatus.mockReturnValue({
      ...defaultStatus,
      isOffline: true,
      isPWAInstalled: true,
      hasUpdate: true,
      hasServiceWorker: true,
      serviceWorkerState: 'activated'
    });

    render(
      <PWAStatusIndicator
        showOffline={false}
        showInstallStatus={false}
        showUpdateStatus={false}
        showServiceWorkerStatus={false}
      />
    );
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should show correct service worker status types', () => {
    const states: ServiceWorkerState[] = [
      'installing',
      'installed',
      'activating',
      'activated',
      'redundant'
    ];

    states.forEach(state => {
      mockUsePWAStatus.mockReturnValue({
        ...defaultStatus,
        hasServiceWorker: true,
        serviceWorkerState: state
      });

      const { unmount } = render(
        <PWAStatusIndicator showServiceWorkerStatus />
      );

      expect(screen.getByRole('status')).toHaveClass(
        state === 'activated' ? 'success' :
        state === 'redundant' ? 'error' : 'info'
      );

      unmount();
    });
  });
});
