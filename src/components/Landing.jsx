import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Landing.css';

gsap.registerPlugin(ScrollTrigger);

// Add timestamp to prevent caching
const imageUrl = `/mohamed.jpg?v=${Date.now()}`;

const Landing = () => {
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Create words spans for animation
    const createWordSpans = (element) => {
      if (!element) return;
      const text = element.textContent;
      element.textContent = '';
      return text.split(' ').map((word) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        const innerSpan = document.createElement('span');
        innerSpan.style.display = 'inline-block';
        innerSpan.textContent = word + ' ';
        span.appendChild(innerSpan);
        element.appendChild(span);
        return innerSpan;
      });
    };

    const introWords = createWordSpans(introRef.current);
    const titleWords = createWordSpans(titleRef.current);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }});

    // Animate title words
    if (titleWords) {
      tl.from(titleWords, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1
      });
    }

    // Animate intro words
    if (introWords) {
      tl.from(introWords, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05
      }, "-=0.5");
    }

    // Animate content and CTA
    tl.from(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, "-=0.4")
    .from(ctaRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5
    }, "-=0.4")
    .from(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.out"
    }, "-=0.6");

    // Preload image
    const img = new Image();
    img.src = imageUrl;
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
        <div className="landing-intro">
          <h3 ref={introRef}>Hello! I'm</h3>
          <h1 ref={titleRef}>
            Mohamed
            <br />
            <span>Abubaker</span>
          </h1>
        </div>
        
        <div className="landing-info" ref={contentRef}>
          <h2>Software Engineer & Robotics Specialist</h2>
          <p>
            Crafting innovative solutions at the intersection of software and robotics.
            Passionate about building elegant, efficient, and impactful systems.
          </p>
        </div>

        <div className="landing-cta" ref={ctaRef}>
          <button onClick={handleExploreClick} className="cta-button primary-cta">
            Explore My Work
          </button>
          <a href="#contact" className="cta-button secondary-cta">
            Get in Touch
          </a>
        </div>
      </div>

      <div className="landing-image" ref={imageRef}>
        <div className="image-wrapper">
          <img 
            src={imageUrl}
            alt="Mohamed Abubaker"
            loading="eager"
            style={{ objectPosition: 'top center' }}
          />
        </div>
        <div className="image-backdrop"></div>
      </div>

      <div className="scroll-indicator">↓</div>
    </section>
  );
};

export default Landing;
