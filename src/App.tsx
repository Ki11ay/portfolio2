import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NetworkProvider } from './context/NetworkContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/Loader/LoadingScreen';
import OfflineIndicator from './components/OfflineIndicator';
import UpdateNotification from './components/UpdateNotification';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';
import Navbar from './components/Navbar';
import MainContainer from './components/MainContainer';
import './App.css';

// Lazy load writings components
const WritingsPage = React.lazy(() => import('./pages/WritingsPage/WritingsPage'));
const WritingViewer = React.lazy(() => import('./components/Writings/WritingViewer'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <NetworkProvider>
        <Router>
          {/* Fixed elements outside of smooth scroll */}
          <Navbar />
          <OfflineIndicator />
          <UpdateNotification />
          
          {/* Main content with smooth scrolling */}
          <SmoothScroll>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/writings" element={<WritingsPage />} />
                <Route path="/writings/:id" element={<WritingViewer />} />
              </Routes>
            </Suspense>
          </SmoothScroll>
        </Router>
      </NetworkProvider>
    </ErrorBoundary>
  );
};

export default App;
