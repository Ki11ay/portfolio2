import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaMobileAlt, FaRobot, FaCode, FaMicrochip } from 'react-icons/fa';
import './styles/About.css';

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    gsap.fromTo(title, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(content,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleCVDownload = () => {
    const cvUrl = '/myCV.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Mohamed_Abubaker_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Track download
    try {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cv_download');
      }
    } catch (e) {
      console.warn('Analytics not available');
    }
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        <h2 className="section-title" ref={titleRef}>About Me</h2>
        <div className="about-content" ref={contentRef}>
          <div className="about-text">
            <p>
              I'm a Software Engineer and Robotics Specialist with a passion for building
              innovative solutions that bridge the gap between software and hardware.
              With experience in both fields, I bring a unique perspective to creating
              efficient and elegant systems.
            </p>
          </div>

          <div className="experience-cards">
            <div className="exp-card mobile">
              <div className="card-front">
                <FaMobileAlt className="card-icon" />
                <h3>Mobile Development</h3>
                <p>Creating seamless mobile experiences</p>
              </div>
              <div className="card-back">
                <h4>Skills & Experience</h4>
                <ul>
                  <li><FaCode /> Flutter & Dart for cross-platform development</li>
                  <li><FaCode /> React Native for native performance</li>
                  <li><FaCode /> State management (BLoC, Provider, Redux)</li>
                  <li><FaCode /> Firebase & REST API integration</li>
                  <li><FaCode /> Native SDK implementation</li>
                </ul>
              </div>
            </div>

            <div className="exp-card robotics">
              <div className="card-front">
                <FaRobot className="card-icon" />
                <h3>AI & Robotics</h3>
                <p>Building intelligent automated systems</p>
              </div>
              <div className="card-back">
                <h4>Skills & Experience</h4>
                <ul>
                  <li><FaMicrochip /> Computer Vision & ML pipeline development</li>
                  <li><FaMicrochip /> ROS & ROS2 implementation</li>
                  <li><FaMicrochip /> Sensor integration & processing</li>
                  <li><FaMicrochip /> AI model deployment & optimization</li>
                  <li><FaMicrochip /> Embedded systems programming</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="about-cta">
            <button 
              onClick={handleCVDownload}
              className="cta-button primary-cta"
            >
              Download CV
            </button>
            <a href="#contact" className="cta-button secondary-cta">
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
