import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './styles/WhatIDo.css';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  description: string;
  icon: string;
  skills: string[];
  color: string;
}

const WhatIDo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      title: 'Software Engineering',
      description: 'Specializing in robotics and embedded systems development.',
      icon: '🤖',
      skills: ['TypeScript', 'React', 'Python', 'C/C++', 'ROS'],
      color: '#0984e3'
    },
    {
      title: 'Mobile Development',
      description: 'Building cross-platform mobile applications.',
      icon: '📱',
      skills: ['Flutter', 'SQLite', 'Firebase', 'REST APIs', 'GraphQL'],
      color: '#00b894'
    },
    {
      title: 'Backend Development',
      description: 'Creating robust server-side solutions.',
      icon: '⚙️',
      skills: ['Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
      color: '#e84393'
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate header
    tl.fromTo(
      '.whatido-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Animate service cards
    const cards = cardsRef.current.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
      tl.fromTo(
        card,
        {
          y: 30,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out'
        },
        `-=0.4`
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="whatido" ref={containerRef}>
      <div className="content-container">
        <div className="whatido-header">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">
            Bringing innovation to software development
          </p>
        </div>

        <div className="services-grid" ref={cardsRef}>
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              style={{ '--card-color': service.color } as React.CSSProperties}
            >
              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-skills">
                  {service.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-border">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,0 L100,0 L100,100 L0,100 L0,0" className="border-path" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="whatido-background">
        <div className="gradient-sphere"></div>
        <div className="pattern-grid"></div>
      </div>
    </section>
  );
};

export default WhatIDo;
