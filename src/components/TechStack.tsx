import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMouseContext } from '../context/MouseContext';
import './styles/TechStack.css';

interface Technology {
  name: string;
  icon: string;
  category: string;
  proficiency: number;
}

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cursorChangeHandler } = useMouseContext();

  const technologies: Technology[] = [
    // Programming Languages
    { name: 'Python', icon: '🐍', category: 'Programming', proficiency: 95 },
    { name: 'C', icon: '⚡', category: 'Programming', proficiency: 90 },
    { name: 'Dart', icon: '🎯', category: 'Programming', proficiency: 90 },
    { name: 'SQL', icon: '📊', category: 'Programming', proficiency: 85 },

    // Frameworks & Technologies
    { name: 'Flutter', icon: '📱', category: 'Frameworks', proficiency: 95 },
    { name: 'TensorFlow', icon: '🧠', category: 'Frameworks', proficiency: 90 },
    { name: 'Docker', icon: '🐳', category: 'Frameworks', proficiency: 85 },
    { name: 'Firebase', icon: '🔥', category: 'Frameworks', proficiency: 90 },
    { name: 'Computer Vision', icon: '👁️', category: 'Frameworks', proficiency: 85 },

    // Hardware & IoT
    { name: 'Arduino', icon: '🤖', category: 'Hardware', proficiency: 90 },
    { name: 'PLCs', icon: '🔌', category: 'Hardware', proficiency: 85 },
    { name: 'RaspberryPi', icon: '🫐', category: 'Hardware', proficiency: 90 },
    { name: 'IoT', icon: '📡', category: 'Hardware', proficiency: 85 },
    { name: 'Sensors', icon: '🎯', category: 'Hardware', proficiency: 90 },

    // Tools & Others
    { name: 'MATLAB Simulink', icon: '📈', category: 'Tools', proficiency: 85 },
    { name: 'Git', icon: '📦', category: 'Tools', proficiency: 90 },
    { name: 'Colab', icon: '🔬', category: 'Tools', proficiency: 85 },
    { name: 'GitHub', icon: '🐱', category: 'Tools', proficiency: 90 },
    { name: 'ESP32', icon: '💻', category: 'Tools', proficiency: 85 }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
      '.tech-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      '.tech-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const categories = [...new Set(technologies.map(tech => tech.category))];

  return (
    <div className="tech-stack" ref={containerRef}>
      <div className="content-container">
        <div className="tech-header">
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle">
            Technologies and tools I specialize in
          </p>
        </div>

        <div className="tech-categories">
          {categories.map(category => (
            <div key={category} className="tech-category">
              <h3 className="category-title">{category}</h3>
              <div className="tech-grid">
                {technologies
                  .filter(tech => tech.category === category)
                  .map((tech, index) => (
                    <div
                      key={index}
                      className="tech-card"
                      onMouseEnter={() => cursorChangeHandler('hover')}
                      onMouseLeave={() => cursorChangeHandler('')}
                    >
                      <div className="tech-icon">{tech.icon}</div>
                      <div className="tech-info">
                        <h4 className="tech-name">{tech.name}</h4>
                        <div className="proficiency-bar">
                          <div
                            className="proficiency-fill"
                            style={{ width: `${tech.proficiency}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="languages-section">
          <h3>Languages</h3>
          <div className="language-items">
            <div className="language-item">
              <span className="language-name">Arabic</span>
              <span className="language-level">Native</span>
            </div>
            <div className="language-item">
              <span className="language-name">English</span>
              <span className="language-level">Professional</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tech-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </div>
  );
};

export default TechStack;
