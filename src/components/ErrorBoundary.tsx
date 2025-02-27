import { Component, ErrorInfo, ReactNode } from 'react';
import { useMouseContext } from '../context/MouseContext';
import './styles/ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12" y2="16" />
              </svg>
            </div>

            <div className="error-message">
              <h1>Oops! Something went wrong</h1>
              <p>
                We apologize for the inconvenience. Please try refreshing the page
                or contact support if the problem persists.
              </p>
            </div>

            {this.state.error && (
              <div className="error-details">
                <h2>Error Details</h2>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo && (
                  <pre>{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            )}

            <div className="error-actions">
              <button
                onClick={() => window.location.reload()}
                className="reload-button"
              >
                Reload Page
              </button>
              <a
                href="mailto:support@example.com"
                className="report-button"
              >
                Report Problem
              </a>
            </div>
          </div>

          <div className="error-background">
            <div className="gradient-sphere"></div>
            <div className="pattern-grid"></div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks with class component
const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const { cursorChangeHandler } = useMouseContext();

  return (
    <ErrorBoundaryClass>
      <div
        onMouseEnter={() => cursorChangeHandler('default')}
        onMouseLeave={() => cursorChangeHandler('')}
      >
        {children}
      </div>
    </ErrorBoundaryClass>
  );
};

export default ErrorBoundary;
