import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { MdArrowOutward, MdClose } from 'react-icons/md';
import './styles/Work.css';

const projects = [
  {
    id: 1,
    title: "Smart Indirect Evaporative Cooling",
    category: "IoT & Control Systems",
    description: "IoT-enabled cooling control system with ESP32, sensors and web interface. Reduced energy consumption by 20% and manual intervention by 40%. Implemented real-time monitoring and automated control mechanisms for optimal performance.",
    details: "The Smart Indirect Evaporative Cooling system revolutionizes traditional cooling methods by incorporating IoT technology and smart sensors. The system continuously monitors environmental conditions and automatically adjusts cooling parameters for optimal efficiency. By implementing real-time monitoring and automated control mechanisms, we achieved significant improvements in both energy consumption and system management.",
    image: "/images/Markoni.jpeg",
    tech: ["ESP32", "IoT", "Web Development", "Sensors", "Automation"],
    link: "#",
    features: [
      "Real-time environmental monitoring",
      "Automated temperature control",
      "Remote system management",
      "Energy consumption analytics",
      "Predictive maintenance alerts"
    ]
  },
  {
    id: 2,
    title: "MyBus",
    category: "Mobile App",
    description: "Real-time bus tracking application using Flutter/Firebase with Google Maps API. Track multiple bus routes in real-time with live updates. Implemented geofencing, push notifications, and route optimization algorithms for enhanced user experience.",
    details: "MyBus transforms public transportation by providing real-time tracking and route optimization. The application features live bus tracking, smart notifications, and efficient route planning. Using Flutter and Firebase, we created a cross-platform solution that delivers seamless performance and reliable real-time updates.",
    image: "/images/MyBus.png",
    tech: ["Flutter", "Firebase", "Google Maps API", "Real-time Tracking", "Push Notifications"],
    link: "#",
    features: [
      "Live bus tracking",
      "Route optimization",
      "Smart notifications",
      "Offline support",
      "Real-time schedule updates"
    ]
  },
  {
    id: 3,
    title: "Water Trash Collector",
    category: "Robotics & AI",
    description: "Semi-autonomous ROV for waste collection with YOLOv5n-based detection. Improved processing speed by 25% and recognition accuracy by 15%. Integrated computer vision algorithms for real-time object detection and classification.",
    details: "The Water Trash Collector project combines robotics and AI to address water pollution. Using advanced computer vision algorithms and YOLOv5n detection, the system can identify and collect waste materials from water bodies. The semi-autonomous operation allows for efficient cleaning while maintaining human oversight for complex decisions.",
    image: "/images/Collector.png",
    tech: ["Computer Vision", "YOLOv5", "Raspberry Pi", "ROV Systems", "Python"],
    link: "#",
    features: [
      "Real-time object detection",
      "Autonomous navigation",
      "Waste classification",
      "Remote operation capability",
      "Performance analytics"
    ]
  }
];

const Work = () => {
  const [expandedId, setExpandedId] = useState(null);
  const expandedCardRef = useRef(null);
  const overlayRef = useRef(null);
  const timeline = useRef(null);

  const handleClose = useCallback(() => {
    if (!expandedCardRef.current || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const card = expandedCardRef.current;

    if (timeline.current) {
      timeline.current.kill();
    }

    timeline.current = gsap.timeline()
      .to(card, {
        scale: 0.95,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      }, "-=0.1")
      .call(() => {
        setExpandedId(null);
        card.style.visibility = 'hidden';
        overlay.style.visibility = 'hidden';
      });
  }, []);

  const handleCardClick = (id) => {
    setExpandedId(id);
  };

  const handleMouseMove = useCallback((e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    requestAnimationFrame(() => {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.work-card');
    
    const handleMouseMoveEvent = (e) => {
      const card = e.currentTarget;
      handleMouseMove(e, card);
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMoveEvent);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMoveEvent);
      });
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && expandedId) {
        handleClose();
      }
    };

    if (timeline.current) {
      timeline.current.kill();
    }

    if (expandedId) {
      const overlay = overlayRef.current;
      const card = expandedCardRef.current;

      // Reset visibility and initial state
      overlay.style.visibility = 'visible';
      card.style.visibility = 'visible';

      // Create animation timeline
      timeline.current = gsap.timeline()
        .fromTo(overlay, 
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        .fromTo(card,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          "-=0.1"
        );

      // Add escape key listener
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [expandedId, handleClose]);

  return (
    <section className="work-section" id="work">
      <div className="work-container">
        <h2>My <span>Projects</span></h2>
        <div className="work-grid">
          {projects.map((project) => (
            <article 
              key={project.id}
              className={`work-card ${expandedId === project.id ? 'expanded' : ''}`}
              onClick={() => handleCardClick(project.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCardClick(project.id);
                }
              }}
            >
              <div className="work-card-content">
                <div className="work-title">
                  <h3>0{project.id}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p>{project.description}</p>
                <div className="work-tech-tags">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="work-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="work-image">
                  <div className="work-image-in">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Expanded Card Overlay */}
      <div 
        className={`work-overlay ${expandedId ? 'active' : ''}`} 
        ref={overlayRef} 
        onClick={handleClose}
        role="presentation"
      />
      <div 
        className={`work-expanded-card ${expandedId ? 'active' : ''}`} 
        ref={expandedCardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="expanded-project-title"
      >
        <button 
          className="close-button" 
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Close project details"
        >
          <MdClose />
        </button>
        {expandedId && projects.filter(p => p.id === expandedId).map(project => (
          <div key={project.id} className="expanded-content">
            <div className="expanded-header">
              <div>
                <h2 id="expanded-project-title">{project.title}</h2>
                <p>{project.category}</p>
              </div>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
                onClick={(e) => e.stopPropagation()}
              >
                <MdArrowOutward />
                <span>View Project</span>
              </a>
            </div>
            <div className="expanded-body">
              <div className="project-details">
                <div className="project-description">
                  <h3>About</h3>
                  <p>{project.details}</p>
                  <div className="project-features">
                    <h3>Key Features</h3>
                    <ul>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-tech">
                    <h3>Technologies</h3>
                    <div className="work-tech-tags">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="work-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
