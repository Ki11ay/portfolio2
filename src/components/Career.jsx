import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Career.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create timeline
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.career-section',
          start: 'top 30%',
          end: '100% center',
          scrub: 1,
          invalidateOnRefresh: true,
          markers: process.env.NODE_ENV === 'development',
          toggleActions: 'play none none reverse',
          id: 'career-section'
        },
      });

      // Timeline animations
      timeline
        .fromTo(
          '.career-timeline',
          { 
            maxHeight: '10%', 
            opacity: 0,
            ease: 'power2.out' 
          },
          { 
            maxHeight: '100%', 
            opacity: 1, 
            duration: 0.5 
          },
          0
        )
        .fromTo(
          '.career-info-box',
          { 
            opacity: 0,
            y: 50,
            ease: 'power2.out'
          },
          { 
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5 
          },
          0.2
        )
        .fromTo(
          '.career-dot',
          { 
            animationIterationCount: 'infinite',
            scale: 1 
          },
          { 
            animationIterationCount: '1',
            scale: 1.2,
            duration: 0.3 
          },
          0
        );

      // Desktop parallax effect
      if (window.innerWidth > 1024) {
        timeline.fromTo(
          '.career-section',
          { 
            y: 0,
            ease: 'none' 
          },
          { 
            y: '20%',
            duration: 0.5 
          },
          0
        );
      }
    });

    // Cleanup
    return () => {
      ctx.revert(); // This will clean up all GSAP animations created in this context
    };
  }, []);

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My Career <span>&</span>
          <br /> Experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Caretta Robotics</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Optimizing ROV control systems, enhancing command response latency by 15%.
              Processing data from multiple sensors for accurate 3D environmental mapping.
              Leading AI model refinement with 12% precision improvement.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer Intern</h4>
                <h5>Caretta Robotics</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Improved data accuracy by 20% through dataset cleaning. Trained and fine-tuned
              object detection models, boosting performance by 15%. Developed modules for
              sensor data integration with 18% improved mapping accuracy.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Freelancer</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Led a team of 4 developers, reducing project cycle times by 25%. Designed
              scalable architectures improving system scalability by 30%. Built cross-platform
              mobile applications with 20% faster response times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
