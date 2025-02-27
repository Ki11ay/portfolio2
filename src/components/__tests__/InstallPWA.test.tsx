import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InstallPWA } from '../InstallPWA';
import { useInstallPWA } from '../../context/PWAContext';
import '@testing-library/jest-dom';

// Mock the PWA context hook
jest.mock('../../context/PWAContext', () => ({
  useInstallPWA: jest.fn()
}));

describe('InstallPWA', () => {
  const mockInstallPWA = jest.fn();
  const mockUseInstallPWA = useInstallPWA as jest.Mock;

  beforeEach(() => {
    mockUseInstallPWA.mockReturnValue({
      isInstallable: true,
      isPWAInstalled: false,
      installPWA: mockInstallPWA,
      deferredPrompt: {}
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render install button when installable', () => {
    render(<InstallPWA />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('installable');
    expect(button).not.toBeDisabled();
  });

  it('should not render when already installed', () => {
    mockUseInstallPWA.mockReturnValue({
      isInstallable: true,
      isPWAInstalled: true,
      installPWA: mockInstallPWA,
      deferredPrompt: {}
    });

    render(<InstallPWA />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should call installPWA when clicked', () => {
    render(<InstallPWA />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockInstallPWA).toHaveBeenCalledTimes(1);
  });

  it('should render custom button text', () => {
    const customText = 'Install Custom App';
    render(<InstallPWA buttonText={customText} />);
    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-class';
    render(<InstallPWA className={customClass} />);
    expect(screen.getByRole('button')).toHaveClass(customClass);
  });

  it('should be disabled when not installable', () => {
    mockUseInstallPWA.mockReturnValue({
      isInstallable: false,
      isPWAInstalled: false,
      installPWA: mockInstallPWA,
      deferredPrompt: null
    });

    render(<InstallPWA />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).not.toHaveClass('installable');
  });

  it('should hide button when not installable and showOnlyIfInstallable is true', () => {
    mockUseInstallPWA.mockReturnValue({
      isInstallable: false,
      isPWAInstalled: false,
      installPWA: mockInstallPWA,
      deferredPrompt: null
    });

    render(<InstallPWA showOnlyIfInstallable />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should show button when not installable and showOnlyIfInstallable is false', () => {
    mockUseInstallPWA.mockReturnValue({
      isInstallable: false,
      isPWAInstalled: false,
      installPWA: mockInstallPWA,
      deferredPrompt: null
    });

    render(<InstallPWA showOnlyIfInstallable={false} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have appropriate ARIA label', () => {
    const customText = 'Custom Install Text';
    render(<InstallPWA buttonText={customText} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', customText);
  });

  it('should render both icon and text', () => {
    render(<InstallPWA />);
    expect(screen.getByText('📱')).toBeInTheDocument();
    expect(screen.getByText('Install App')).toBeInTheDocument();
  });

  it('should handle PWA installation flow', async () => {
    const mockPrompt = jest.fn().mockResolvedValue(undefined);
    const mockDeferredPrompt = {
      prompt: mockPrompt,
      userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' })
    };

    mockUseInstallPWA.mockReturnValue({
      isInstallable: true,
      isPWAInstalled: false,
      installPWA: mockInstallPWA,
      deferredPrompt: mockDeferredPrompt
    });

    render(<InstallPWA />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockInstallPWA).toHaveBeenCalled();
  });
});
