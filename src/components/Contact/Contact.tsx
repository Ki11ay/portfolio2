import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const contactLinks = [
    {
      name: 'Email',
      url: 'mailto:mohamed.abubakar@mail.ru',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohamed-abubaker-4b7b1b1a2/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Ki11ay',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial state for no-JS fallback
    container.style.opacity = '1';
    container.style.visibility = 'visible';

    // GSAP animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(
      container.querySelector('.contact-header'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    ).fromTo(
      container.querySelectorAll('.contact-link'),
      { 
        y: 30,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      },
      '-=0.2'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="contact" className="contact" ref={containerRef}>
      <div className="content-container">
        <div className="contact-header">
          <h2>Connect With Me</h2>
          <p className="section-description">Get in touch through these platforms</p>
        </div>

        <div className="contact-links">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target={link.name === 'Email' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="contact-link"
              title={`${link.name === 'Email' ? 'Send me an email' : `Visit my ${link.name} profile`}`}
            >
              <span className="contact-icon">{link.icon}</span>
              <span className="contact-name">{link.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="contact-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </section>
  );
};

export default Contact;