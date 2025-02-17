import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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
        <h2 className="section-title" ref={titleRef}>About</h2>
        <div className="about-content" ref={contentRef}>
          <div className="about-text">
            <p>
              I'm a Software Engineer and Robotics Specialist with a passion for building
              innovative solutions that bridge the gap between software and hardware.
              With experience in both fields, I bring a unique perspective to creating
              efficient and elegant systems.
            </p>
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
