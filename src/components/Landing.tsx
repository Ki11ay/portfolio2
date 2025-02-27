import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './styles/Landing.css';

gsap.registerPlugin(ScrollTrigger);

const Landing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate text elements
    tl.fromTo(
      textRef.current.children,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15
      }
    );

    // Scroll-based animations
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100%',
      pin: false,
      scrub: 1,
      onUpdate: (self) => {
        if (!containerRef.current) return;
        
        // Fade out content based on scroll progress
        gsap.to(containerRef.current, {
          opacity: 1 - self.progress,
          y: self.progress * 100,
          duration: 0,
          ease: 'none'
        });
      }
    });

    return () => {
      tl.kill();
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="landing" ref={containerRef}>
      <div className="landing-content" ref={textRef}>
        <span className="greeting">Hi there! I'm</span>
        <h1 className="name">
          <span className="first-name">Mohamed</span>
          <span className="last-name">Abubaker</span>
        </h1>
        <p className="intro">
          I'm a <span className="highlight">Software Engineer</span> specializing in robotics, embedded systems, and full-stack mobile development
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
          <a
            href="#contact"
            className="cta-button secondary"
          >
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
              {social.name}
              <span className="link-arrow">→</span>
            </a>
          ))}
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
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
    </div>
  );
};

export default Landing;
