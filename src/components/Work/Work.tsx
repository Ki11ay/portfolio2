import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import './styles/Work.css';

gsap.registerPlugin(ScrollTrigger);

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
  const projectsRef = useRef<HTMLDivElement>(null);

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
    if (!containerRef.current || !projectsRef.current) return;

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
      '.work-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Animate project cards
    const cards = projectsRef.current.querySelectorAll('.project-card');
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
    <div className="work" ref={containerRef}>
      <div className="content-container">
        <div className="work-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Innovative solutions in robotics and software development
          </p>
        </div>

        <div className="projects-grid" ref={projectsRef}>
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
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
