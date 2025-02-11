import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import App from './App';
import { initServiceWorker } from './utils/serviceWorkerUtils';
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

// Handle PWA installation prompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 76+ from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  window.deferredPrompt = e;
});

// Initialize the application
const init = async () => {
  // Initialize service worker for PWA support
  await initServiceWorker();

  // Create React root and render app
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Initialize smooth scrolling after the app mounts
  window.addEventListener('load', initSmoothScroll);
};

// Start the application
init().catch(error => {
  console.error('Failed to initialize application:', error);
  // Render app even if service worker fails
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
