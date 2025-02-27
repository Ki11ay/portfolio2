import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SVGBorder from './components/SVGBorder';
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
  const servicesRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      title: 'Software Engineering',
      description: 'Specializing in robotics and embedded systems development, optimizing control systems and implementing real-time solutions.',
      icon: '🤖',
      skills: ['Python', 'C', 'ROS', 'Computer Vision', 'MATLAB Simulink'],
      color: '#0984e3'
    },
    {
      title: 'Mobile Development',
      description: 'Building cross-platform mobile applications with a focus on performance and user experience.',
      icon: '📱',
      skills: ['Flutter', 'Firebase', 'Dart', 'Mobile UI/UX', 'REST APIs'],
      color: '#00b894'
    },
    {
      title: 'Robotics & Embedded Systems',
      description: 'Developing control systems, implementing sensor integration, and creating 3D environmental mapping solutions.',
      icon: '⚙️',
      skills: ['Arduino', 'PLCs', 'RaspberryPi', 'TensorFlow', 'Docker'],
      color: '#e84393'
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !servicesRef.current) return;

    // Header animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center+=100',
        end: 'center center',
        toggleActions: 'play none none reverse'
      }
    });

    headerTl
      .fromTo(
        '.whatido-header',
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );

    // Services cards animation
    const cards = servicesRef.current.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });

      cardTl
        .fromTo(
          card,
          {
            y: 50,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15
          }
        )
        .fromTo(
          card.querySelectorAll('.skill-tag'),
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.out'
          },
          '-=0.4'
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="whatido" ref={containerRef}>
      <div className="content-container whatido-content">
        <div className="whatido-header">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">
            Bringing innovation to robotics and software development
          </p>
        </div>

        <div className="services-grid" ref={servicesRef}>
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              style={{ '--card-color': service.color } as React.CSSProperties}
            >
              <SVGBorder pathColor={service.color} strokeWidth={2} />
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
          ))}
        </div>
      </div>

      <div className="whatido-background">
        <div className="gradient-sphere"></div>
        <div className="pattern-grid"></div>
      </div>
    </div>
  );
};

export default WhatIDo;
