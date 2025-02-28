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
export declare function PWAStatusIndicator({ className, showOffline, showInstallStatus, showUpdateStatus, showServiceWorkerStatus, offlineText, installedText, updatesAvailableText, compact }: PWAStatusIndicatorProps): JSX.Element | null;
export default PWAStatusIndicator;
//# sourceMappingURL=PWAStatusIndicator.d.ts.map