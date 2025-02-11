import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import WhatIDo from './WhatIDo';
import Career from './Career';
import Work from './Work';
import TechStack from './TechStack';
import Hobbies from './Hobbies';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

const MainContainer = () => {
  useEffect(() => {
    // Set up section animations
    const sections = document.querySelectorAll('section:not(#work)');
    
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="container-main">
      <Navbar />
      <Landing />
      <About />
      <WhatIDo />
      <Career />
      <Work />
      <TechStack />
      <Hobbies />
      <Contact />
    </div>
  );
};

export default MainContainer;
