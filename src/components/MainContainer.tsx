import React, { useRef, useEffect, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../plugins/gsap-register';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useScrollAnimation from '../hooks/useScrollAnimation';
import Landing from './Landing';
import WhatIDo from './WhatIDo/WhatIDo';
import TechStack from './TechStack';
import Work from './Work/Work';
import Hobbies from './Hobbies/Hobbies';
import Contact from './Contact/Contact';  // Updated import path
import './styles/MainContainer.css';
import Career from './Career';

interface SectionConfig {
  id: string;
  Component: React.ComponentType;
}

const sections: SectionConfig[] = [
  { id: 'home', Component: Landing },
  { id: 'what-i-do', Component: WhatIDo },
  { id: 'career', Component: Career },
  { id: 'work', Component: Work },
  { id: 'tech-stack', Component: TechStack },
  { id: 'hobbies', Component: Hobbies },
  { id: 'contact', Component: Contact }
];

const Section: React.FC<{ config: SectionConfig }> = ({ config }) => {
  const visibilityRef = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useScrollAnimation({
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    start: 'top center+=100',
    end: 'bottom center',
    onEnter: () => {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: true
        });
      }
    }
  });

  const setRefs = (element: HTMLElement | null) => {
    if (element) {
      if ('current' in visibilityRef) {
        (visibilityRef as { current: HTMLElement | null }).current = element;
      }
      if ('current' in animationRef) {
        (animationRef as { current: HTMLElement | null }).current = element;
      }
    }
  };

  return (
    <section
      id={config.id}
      ref={setRefs}
      className={`section ${config.id}-section ${visibilityRef.isVisible ? 'visible' : ''}`}
    >
      <div
        ref={contentRef}
        className="content-container"
        style={{ opacity: 1 }}  // Ensure content is visible
      >
        <config.Component />
      </div>
    </section>
  );
};

const MainContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const updateScrollProgress = useCallback(() => {
    if (!progressRef.current) return;

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min((window.scrollY / totalHeight) * 100, 100));

    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.1,
      ease: 'none',
      overwrite: true
    });
  }, []);

  useEffect(() => {
    ScrollTrigger.addEventListener('refresh', updateScrollProgress);
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      ScrollTrigger.removeEventListener('refresh', updateScrollProgress);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  return (
    <main className="main-container" ref={containerRef}>
      <div className="background-pattern"></div>
      
      {sections.map(section => (
        <Section key={section.id} config={section} />
      ))}

      <div className="scroll-progress">
        <div className="progress-bar" ref={progressRef}></div>
      </div>
    </main>
  );
};

export default MainContainer;
