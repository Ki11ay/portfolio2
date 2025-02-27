import React, { useMemo } from 'react';
import { usePWAStatus } from '../context/PWAContext';
import './styles/PWAStatusIndicator.css';

interface PWAStatusIndicatorProps {
  className?: string;
  showOffline?: boolean;
  showInstallStatus?: boolean;
  showUpdateStatus?: boolean;
  showServiceWorkerStatus?: boolean;
  offlineText?: string;
  installedText?: string;
  updatesAvailableText?: string;
  compact?: boolean;
}

export function PWAStatusIndicator({
  className = '',
  showOffline = true,
  showInstallStatus = true,
  showUpdateStatus = true,
  showServiceWorkerStatus = true,
  offlineText = 'Offline',
  installedText = 'Installed',
  updatesAvailableText = 'Update Available',
  compact = false
}: PWAStatusIndicatorProps): JSX.Element | null {
  const {
    isOffline,
    isPWAInstalled,
    hasUpdate,
    hasServiceWorker,
    serviceWorkerState
  } = usePWAStatus();

  const indicators = useMemo(() => {
    const items = [];

    if (showOffline && isOffline) {
      items.push({
        id: 'offline',
        text: offlineText,
        icon: '📡',
        status: 'warning'
      });
    }

    if (showInstallStatus && isPWAInstalled) {
      items.push({
        id: 'installed',
        text: installedText,
        icon: '📱',
        status: 'success'
      });
    }

    if (showUpdateStatus && hasUpdate) {
      items.push({
        id: 'update',
        text: updatesAvailableText,
        icon: '🔄',
        status: 'info'
      });
    }

    if (showServiceWorkerStatus && hasServiceWorker && serviceWorkerState) {
      items.push({
        id: 'service-worker',
        text: `SW: ${serviceWorkerState}`,
        icon: '⚙️',
        status: getServiceWorkerStatusType(serviceWorkerState)
      });
    }

    return items;
  }, [
    showOffline,
    showInstallStatus,
    showUpdateStatus,
    showServiceWorkerStatus,
    isOffline,
    isPWAInstalled,
    hasUpdate,
    hasServiceWorker,
    serviceWorkerState,
    offlineText,
    installedText,
    updatesAvailableText
  ]);

  if (indicators.length === 0) {
    return null;
  }

  return (
    <div className={`pwa-status ${className} ${compact ? 'compact' : ''}`}>
      {indicators.map(({ id, text, icon, status }) => (
        <div
          key={id}
          className={`pwa-status-indicator ${status}`}
          role="status"
          aria-label={text}
        >
          <span className="pwa-status-icon" aria-hidden="true">
            {icon}
          </span>
          {!compact && <span className="pwa-status-text">{text}</span>}
        </div>
      ))}
    </div>
  );
}

function getServiceWorkerStatusType(state: string): string {
  switch (state) {
    case 'activated':
      return 'success';
    case 'installing':
    case 'installed':
    case 'activating':
      return 'info';
    case 'redundant':
      return 'error';
    default:
      return 'default';
  }
}

export default PWAStatusIndicator;
