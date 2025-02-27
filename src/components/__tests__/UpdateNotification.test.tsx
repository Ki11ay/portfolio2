import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateNotification from '../UpdateNotification';
import { NetworkProvider } from '../../context/NetworkContext';
import { setupPWAEnvironment, cleanupPWAEnvironment, triggerPWAEvent } from '../../test/utils/pwaUtils';

describe('UpdateNotification Component', () => {
  beforeEach(() => {
    setupPWAEnvironment();
  });

  afterEach(() => {
    cleanupPWAEnvironment();
  });

  it('should not render when no update is available', () => {
    render(
      <NetworkProvider>
        <UpdateNotification />
      </NetworkProvider>
    );

    const notification = screen.queryByRole('alert');
    expect(notification).toBeNull();
  });

  it('should render when update is available', async () => {
    const { registration } = setupPWAEnvironment();
    
    render(
      <NetworkProvider>
        <UpdateNotification />
      </NetworkProvider>
    );

    // Simulate service worker update
    registration.waiting = registration.active;
    triggerPWAEvent('updateAvailable', { registration });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/update available/i)).toBeInTheDocument();
    });
  });

  it('should handle update button click', async () => {
    const { registration, serviceWorker } = setupPWAEnvironment();
    const postMessageSpy = jest.spyOn(serviceWorker, 'postMessage');

    render(
      <NetworkProvider>
        <UpdateNotification />
      </NetworkProvider>
    );

    // Simulate service worker update
    registration.waiting = serviceWorker;
    triggerPWAEvent('updateAvailable', { registration });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Click update button
    fireEvent.click(screen.getByRole('button', { name: /update application/i }));

    expect(postMessageSpy).toHaveBeenCalledWith({ type: 'SKIP_WAITING' });
  });

  it('should handle update reload', async () => {
    const { registration, serviceWorker } = setupPWAEnvironment();
    const reloadSpy = jest.spyOn(window.location, 'reload');

    render(
      <NetworkProvider>
        <UpdateNotification />
      </NetworkProvider>
    );

    // Simulate service worker update
    registration.waiting = serviceWorker;
    triggerPWAEvent('updateAvailable', { registration });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Click update button
    fireEvent.click(screen.getByRole('button', { name: /update application/i }));

    // Simulate controller change
    triggerPWAEvent('controllerchange');

    expect(reloadSpy).toHaveBeenCalled();
  });

  it('should apply custom styling', async () => {
    const { registration } = setupPWAEnvironment();
    const customClass = 'custom-update-notification';

    render(
      <NetworkProvider>
        <UpdateNotification className={customClass} />
      </NetworkProvider>
    );

    // Simulate service worker update
    registration.waiting = registration.active;
    triggerPWAEvent('updateAvailable', { registration });

    await waitFor(() => {
      const notification = screen.getByRole('alert');
      expect(notification.classList.contains(customClass)).toBe(true);
    });
  });

  it('should store current path before reload', async () => {
    const { registration, serviceWorker, localStorage } = setupPWAEnvironment();
    const testPath = '/test-path';
    const setItemSpy = jest.spyOn(localStorage, 'setItem');

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        pathname: testPath,
        reload: jest.fn()
      },
      configurable: true
    });

    render(
      <NetworkProvider>
        <UpdateNotification />
      </NetworkProvider>
    );

    // Simulate service worker update
    registration.waiting = serviceWorker;
    triggerPWAEvent('updateAvailable', { registration });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Click update button
    fireEvent.click(screen.getByRole('button', { name: /update application/i }));

    expect(setItemSpy).toHaveBeenCalledWith('pwa_update_path', testPath);
  });

  it('should handle dismissed updates', async () => {
    const { registration } = setupPWAEnvironment();
    
    render(
      <NetworkProvider>
        <UpdateNotification />
      </NetworkProvider>
    );

    // Simulate service worker update
    registration.waiting = registration.active;
    triggerPWAEvent('updateAvailable', { registration });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Click dismiss button
    fireEvent.click(screen.getByRole('button', { name: /dismiss update notification/i }));

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull();
    });
  });
});
