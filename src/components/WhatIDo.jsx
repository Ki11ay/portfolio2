import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/WhatIDo.css';

gsap.registerPlugin(ScrollTrigger);

const WhatIDo = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef([]);

  const setRef = (el, index) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    // Animate content sections with translateY only
    containerRef.current.forEach((container, i) => {
      if (container) {
        gsap.from(container, {
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
          y: 30,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'power3.out'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="whatIDO" id="whatido" ref={sectionRef}>
      <div className="what-box">
        <h2 className="title">
          W<span>HAT</span>
          <div>
            I<span> DO</span>
          </div>
        </h2>
      </div>

      <div className="what-content-wrapper">
        <div className="what-main-content">
          <div className="what-content" ref={(el) => setRef(el, 0)}>
            <div className="what-content-in">
              <h3>SOFTWARE ENGINEERING</h3>
              <h4>Specialization</h4>
              <p>
                Full-stack development with expertise in mobile apps, embedded systems,
                and real-time applications. Focused on creating efficient, scalable
                solutions using modern technologies.
              </p>
              <h5>Technologies</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">C</div>
                <div className="what-tags">Dart</div>
                <div className="what-tags">Flutter</div>
                <div className="what-tags">Firebase</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Git</div>
              </div>
            </div>
          </div>

          <div className="what-content" ref={(el) => setRef(el, 1)}>
            <div className="what-content-in">
              <h3>ROBOTICS & AI</h3>
              <h4>Specialization</h4>
              <p>
                Development of ROV control systems and AI solutions for underwater
                robotics. Experience in computer vision, sensor integration, and
                real-time processing.
              </p>
              <h5>Technologies</h5>
              <div className="what-content-flex">
                <div className="what-tags">TensorFlow</div>
                <div className="what-tags">Computer Vision</div>
                <div className="what-tags">ROV Systems</div>
                <div className="what-tags">Sensor Integration</div>
                <div className="what-tags">RaspberryPi</div>
                <div className="what-tags">Arduino</div>
                <div className="what-tags">MATLAB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
