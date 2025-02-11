import { lazy, Suspense, useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import UpdateNotification from './components/UpdateNotification';
import OfflineIndicator from './components/OfflineIndicator';
import Loading from './components/Loading';
import { initNetworkListeners, initOfflineSupport } from './utils/networkUtils';
import './App.css';

// Lazy load main content
const MainContainer = lazy(() => import('./components/MainContainer'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize app features
    const initApp = async () => {
      try {
        await initOfflineSupport();
        initNetworkListeners();
        
        // Simulate minimum loading time for smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.warn('Failed to initialize some features:', error);
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  return (
    <ErrorBoundary>
      <div className="app-container">
        <OfflineIndicator />
        {isLoading ? (
          <Loading setIsLoading={setIsLoading} />
        ) : (
          <Suspense fallback={<Loading />}>
            <div className="content-container loaded">
              <MainContainer />
            </div>
          </Suspense>
        )}
        <UpdateNotification />
      </div>
    </ErrorBoundary>
  );
}

export default App;
