import React from 'react';
import { FaPython, FaReact, FaDocker, FaGithub } from 'react-icons/fa';
import { SiTensorflow, SiArduino, SiFirebase, SiFlutter } from 'react-icons/si';
import './styles/TechStack.css';

const TechStack = () => {
  const technologies = [
    { name: 'Python', icon: <FaPython />, category: 'Language' },
    { name: 'TensorFlow', icon: <SiTensorflow />, category: 'AI/ML' },
    { name: 'Flutter', icon: <SiFlutter />, category: 'Mobile' },
    { name: 'Firebase', icon: <SiFirebase />, category: 'Backend' },
    { name: 'Docker', icon: <FaDocker />, category: 'DevOps' },
    { name: 'Arduino', icon: <SiArduino />, category: 'Embedded' },
    { name: 'Git', icon: <FaGithub />, category: 'Version Control' },
    { name: 'React', icon: <FaReact />, category: 'Frontend' }
  ];

  return (
    <section className="tech-stack-section section-container" id="tech">
      <div className="tech-stack-container">
        <h2>Tech Stack</h2>
        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <div key={index} className="tech-item">
              <div className="tech-icon">{tech.icon}</div>
              <h3>{tech.name}</h3>
              <p>{tech.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
