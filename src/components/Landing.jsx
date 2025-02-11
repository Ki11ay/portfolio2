import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './styles/Landing.css';

const Landing = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from(descriptionRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5');
  }, []);

  const handleExploreClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="landing-section" id="home">
      <div className="landing-content">
        <h1 className="landing-title" ref={titleRef}>
          Mohamed Abubaker
        </h1>
        <h2 className="landing-subtitle" ref={subtitleRef}>
          Software Engineer & Robotics Specialist
        </h2>
        <p className="landing-description" ref={descriptionRef}>
          Crafting innovative solutions at the intersection of software and robotics.
          Passionate about building elegant, efficient, and impactful systems.
        </p>
        <div className="landing-cta" ref={ctaRef}>
          <button onClick={handleExploreClick} className="cta-button primary-cta">
            Explore My Work
          </button>
          <a href="#contact" className="cta-button secondary-cta">
            Get in Touch
          </a>
        </div>
      </div>
      <div className="scroll-indicator">↓</div>
    </section>
  );
};

export default Landing;
