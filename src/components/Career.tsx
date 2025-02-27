import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMouseContext } from '../context/MouseContext';
import './styles/Career.css';
  `j`
interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

const Career: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cursorChangeHandler } = useMouseContext();

  const experiences: Experience[] = [
    {
      title: "Software Engineer",
      company: "Caretta Robotics",
      location: "Famagusta, Cyprus",
      period: "Nov 2024 - Present",
      description: [
        "Enhanced ROV control system, reducing command response latency by 15%",
        "Processed data from 5+ sensors for accurate 3D environmental mapping",
        "Employed simulations to validate control mechanisms, improving reliability by 10%",
        "Refined MobileNet-based object detection models, achieving 12% precision improvement"
      ],
      skills: ["Python", "Computer Vision", "ROS", "TensorFlow", "Simulation"]
    },
    {
      title: "Software Engineer Intern",
      company: "Caretta Robotics",
      location: "Famagusta, Cyprus",
      period: "Jun 2024 - Oct 2024",
      description: [
        "Cleaned and manipulated dataset of 26,000+ records, improving accuracy by 20%",
        "Trained and fine-tuned object detection models, boosting performance by 15%",
        "Developed modules for integrating data from 4+ sensor types",
        "Enhanced 3D mapping accuracy by 18% through sensor data integration"
      ],
      skills: ["Data Processing", "Machine Learning", "Sensor Integration", "Python"]
    },
    {
      title: "Software Developer Freelancer",
      company: "Independent",
      location: "Khartoum, Sudan",
      period: "Apr 2023 - Jun 2024",
      description: [
        "Led a team of 4 developers, reducing project cycle times by 25%",
        "Authored comprehensive Software Requirements Specifications (SRS)",
        "Designed scalable database architectures, improving system scalability by 30%",
        "Built cross-platform mobile applications with Flutter and Firebase"
      ],
      skills: ["Flutter", "Firebase", "Team Leadership", "System Design"]
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
      '.career-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      '.timeline-item',
      { x: -50, opacity: 0 },
      {
        x: 0,
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
    <div className="career" ref={containerRef}>
      <div className="content-container">
        <div className="career-header">
          <h2 className="section-title">Career Journey</h2>
          <p className="section-subtitle">
            Professional experience and achievements
          </p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="timeline-item"
              onMouseEnter={() => cursorChangeHandler('hover')}
              onMouseLeave={() => cursorChangeHandler('')}
            >
              <div className="timeline-marker"></div>
              
              <div className="timeline-content">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <span className="experience-period">{exp.period}</span>
                </div>

                <div className="experience-company">
                  <span className="company-name">{exp.company}</span>
                  <span className="company-location">{exp.location}</span>
                </div>

                <ul className="experience-description">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="experience-skills">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="career-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </div>
  );
};

export default Career;
