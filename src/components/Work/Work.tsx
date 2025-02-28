import React, { useState } from 'react';
import { gsap } from '../../plugins/gsap-register';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './styles/Work.css';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  achievements: string[];
  projectLink: string;
}

const projects: Project[] = [
  {
    id: 'markoni',
    title: 'Smart Indirect Evaporative Cooling',
    description: 'An innovative cooling system utilizing indirect evaporative technology for efficient temperature control.',
    image: '/images/Markoni.jpeg',
    technologies: ['IoT', 'Sensors', 'Smart Controls', 'Energy Efficiency'],
    features: [
      'Real-time temperature monitoring',
      'Automated control system',
      'Energy usage optimization',
      'Remote monitoring capabilities'
    ],
    achievements: [
      'Reduced energy consumption by 40%',
      'Increased cooling efficiency by 29%',
    ],
    projectLink: 'https://markoni.killay.me'
  },
  {
    id: 'mybus',
    title: 'Bus Tracking System (My Bus)',
    description: 'A comprehensive bus tracking and management system for improved public transportation.',
    image: '/images/MyBus.png',
    technologies: ['GPS Tracking', 'Real-time Updates', 'Mobile App', 'Route Optimization', 'Data Analytics','Object Detection'],
    features: [
      'Real-time bus tracking',
      'Arrival time predictions',
      'Route planning',
      'Passenger counting system',
      'Mobile app integration',
      'User feedback system',
      'Data analytics',
      'Notifications'
    ],
    achievements: [
      'Improved route efficiency by 25%',
      'Reduced wait times by 30%',
      'Enhanced user satisfaction'
    ],
    projectLink: 'https://github.com/Ki11ay/My_Bus'
  },
  {
    id: 'collector',
    title: 'Autonomous Water Trash Collector',
    description: 'An automated system for detecting, collecting and managing water-based waste and pollution.',
    image: '/images/Collector.png',
    technologies: [ 'Automation', 'Environmental', 'Control Systems'],
    features: [
      'Autonomous operation',
      'Waste collection system',
      'Environmental monitoring',
      'Remote control capabilities'
    ],
    achievements: [
      'Collected over 5kg of waste',
      'Improved water quality in test areas',
      'Reduced manual cleanup costs'
    ],
    projectLink: 'https://github.com/Ki11ay/aquadron_automation'
  }
];

const Work: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useScrollAnimation<HTMLDivElement>();

  const handleCardClick = (projectId: string) => {
    setExpandedId(prevId => prevId === projectId ? null : projectId);
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const isExpanded = expandedId === project.id;
    const cardRef = useScrollAnimation<HTMLDivElement>();

    return (
      <div
        className={`project-card ${isExpanded ? 'expanded' : ''}`}
        ref={cardRef}
      >
        <div className="project-image">
          <img src={project.image} alt={project.title} loading="lazy" />
          <div className="project-overlay">
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-overlay"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Project →
            </a>
          </div>
        </div>

        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          <div className="tech-stack">
            {project.technologies.map(tech => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>

          <div className="card-actions">
            <button
              className="details-btn"
              onClick={() => handleCardClick(project.id)}
            >
              {isExpanded ? 'Show Less' : 'Show Details'}
            </button>
          </div>

          <div className="project-details">
            <div className="features-list">
              <h4 className="list-title">Key Features</h4>
              <ul className="list-items">
                {project.features.map((feature, index) => (
                  <li key={index} className="list-item">{feature}</li>
                ))}
              </ul>
            </div>

            <div className="achievements-list">
              <h4 className="list-title">Achievements</h4>
              <ul className="list-items">
                {project.achievements.map((achievement, index) => (
                  <li key={index} className="list-item">{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="work" className="work" ref={containerRef}>
      <div className="content-container">
        <h2>Featured Projects</h2>
        <p className="section-description">
          A showcase of my innovative projects in Automation, Mobile Applications Development, IoT, and Environmental Solutions.
        </p>
        
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
