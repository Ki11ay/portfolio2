import { useRef, useEffect } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import './styles/Work.css';

const projects = [
  {
    id: 1,
    title: "Smart Indirect Evaporative Cooling",
    category: "IoT & Control Systems",
    description: "IoT-enabled cooling control system with ESP32, sensors and web interface. Reduced energy consumption by 20% and manual intervention by 40%. Implemented real-time monitoring and automated control mechanisms for optimal performance.",
    image: "/images/Markoni.jpeg",
    tech: ["ESP32", "IoT", "Web Development", "Sensors", "Automation"],
    link: "#"
  },
  {
    id: 2,
    title: "MyBus",
    category: "Mobile App",
    description: "Real-time bus tracking application using Flutter/Firebase with Google Maps API. Track multiple bus routes in real-time with live updates. Implemented geofencing, push notifications, and route optimization algorithms for enhanced user experience.",
    image: "/images/MyBus.png",
    tech: ["Flutter", "Firebase", "Google Maps API", "Real-time Tracking", "Push Notifications"],
    link: "#"
  },
  {
    id: 3,
    title: "Water Trash Collector",
    category: "Robotics & AI",
    description: "Semi-autonomous ROV for waste collection with YOLOv5n-based detection. Improved processing speed by 25% and recognition accuracy by 15%. Integrated computer vision algorithms for real-time object detection and classification.",
    image: "/images/Collector.png",
    tech: ["Computer Vision", "YOLOv5", "Raspberry Pi", "ROV Systems", "Python"],
    link: "#"
  }
];

const Work = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      if (!scrollRef.current) return;
      
      // Prevent vertical scroll when horizontally scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaX;
      }
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  return (
    <section className="work-section" id="work">
      <div className="work-container">
        <h2>My <span>Projects</span></h2>
        <div className="work-flex" ref={scrollRef}>
          {projects.map((project) => (
            <article className="work-box" key={project.id}>
              <div className="work-info">
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
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <div className="work-image">
                  <div className="work-image-in">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="work-link">
                      <MdArrowOutward />
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
