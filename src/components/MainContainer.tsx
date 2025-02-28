import React, { useRef, useEffect, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../plugins/gsap-register';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useScrollAnimation from '../hooks/useScrollAnimation';
import Landing from './Landing';
import WhatIDo from './WhatIDo/WhatIDo';
import TechStack from './TechStack';
import Work from './Work/Work';
import Hobbies from './Hobbies/Hobbies';
import Contact from './Contact/Contact';
import Career from './Career';
import './styles/MainContainer.css';

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
  const { elementRef: visibilityRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  return (
    <section
      id={config.id}
      ref={visibilityRef}
      className={`section ${config.id}-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="content-container">
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
