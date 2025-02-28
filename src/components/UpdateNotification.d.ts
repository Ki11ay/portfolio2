import './styles/UpdateNotification.css';
interface UpdateNotificationProps {
    className?: string;
    message?: string;
    updateButtonText?: string;
    dismissButtonText?: string;
    showDismiss?: boolean;
    autoShow?: boolean;
    autoHideDelay?: number;
}
export declare function UpdateNotification({ className, message, updateButtonText, dismissButtonText, showDismiss, autoShow, autoHideDelay }: UpdateNotificationProps): JSX.Element | null;
export default UpdateNotification;
//# sourceMappingURL=UpdateNotification.d.ts.map