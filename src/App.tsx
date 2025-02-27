import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NetworkProvider } from './context/NetworkContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/Loader/LoadingScreen';
import OfflineIndicator from './components/OfflineIndicator';
import UpdateNotification from './components/UpdateNotification';
import MainContainer from './components/MainContainer';
const WritingsPage = React.lazy(() => import('./pages/WritingsPage'));
import './App.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <NetworkProvider>
        <Router>
          <div className="app">
            <OfflineIndicator />
            <UpdateNotification />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/writings" element={<WritingsPage />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </NetworkProvider>
    </ErrorBoundary>
  );
};

export default App;
