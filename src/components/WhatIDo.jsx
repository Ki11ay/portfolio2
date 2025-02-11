import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/WhatIDo.css';

const WhatIDo = () => {
  const containerRef = useRef([]);
  
  const setRef = (el, index) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }

    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  const handleClick = (container) => {
    container.classList.toggle("what-content-active");
    container.classList.remove("what-sibling");
    if (container.parentElement) {
      const siblings = Array.from(container.parentElement.children);
      siblings.forEach((sibling) => {
        if (sibling !== container) {
          sibling.classList.remove("what-content-active");
          sibling.classList.toggle("what-sibling");
        }
      });
    }
  };

  return (
    <div className="whatIDO" id="whatido">
      <div className="what-box">
        <h2 className="title">
          W<span>HAT</span>
          <div>
            I<span> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
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
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
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
    </div>
  );
};

export default WhatIDo;
