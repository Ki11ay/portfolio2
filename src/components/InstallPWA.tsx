import React from 'react';
import { useInstallPWA } from '../context/PWAContext';
import './styles/InstallPWA.css';

interface InstallPWAProps {
  className?: string;
  buttonText?: string;
  showOnlyIfInstallable?: boolean;
}

export function InstallPWA({
  className = '',
  buttonText = 'Install App',
  showOnlyIfInstallable = true
}: InstallPWAProps): JSX.Element | null {
  const { isInstallable, isPWAInstalled, installPWA } = useInstallPWA();

  // Don't show if already installed
  if (isPWAInstalled) {
    return null;
  }

  // Optionally hide if not installable
  if (showOnlyIfInstallable && !isInstallable) {
    return null;
  }

  return (
    <button
      className={`install-pwa-button ${className} ${isInstallable ? 'installable' : ''}`}
      onClick={installPWA}
      disabled={!isInstallable}
      aria-label={buttonText}
    >
      <span className="install-pwa-icon">📱</span>
      <span className="install-pwa-text">{buttonText}</span>
    </button>
  );
}

export default InstallPWA;
