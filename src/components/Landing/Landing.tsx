import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './styles/Landing.css';

gsap.registerPlugin(ScrollTrigger);

const Landing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    // Initial animation for content
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      contentRef.current.children,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8
      }
    );

    // Scroll-based animations
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        if (!contentRef.current) return;
        
        gsap.to(contentRef.current, {
          opacity: 1 - self.progress * 1.5,
          y: self.progress * 50,
          duration: 0
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="landing" ref={containerRef}>
      <div className="landing-content" ref={contentRef}>
        <p className="greeting">Hi there! I'm</p>
        <h1 className="name">
          <span className="first-name">Mohamed</span>
          <span className="last-name">Abubaker</span>
        </h1>
        <p className="intro">
          I'm a <span className="highlight">Software Engineer</span> specializing in
          robotics, embedded systems, and full-stack mobile development
        </p>

        <div className="cta-container">
          <a
            href="/myCV.pdf"
            className="cta-button primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
            <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="cta-button secondary">
            Get in Touch
            <span className="button-icon">→</span>
          </a>
        </div>

        <div className="social-links">
          {[
            { name: 'GitHub', url: 'https://github.com/mhmdbhsk' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohamed-abubaker-4b7b1b1a2/' },
            { name: 'Email', url: 'mailto:mohammedaliedriis@gmail.com' }
          ].map(social => (
            <a
              key={social.name}
              href={social.url}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{social.name}</span>
              <span className="link-arrow">→</span>
            </a>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>

      <div className="landing-background">
        <div className="gradient-sphere"></div>
        <div className="code-pattern"></div>
        <div className="grid-overlay"></div>
      </div>
    </section>
  );
};

export default Landing;