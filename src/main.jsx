import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import App from './App';
import { initServiceWorker } from './utils/serviceWorkerUtils';
import { initNetworkListeners } from './utils/networkUtils';
import './index.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize viewport height for mobile browsers
const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Update viewport height on resize and orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
setVH();

// Initialize smooth scrolling
const initSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 70 // Account for navbar height
          },
          ease: 'power3.inOut'
        });
      }
    });
  });
};

// Initialize PWA features
const initPWA = async () => {
  if (import.meta.env.DEV) {
    console.debug('PWA features disabled in development mode');
    return;
  }

  try {
    // Initialize service worker
    await initServiceWorker();
    // Initialize network status listeners
    initNetworkListeners();
  } catch (error) {
    console.debug('PWA initialization error:', error);
  }
};

// Initialize the application
const init = async () => {
  // Start React app immediately
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  // Initialize smooth scrolling after the app mounts
  window.addEventListener('load', initSmoothScroll);

  // Initialize PWA features
  await initPWA();
};

// Start the application
init().catch(error => {
  console.error('Application initialization error:', error);
});
