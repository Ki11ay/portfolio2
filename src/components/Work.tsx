import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMouseContext } from '../context/MouseContext';
import './styles/Work.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  improvements: string[];
}

const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cursorChangeHandler } = useMouseContext();

  const projects: Project[] = [
    {
      title: "Smart Indirect Evaporative Cooling",
      description: "An IoT-enabled cooling control system designed to optimize energy efficiency and reduce manual intervention.",
      technologies: ["ESP32", "Web Development", "IoT", "Sensors", "Real-time Monitoring"],
      image: "/images/Markoni.jpeg",
      features: [
        "Real-time temperature and humidity monitoring",
        "Remote control via web interface",
        "Automated cooling optimization",
        "Energy consumption tracking"
      ],
      improvements: [
        "Reduced energy consumption by 20%",
        "Decreased manual intervention by 40%",
        "Enhanced cooling efficiency through smart controls"
      ]
    },
    {
      title: "Real-Time Bus Tracking",
      description: "A mobile application for tracking multiple bus routes in real-time using Flutter and Firebase.",
      technologies: ["Flutter", "Firebase", "Google Maps API", "Real-time Updates", "Location Services"],
      image: "/images/MyBus.png",
      features: [
        "Live bus location tracking",
        "Multiple route monitoring",
        "Real-time ETA calculations",
        "User-friendly interface"
      ],
      improvements: [
        "Track 5+ bus routes simultaneously",
        "Improved user navigation experience",
        "Real-time location updates with minimal delay"
      ]
    },
    {
      title: "Water Trash Collector ROV",
      description: "A semi-autonomous ROV designed for underwater waste collection with AI-powered detection.",
      technologies: ["RaspberryPi", "YOLOv5", "Computer Vision", "ROV Control", "Python"],
      image: "/images/Collector.png",
      features: [
        "AI-powered waste detection",
        "Semi-autonomous operation",
        "Real-time video processing",
        "Underwater navigation"
      ],
      improvements: [
        "Cut processing delays by 25%",
        "Boosted recognition accuracy by 15%",
        "Implemented efficient waste collection mechanism"
      ]
    }
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
      '.work-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      '.project-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="work" ref={containerRef}>
      <div className="content-container">
        <div className="work-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Innovative solutions in robotics and software development
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onMouseEnter={() => cursorChangeHandler('hover')}
              onMouseLeave={() => cursorChangeHandler('')}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <div className="project-improvements">
                    {project.improvements.map((improvement, i) => (
                      <div key={i} className="improvement-item">
                        {improvement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-features">
                  <h4>Key Features</h4>
                  <ul>
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="work-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </div>
  );
};

export default Work;
