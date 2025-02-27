import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { WritingViewerProps } from '../../types/writings';
import '../styles/WritingViewer.css';

const WritingViewer: React.FC<WritingViewerProps> = ({
  title,
  content,
  date,
  readTime,
  onClose
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const contentContainer = contentRef.current;
    if (!overlay || !contentContainer) return;

    // Animation timeline
    const tl = gsap.timeline();
    
    // Animate overlay
    tl.fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Animate content
    tl.fromTo(contentContainer,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    );

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="writing-viewer-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="writing-title"
    >
      <div ref={contentRef} className="writing-viewer-content">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close writing viewer"
        >
          ×
        </button>
        
        <article className="writing-article">
          <header className="writing-header">
            <h2 id="writing-title">{title}</h2>
            <div className="writing-meta">
              <span className="writing-date">{date}</span>
              <span className="writing-readtime">{readTime}</span>
            </div>
          </header>

          <div className="writing-content">
            {content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="writing-paragraph">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default WritingViewer;
