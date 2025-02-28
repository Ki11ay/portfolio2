import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './styles/Hobbies.css';

gsap.registerPlugin(ScrollTrigger);

interface Hobby {
  title: string;
  description: string;
  icon: string;
  link?: string;
}

const Hobbies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const hobbies: Hobby[] = [
    {
      title: 'Robotics',
      description: 'Building and programming robots, exploring automation and AI integration',
      icon: '🤖'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Developing AI models and exploring machine learning algorithms',
      icon: '🧠'
    },
    {
      title: 'Writings',
      description: 'Sharing thoughts and experiences about technology and development',
      icon: '✍️',
      link: '/writings'
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
      '.hobbies-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Animate hobby cards
    const cards = cardsRef.current.querySelectorAll('.hobby-card');
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
    <div className="hobbies" ref={containerRef}>
      <div className="content-container">
        <div className="hobbies-header">
          <h2 className="section-title">Hobbies</h2>
          <p className="section-subtitle">What I do in my free time</p>
        </div>

        <div className="hobbies-grid" ref={cardsRef}>
          {hobbies.map((hobby, index) => (
            hobby.link ? (
              <Link to={hobby.link} key={index} className="hobby-card-link">
                <div className="hobby-card">
                  <div className="hobby-icon">{hobby.icon}</div>
                  <h3 className="hobby-title">{hobby.title}</h3>
                  <p className="hobby-description">{hobby.description}</p>
                </div>
              </Link>
            ) : (
              <div key={index} className="hobby-card">
                <div className="hobby-icon">{hobby.icon}</div>
                <h3 className="hobby-title">{hobby.title}</h3>
                <p className="hobby-description">{hobby.description}</p>
              </div>
            )
          ))}
        </div>
      </div>

      <div className="hobbies-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </div>
  );
};

export default Hobbies;
