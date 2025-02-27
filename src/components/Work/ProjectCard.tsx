import React, { useState } from 'react';
import { gsap } from 'gsap';
import './styles/ProjectCard.css';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  improvements: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  image,
  features,
  improvements,
  liveUrl,
  githubUrl
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    
    if (!isExpanded) {
      gsap.to(`.project-details-${title.replace(/\s+/g, '-')}`, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(`.project-details-${title.replace(/\s+/g, '-')}`, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  };

  return (
    <div className={`project-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="project-preview" onClick={handleExpand}>
        <div className="project-image">
          <img src={image} alt={title} loading="lazy" />
          <div className="project-overlay">
            <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
          </div>
        </div>
        
        <div className="project-summary">
          <h3 className="project-title">{title}</h3>
          <p className="project-description">{description}</p>
          <div className="project-tech">
            {technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="tech-tag more">+{technologies.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      <div className={`project-details project-details-${title.replace(/\s+/g, '-')}`}>
        <div className="details-content">
          <div className="features-section">
            <h4>Key Features</h4>
            <ul>
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="improvements-section">
            <h4>Improvements & Impact</h4>
            <ul>
              {improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>

          <div className="technologies-section">
            <h4>Technologies Used</h4>
            <div className="tech-tags">
              {technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(liveUrl || githubUrl) && (
            <div className="project-links">
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  Live Demo
                  <span className="link-arrow">→</span>
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  GitHub
                  <span className="link-arrow">→</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;