import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMouseContext } from '../context/MouseContext';
import './styles/About.css';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cursorChangeHandler } = useMouseContext();

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(
      '.about-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="about" ref={containerRef}>
      <div className="content-container">
        <div className="about-content">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
          <div className="about-text">
            <p>
              Hello! I'm Mohamed, a passionate software engineer and robotics enthusiast.
              I specialize in creating intuitive and performant web applications while
              exploring the fascinating world of robotics and automation.
            </p>
            <p>
              With a strong foundation in both frontend and backend development,
              I enjoy bringing ideas to life through clean code and creative solutions.
              My approach combines technical expertise with a keen eye for user experience.
            </p>
          </div>
          <div className="about-cta">
            <a
              href="/myCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="download-cv"
              onMouseEnter={() => cursorChangeHandler('hover')}
              onMouseLeave={() => cursorChangeHandler('')}
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
      <div className="about-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </section>
  );
};

export default About;
