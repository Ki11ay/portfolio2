import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './styles/PreloadAssets.css';

const MINIMUM_LOADING_TIME = 1000; // 1 second minimum loading time
const ASSETS_TO_LOAD = [
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/screenshots/desktop.png',
  '/screenshots/mobile.png'
];

const PreloadAssets = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let loadedCount = 0;

    const finishLoading = () => {
      const timeElapsed = Date.now() - startTime;
      if (timeElapsed < MINIMUM_LOADING_TIME) {
        setTimeout(() => {
          setIsFading(true);
          setTimeout(onComplete, 500); // Match CSS transition
        }, MINIMUM_LOADING_TIME - timeElapsed);
      } else {
        setIsFading(true);
        setTimeout(onComplete, 500);
      }
    };

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / ASSETS_TO_LOAD.length) * 100);
      setProgress(newProgress);

      if (loadedCount === ASSETS_TO_LOAD.length) {
        finishLoading();
      }
    };

    // Preload images
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          updateProgress(); // Continue loading even if some assets fail
          resolve();
        };
        img.src = src;
      });
    };

    // Preload JSON files
    const preloadJSON = (src) => {
      return fetch(src)
        .then(() => updateProgress())
        .catch(() => {
          console.warn(`Failed to load JSON: ${src}`);
          updateProgress();
        });
    };

    // Start preloading all assets
    const preloadPromises = ASSETS_TO_LOAD.map(asset => {
      if (asset.endsWith('.json')) {
        return preloadJSON(asset);
      }
      return preloadImage(asset);
    });

    // Initialize loading animation
    gsap.to('.preloader-overlay', {
      opacity: 0.8,
      duration: 0.5,
      ease: 'power2.inOut'
    });

    // Handle completion
    Promise.all(preloadPromises)
      .catch(error => {
        console.error('Error preloading assets:', error);
        finishLoading(); // Continue loading the app even if some assets fail
      });

    // Cleanup
    return () => {
      gsap.killTweensOf('.preloader-overlay');
    };
  }, [onComplete]);

  return (
    <div className={`preloader ${isFading ? 'fade-out' : ''}`}>
      <div className="preloader-overlay" />
      <div className="preloader-content">
        <div className="preloader-spinner" />
        <div className="preloader-progress">
          <div 
            className="preloader-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="preloader-text">
          Loading assets... {progress}%
        </div>
      </div>
    </div>
  );
};

export default PreloadAssets;
